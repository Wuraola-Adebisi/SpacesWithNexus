import type { Item, Room } from './types'

export type StarterPlan = {
  id: string
  room: Room
  items: Item[]
}

const starters: StarterPlan[] = [
  {
    id: 'small-bedroom',
    room: { name: 'Small bedroom', width: 300, depth: 350 },
    items: [
      { id: 'bed-1', kind: 'bed', name: 'Double bed', width: 200, depth: 150, x: 20, y: 20, rotation: 0 },
      { id: 'wardrobe-1', kind: 'wardrobe', name: 'Wardrobe', width: 100, depth: 55, x: 225, y: 20, rotation: 90 },
      { id: 'desk-1', kind: 'desk', name: 'Compact desk', width: 100, depth: 50, x: 20, y: 220, rotation: 0 },
      { id: 'chair-1', kind: 'chair', name: 'Chair', width: 45, depth: 45, x: 45, y: 275, rotation: 0 },
    ],
  },
  {
    id: 'desk-fit',
    room: { name: 'Desk fit check', width: 320, depth: 360 },
    items: [
      { id: 'desk-1', kind: 'desk', name: 'New desk', width: 140, depth: 65, x: 20, y: 20, rotation: 0 },
      { id: 'chair-1', kind: 'chair', name: 'Desk chair', width: 55, depth: 55, x: 60, y: 95, rotation: 0 },
      { id: 'bed-1', kind: 'bed', name: 'Existing bed', width: 200, depth: 150, x: 20, y: 190, rotation: 0 },
      { id: 'wardrobe-1', kind: 'wardrobe', name: 'Wardrobe', width: 100, depth: 55, x: 200, y: 20, rotation: 0 },
    ],
  },
  {
    id: 'moving-day',
    room: { name: 'New living room', width: 420, depth: 450 },
    items: [
      { id: 'sofa-1', kind: 'sofa', name: 'Sofa', width: 200, depth: 85, x: 20, y: 20, rotation: 0 },
      { id: 'table-1', kind: 'table', name: 'Coffee table', width: 100, depth: 55, x: 70, y: 130, rotation: 0 },
      { id: 'chair-1', kind: 'chair', name: 'Armchair', width: 80, depth: 80, x: 290, y: 120, rotation: 0 },
      { id: 'dresser-1', kind: 'dresser', name: 'TV stand', width: 140, depth: 45, x: 130, y: 350, rotation: 0 },
      { id: 'plant-1', kind: 'plant', name: 'Plant', width: 34, depth: 34, x: 360, y: 25, rotation: 0 },
    ],
  },
  {
    id: 'work-from-home',
    room: { name: 'Work-from-home room', width: 360, depth: 420 },
    items: [
      { id: 'bed-1', kind: 'bed', name: 'Bed', width: 200, depth: 150, x: 20, y: 20, rotation: 0 },
      { id: 'desk-1', kind: 'desk', name: 'Work desk', width: 120, depth: 60, x: 220, y: 20, rotation: 0 },
      { id: 'chair-1', kind: 'chair', name: 'Work chair', width: 52, depth: 52, x: 250, y: 95, rotation: 0 },
      { id: 'wardrobe-1', kind: 'wardrobe', name: 'Wardrobe', width: 100, depth: 55, x: 20, y: 260, rotation: 0 },
      { id: 'plant-1', kind: 'plant', name: 'Plant', width: 34, depth: 34, x: 305, y: 350, rotation: 0 },
    ],
  },
]

export function getStarterPlan(id: string | null): StarterPlan | undefined {
  return starters.find((starter) => starter.id === id)
}
