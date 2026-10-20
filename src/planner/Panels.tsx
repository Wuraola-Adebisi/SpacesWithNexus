import { Copy, Plus, RotateCw, Trash2 } from 'lucide-react'
import { CATALOG, PALETTE, type CatalogEntry } from './catalog'
import { NumberField, TextField } from './fields'
import { MAX_ROOM, MIN_ROOM, footprint } from './geometry'
import type { Item, Room } from './types'

type FurnitureProps = {
  items: Item[]
  room: Room
  selectedId: string | null
  onSelect: (id: string) => void
  onAdd: (entry: CatalogEntry) => void
  onRename: (id: string, name: string) => void
  onResize: (id: string, dim: 'width' | 'depth', value: number) => void
  onMoveTo: (id: string, x: number, y: number) => void
  onRotate: (id: string) => void
  onDuplicate: (id: string) => void
  onRemove: (id: string) => void
}

export function FurniturePanel(p: FurnitureProps) {
  const active = p.items.find((i) => i.id === p.selectedId) ?? null
  const f = active ? footprint(active) : null

  return (
    <>
      <section className="panel-section">
        <h2 className="panel-title">Furniture in your room <span className="count">{p.items.length}</span></h2>
        {p.items.length === 0 ? (
          <p className="note">Nothing here yet. Add the pieces you have using the options below, or start by checking your room size.</p>
        ) : (
          <ul className="piece-list">
            {p.items.map((i) => (
              <li key={i.id}>
                <button className="piece" aria-pressed={i.id === p.selectedId} onClick={() => p.onSelect(i.id)}>
                  <span className="swatch" style={{ background: PALETTE[i.kind] }} />
                  <span className="piece-text">
                    <strong>{i.name}</strong>
                    <small>{i.width} × {i.depth} cm</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {active && f ? (
        <section className="panel-section editor" aria-label="Edit this piece">
          <h2 className="panel-title">Selected piece</h2>
          <TextField label="Name" value={active.name} onCommit={(name) => p.onRename(active.id, name)} />
          <div className="field-row">
            <NumberField label="Width" unit="cm" value={active.width} min={10} max={600} onCommit={(v) => p.onResize(active.id, 'width', v)} />
            <NumberField label="Depth" unit="cm" value={active.depth} min={10} max={600} onCommit={(v) => p.onResize(active.id, 'depth', v)} />
          </div>
          <div className="field-row">
            <NumberField label="Distance from left wall" unit="cm" value={active.x} min={0} max={Math.max(0, p.room.width - f.w)} onCommit={(v) => p.onMoveTo(active.id, v, active.y)} />
            <NumberField label="Distance from top wall" unit="cm" value={active.y} min={0} max={Math.max(0, p.room.depth - f.d)} onCommit={(v) => p.onMoveTo(active.id, active.x, v)} />
          </div>
          <div className="button-row">
            <button className="btn btn-quiet btn-sm" onClick={() => p.onRotate(active.id)}><RotateCw size={14} /> Rotate</button>
            <button className="btn btn-quiet btn-sm" onClick={() => p.onDuplicate(active.id)}><Copy size={14} /> Duplicate</button>
            <button className="btn btn-danger btn-sm" onClick={() => p.onRemove(active.id)}><Trash2 size={14} /> Remove</button>
          </div>
        </section>
      ) : null}

      <section className="panel-section">
        <h2 className="panel-title">Add a piece of furniture</h2>
        <div className="add-grid">
          {CATALOG.map((c) => (
            <button key={c.kind} className="add-btn" onClick={() => p.onAdd(c)}>
              <span className="swatch" style={{ background: PALETTE[c.kind] }} />
              <span>{c.name}</span>
              <Plus size={14} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className="note">These are example sizes. For a closer match, measure your own furniture and enter its width and depth after adding it.</p>
      </section>
    </>
  )
}

type RoomProps = {
  room: Room
  onChange: (room: Room) => void
  onResetSample: () => void
  onClear: () => void
  hasItems: boolean
}

export function RoomPanel({ room, onChange, onResetSample, onClear, hasItems }: RoomProps) {
  return (
    <>
      <section className="panel-section">
        <h2 className="panel-title">Your room size</h2>
        <TextField label="Room name" value={room.name} maxLength={60} onCommit={(name) => onChange({ ...room, name })} />
        <div className="field-row">
          <NumberField label="Width" unit="cm" value={room.width} min={MIN_ROOM} max={MAX_ROOM} onCommit={(width) => onChange({ ...room, width })} />
          <NumberField label="Length" unit="cm" value={room.depth} min={MIN_ROOM} max={MAX_ROOM} onCommit={(depth) => onChange({ ...room, depth })} />
        </div>
        <p className="note">
          Your room has {(room.width * room.depth / 10000).toFixed(1)} m² of floor space. Measure wall to wall and enter the width and length in centimetres (cm).
        </p>
      </section>
      <section className="panel-section">
        <h2 className="panel-title">Reset your room plan</h2>
        <div className="button-row">
          <button className="btn btn-quiet btn-sm" onClick={onResetSample}>Try the sample bedroom</button>
          <button className="btn btn-quiet btn-sm" onClick={onClear} disabled={!hasItems}>Clear all furniture</button>
        </div>
        <p className="note">Doors, windows, radiators and built-in cupboards are not shown. Leave enough room for them and for people to walk around.</p>
      </section>
    </>
  )
}
