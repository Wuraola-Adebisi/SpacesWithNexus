import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Expand, Grid2X2, Printer, Redo2, Ruler, Undo2, X, ZoomIn, ZoomOut } from 'lucide-react'
import { BRAND } from '../brand'
import { Mark } from '../Mark'
import { Link } from '../router'
import { SiteFooter } from '../site/Layout'
import FloorPlan, { planGeometry } from './FloorPlan'
import { FurniturePanel, RoomPanel } from './Panels'
import SuggestPanel from './SuggestPanel'
import { SAMPLE_ROOM, sampleItems, uid, type CatalogEntry } from './catalog'
import { findIssues, footprint, placeItem, rotateItem } from './geometry'
import { loadPlan, savePlan } from './storage'
import type { Item, Room } from './types'

type Doc = { items: Item[]; past: Item[][]; future: Item[][] }
const HISTORY_LIMIT = 50

function useBox<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [box, setBox] = useState({ w: 0, h: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setBox({ w: entry.contentRect.width, h: entry.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, box] as const
}

export default function Planner() {
  const [initial] = useState(loadPlan)
  const [room, setRoom] = useState<Room>(initial?.room ?? SAMPLE_ROOM)
  const [doc, setDoc] = useState<Doc>({ items: initial?.items ?? sampleItems(), past: [], future: [] })
  const { items } = doc
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null)
  const [tab, setTab] = useState<'furniture' | 'room'>('furniture')
  const [ghost, setGhost] = useState<Item[] | null>(null)
  const [zoom, setZoom] = useState(1)
  const [grid, setGrid] = useState(true)
  const [measures, setMeasures] = useState(true)
  const [saved, setSaved] = useState(Boolean(initial))
  const [notice, setNotice] = useState('')
  const [stageRef, box] = useBox<HTMLDivElement>()
  const dragBase = useRef<Item[] | null>(null)

  const issues = useMemo(() => findIssues(items, room), [items, room])
  const flagged = useMemo(() => new Set(issues.flatMap((i) => i.ids)), [issues])

  useEffect(() => {
    if (!notice) return
    const t = window.setTimeout(() => setNotice(''), 3200)
    return () => window.clearTimeout(t)
  }, [notice])

  const commit = useCallback((fn: (list: Item[]) => Item[]) => {
    setDoc((d) => ({ items: fn(d.items), past: [...d.past.slice(-(HISTORY_LIMIT - 1)), d.items], future: [] }))
    setSaved(false)
  }, [])

  const undo = useCallback(() => {
    setDoc((d) => (d.past.length ? { items: d.past[d.past.length - 1], past: d.past.slice(0, -1), future: [d.items, ...d.future] } : d))
    setSaved(false)
  }, [])
  const redo = useCallback(() => {
    setDoc((d) => (d.future.length ? { items: d.future[0], past: [...d.past, d.items], future: d.future.slice(1) } : d))
    setSaved(false)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('input, textarea')) return
      if (!(e.metaKey || e.ctrlKey) || e.altKey) return
      const k = e.key.toLowerCase()
      if (k === 'z') {
        e.preventDefault()
        if (e.shiftKey) redo()
        else undo()
      } else if (k === 'y') {
        e.preventDefault()
        redo()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [undo, redo])

  const byId = (id: string) => items.find((i) => i.id === id)

  const addItem = (entry: CatalogEntry) => {
    const base: Item = { ...entry, id: uid(), rotation: 0, x: 0, y: 0 }
    const item = { ...base, ...placeItem(base, (room.width - entry.width) / 2, (room.depth - entry.depth) / 2, room, false) }
    commit((list) => [...list, item])
    setSelectedId(item.id)
    setNotice(`${entry.name} added`)
  }
  const patch = (id: string, p: Partial<Item>) => commit((list) => list.map((i) => (i.id === id ? { ...i, ...p } : i)))
  const resize = (id: string, dim: 'width' | 'depth', value: number) => {
    const it = byId(id)
    if (!it) return
    const next = { ...it, [dim]: value }
    patch(id, { [dim]: value, ...placeItem(next, it.x, it.y, room, false) })
  }
  const moveTo = (id: string, x: number, y: number) => {
    const it = byId(id)
    if (it) patch(id, placeItem(it, x, y, room, false))
  }
  const rotate = (id: string) => {
    const it = byId(id)
    if (it) commit((list) => list.map((i) => (i.id === id ? rotateItem(i, room) : i)))
  }
  const duplicate = (id: string) => {
    const it = byId(id)
    if (!it) return
    const copy = { ...it, id: uid(), ...placeItem(it, it.x + 20, it.y + 20, room, false) }
    commit((list) => [...list, copy])
    setSelectedId(copy.id)
  }
  const remove = (id: string) => {
    commit((list) => list.filter((i) => i.id !== id))
    setSelectedId(null)
  }

  const onDragStart = () => {
    dragBase.current = doc.items
  }
  const onMove = (id: string, x: number, y: number) => {
    setDoc((d) => ({ ...d, items: d.items.map((i) => (i.id === id ? { ...i, x, y } : i)) }))
    setSaved(false)
  }
  const onDragEnd = (moved: boolean) => {
    const base = dragBase.current
    dragBase.current = null
    if (moved && base) setDoc((d) => ({ ...d, past: [...d.past.slice(-(HISTORY_LIMIT - 1)), base], future: [] }))
  }

  const changeRoom = (next: Room) => {
    setRoom(next)
    setSaved(false)
  }
  const resetSample = () => {
    setRoom(SAMPLE_ROOM)
    commit(() => sampleItems())
    setSelectedId(null)
  }

  const save = () => {
    try {
      savePlan({ room, items })
      setSaved(true)
      setNotice('Your plan is saved on this device')
    } catch {
      setNotice('We couldn’t save your plan. Check your browser settings and try again.')
    }
  }
  const printPlan = () => window.print()

  const g = planGeometry(room)
  const fit = box.w && box.h ? Math.min(box.w / g.vw, box.h / g.vh) : 1
  const planWidth = Math.max(240, g.vw * fit * zoom)
  const covered = items.reduce((sum, i) => {
    const f = footprint(i)
    return sum + f.w * f.d
  }, 0)
  const coverage = Math.round((covered / (room.width * room.depth)) * 100)

  return (
    <div className="app">
      <header className="app-bar">
        <Link to="/" className="brand" aria-label={`${BRAND} home`}><Mark size={24} />{BRAND}</Link>
        <div className="app-plan">
          <strong>{room.name}</strong>
          <span className={saved ? 'save-state ok' : 'save-state'}>{saved ? 'Saved on this device' : 'Changes not saved yet'}</span>
        </div>
        <div className="app-actions">
          <button className="icon-btn" onClick={undo} disabled={!doc.past.length} aria-label="Undo" title="Undo (Ctrl+Z)"><Undo2 size={17} /></button>
          <button className="icon-btn" onClick={redo} disabled={!doc.future.length} aria-label="Redo" title="Redo (Ctrl+Shift+Z)"><Redo2 size={17} /></button>
          <button className="btn btn-quiet btn-sm print-action" onClick={printPlan}><Printer size={14} /> Print or save as PDF</button>
          <button className="btn btn-primary btn-sm" onClick={save}>Save changes</button>
        </div>
      </header>

      <div className="app-body">
        <aside className="panel panel-left" aria-label="Room and furniture">
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'furniture'} className="tab" onClick={() => setTab('furniture')}>Furniture</button>
            <button role="tab" aria-selected={tab === 'room'} className="tab" onClick={() => setTab('room')}>Room size</button>
          </div>
          {tab === 'furniture' ? (
            <FurniturePanel
              items={items}
              room={room}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onAdd={addItem}
              onRename={(id, name) => patch(id, { name })}
              onResize={resize}
              onMoveTo={moveTo}
              onRotate={rotate}
              onDuplicate={duplicate}
              onRemove={remove}
            />
          ) : (
            <RoomPanel
              room={room}
              onChange={changeRoom}
              onResetSample={resetSample}
              onClear={() => {
                commit(() => [])
                setSelectedId(null)
              }}
              hasItems={items.length > 0}
            />
          )}
        </aside>

        <main className="workbench">
          <div className="wb-tools">
            <p className="wb-title">Your room <span>Measurements are in centimetres (cm)</span></p>
            <div className="wb-buttons">
              <button className="tool" aria-pressed={grid} onClick={() => setGrid(!grid)} aria-label="Show or hide grid" title="Show or hide grid"><Grid2X2 size={16} /></button>
              <button className="tool" aria-pressed={measures} onClick={() => setMeasures(!measures)} aria-label="Show or hide measurements" title="Show or hide measurements"><Ruler size={16} /></button>
              <span className="divider" />
              <button className="tool" onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))} aria-label="Zoom out" title="Zoom out"><ZoomOut size={16} /></button>
              <span className="zoom-label">{Math.round(zoom * 100)}%</span>
              <button className="tool" onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))} aria-label="Zoom in" title="Zoom in"><ZoomIn size={16} /></button>
              <button className="tool" onClick={() => setZoom(1)} aria-label="Fit the room to the screen" title="Fit to screen"><Expand size={16} /></button>
            </div>
          </div>

          <div className="stage" ref={stageRef}>
            <FloorPlan
              room={room}
              items={items}
              width={planWidth}
              selectedId={selectedId}
              flagged={flagged}
              ghost={ghost}
              grid={grid}
              measures={measures}
              label="Your room plan. Drag a piece of furniture to move it. Select it to edit its size, turn it, duplicate it or remove it."
              onSelect={setSelectedId}
              onDragStart={onDragStart}
              onMove={onMove}
              onDragEnd={onDragEnd}
              onNudge={(id, x, y) => patch(id, { x, y })}
              onRotate={rotate}
              onRemove={remove}
            />
          </div>

          <div className="wb-foot">
            {issues.length === 0 ? (
              <p className="status ok">Your furniture fits within the room and nothing overlaps.</p>
            ) : (
              <div className="checks">
                <p className="status warn">{issues.length} {issues.length === 1 ? 'issue' : 'issues'} to check</p>
                <ul>
                  {issues.slice(0, 3).map((issue, i) => (
                    <li key={i}><button onClick={() => setSelectedId(issue.ids[0])}>{issue.message}</button></li>
                  ))}
                  {issues.length > 3 ? <li className="more">and {issues.length - 3} more</li> : null}
                </ul>
              </div>
            )}
            <p className="wb-stats">
              {items.length} {items.length === 1 ? 'piece uses' : 'pieces use'} {coverage}% of {(room.width * room.depth / 10000).toFixed(1)} m²
            </p>
          </div>
        </main>

        <aside className="panel panel-right" aria-label="Layout suggestions">
          <SuggestPanel
            room={room}
            items={items}
            onPreview={setGhost}
            onApply={(next) => {
              commit(() => next)
              setNotice('This layout is now on your floor plan')
            }}
          />
        </aside>
      </div>

      <SiteFooter />

      {notice ? (
        <div className="toast" role="status">
          {notice}
          <button className="icon-btn" onClick={() => setNotice('')} aria-label="Dismiss"><X size={14} /></button>
        </div>
      ) : null}
    </div>
  )
}
