import type { Issue, Item, Room, Rotation } from './types'

export const SNAP = 5
export const WALL_SNAP = 8
export const MIN_ROOM = 150
export const MAX_ROOM = 1200

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
export const snap = (v: number) => Math.round(v / SNAP) * SNAP

export function footprint(i: Pick<Item, 'width' | 'depth' | 'rotation'>) {
  return i.rotation % 180 === 0 ? { w: i.width, d: i.depth } : { w: i.depth, d: i.width }
}

export function isInside(i: Item, room: Room) {
  const f = footprint(i)
  return i.x >= 0 && i.y >= 0 && i.x + f.w <= room.width && i.y + f.d <= room.depth
}

export function overlaps(a: Item, b: Item) {
  const fa = footprint(a)
  const fb = footprint(b)
  return a.x < b.x + fb.w && a.x + fa.w > b.x && a.y < b.y + fb.d && a.y + fa.d > b.y
}

export function findIssues(items: Item[], room: Room): Issue[] {
  const out: Issue[] = []
  for (const i of items) {
    if (!isInside(i, room)) out.push({ message: `${i.name} extends beyond a room wall`, ids: [i.id] })
  }
  for (let a = 0; a < items.length; a++) {
    for (let b = a + 1; b < items.length; b++) {
      if (overlaps(items[a], items[b])) {
        out.push({ message: `${items[a].name} is on top of ${items[b].name}`, ids: [items[a].id, items[b].id] })
      }
    }
  }
  return out
}

/** Snap a position to the grid, optionally flush to walls, and keep the piece inside the room. */
export function placeItem(item: Item, x: number, y: number, room: Room, wallSnap = true) {
  const f = footprint(item)
  const maxX = Math.max(0, room.width - f.w)
  const maxY = Math.max(0, room.depth - f.d)
  let nx = snap(x)
  let ny = snap(y)
  if (wallSnap) {
    if (nx < WALL_SNAP) nx = 0
    if (maxX - nx < WALL_SNAP) nx = maxX
    if (ny < WALL_SNAP) ny = 0
    if (maxY - ny < WALL_SNAP) ny = maxY
  }
  return { x: clamp(nx, 0, maxX), y: clamp(ny, 0, maxY) }
}

/** Rotate a quarter turn around the piece's centre, then keep it inside the room. */
export function rotateItem(item: Item, room: Room): Item {
  const before = footprint(item)
  const next: Item = { ...item, rotation: ((item.rotation + 90) % 360) as Rotation }
  const after = footprint(next)
  const cx = item.x + before.w / 2
  const cy = item.y + before.d / 2
  return { ...next, ...placeItem(next, cx - after.w / 2, cy - after.d / 2, room, false) }
}
