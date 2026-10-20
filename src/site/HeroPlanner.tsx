import { useMemo, useState } from 'react'
import { RotateCw, RotateCcw } from 'lucide-react'
import FloorPlan from '../planner/FloorPlan'
import { findIssues, rotateItem } from '../planner/geometry'
import type { Item, Room } from '../planner/types'

const room: Room = { name: 'Bedroom', width: 420, depth: 340 }

const start = (): Item[] => [
  { id: 'bed', kind: 'bed', name: 'Bed', width: 200, depth: 150, x: 20, y: 20, rotation: 0 },
  { id: 'side', kind: 'table', name: 'Side table', width: 55, depth: 55, x: 226, y: 112, rotation: 0 },
  { id: 'wardrobe', kind: 'wardrobe', name: 'Wardrobe', width: 140, depth: 60, x: 260, y: 20, rotation: 0 },
  { id: 'desk', kind: 'desk', name: 'Desk', width: 120, depth: 60, x: 20, y: 260, rotation: 0 },
  { id: 'chair', kind: 'chair', name: 'Chair', width: 52, depth: 52, x: 56, y: 206, rotation: 0 },
  { id: 'plant', kind: 'plant', name: 'Plant', width: 34, depth: 34, x: 366, y: 286, rotation: 0 },
]

export default function HeroPlanner() {
  const [items, setItems] = useState(start)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const rotateSelected = () => {
    if (!selectedId) return
    setItems((list) => list.map((item) => item.id === selectedId ? rotateItem(item, room) : item))
  }
  const reset = () => { setItems(start()); setSelectedId(null) }
  const issues = useMemo(() => findIssues(items, room), [items])
  const flagged = useMemo(() => new Set(issues.flatMap((i) => i.ids)), [issues])

  return (
    <figure className="hero-plan">
      <FloorPlan
        room={room}
        items={items}
        selectedId={selectedId}
        flagged={flagged}
        settle
        label="Interactive bedroom floor plan. Drag furniture to explore different arrangements."
        onSelect={setSelectedId}
        onMove={(id, x, y) => setItems((list) => list.map((i) => (i.id === id ? { ...i, x, y } : i)))}
        onNudge={(id, x, y) => setItems((list) => list.map((i) => (i.id === id ? { ...i, x, y } : i)))}
        onRotate={(id) => setItems((list) => list.map((i) => (i.id === id ? rotateItem(i, room) : i)))}
      />
      <figcaption>
        <span className={issues.length ? 'status warn' : 'status ok'} aria-live="polite">
          {issues.length ? issues[0].message : 'Everything fits'}
        </span>
        <div className="hero-plan-tools">
          <button className="btn btn-quiet btn-sm" onClick={rotateSelected} disabled={!selectedId}><RotateCw size={14} /> Rotate selected</button>
          <button className="btn btn-quiet btn-sm" onClick={reset}><RotateCcw size={14} /> Reset plan</button>
        </div>
        <span className="hint">Drag a piece to move it. Select one to see its measurements.</span>
      </figcaption>
    </figure>
  )
}
