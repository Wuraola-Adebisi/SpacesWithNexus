import { useEffect, useMemo, useState } from 'react'
import { Check, LoaderCircle, TriangleAlert, X } from 'lucide-react'
import { findIssues } from './geometry'
import type { Item, Placement, Proposal, Room } from './types'

const GOALS: [string, string][] = [
  ['More floor space', 'Open up as much floor space as possible and keep furniture out of the main walking path.'],
  ['A work corner', 'Put the desk and chair together in a comfortable work corner with room to sit and move.'],
  ['Clearer walkways', 'Make it easier to move through the room. Keep a clear path and avoid blocked access.'],
  ['Easier storage', 'Arrange the furniture so storage is easy to reach and the space is used efficiently.'],
]

type Props = {
  room: Room
  items: Item[]
  onPreview: (items: Item[] | null) => void
  onApply: (items: Item[]) => void
}

export default function SuggestPanel({ room, items, onPreview, onApply }: Props) {
  const [goal, setGoal] = useState('I want more open floor space and a comfortable place to work.')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [proposal, setProposal] = useState<Proposal | null>(null)

  const planKey = useMemo(() => JSON.stringify([room.width, room.depth, items]), [room.width, room.depth, items])
  const stale = proposal !== null && proposal.base !== planKey

  useEffect(() => {
    onPreview(proposal && !stale ? proposal.items : null)
  }, [proposal, stale, onPreview])
  useEffect(() => () => onPreview(null), [onPreview])

  const ask = async () => {
    if (!goal.trim() || busy || items.length === 0) return
    setBusy(true)
    setError('')
    setProposal(null)
    const base = planKey
    try {
      const res = await fetch('/api/suggest-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: { width: room.width, depth: room.depth, unit: 'cm' },
          furniture: items,
          goal,
          constraints: ['Rectangular room. Coordinates start at the top-left inside corner. Preserve furniture dimensions.'],
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data || !Array.isArray(data.placements)) {
        throw new Error(
          res.status === 404
            ? 'AI layout suggestions are unavailable right now. Please try again later.'
            : data?.error ?? 'We couldn’t generate a layout suggestion just now. Please try again.',
        )
      }
      const next = items.map((i) => {
        const p = (data.placements as Placement[]).find((v) => v.furnitureId === i.id)
        return p ? { ...i, x: Math.round(p.x), y: Math.round(p.y), rotation: p.rotation } : i
      })
      setProposal({
        name: String(data.name ?? 'Suggested layout'),
        summary: String(data.summary ?? ''),
        tradeoffs: Array.isArray(data.tradeoffs) ? data.tradeoffs.map(String).slice(0, 3) : [],
        items: next,
        issues: findIssues(next, room),
        base,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'We couldn’t generate a layout suggestion just now. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const blocked = Boolean(proposal?.issues.length) || stale

  return (
    <>
      <section className="panel-section">
        <h2 className="panel-title">Ask AI for a layout</h2>
        <p className="note lead-note">
          Describe what you want the room to do. Spaces with Nexus uses your room dimensions and furniture list to draft a proposal you can preview, adjust or discard.
        </p>
        <label className="field">
          <span>Your layout brief</span>
          <textarea value={goal} maxLength={1200} rows={5} onChange={(e) => setGoal(e.target.value)} />
        </label>
        <p className="counter">{goal.length} of 1200</p>
        <div className="chips" role="group" aria-label="Quick layout goals">
          {GOALS.map(([label, value]) => (
            <button key={label} className="chip" onClick={() => setGoal(value)}>{label}</button>
          ))}
        </div>
        <button className="btn btn-primary btn-block" onClick={ask} disabled={busy || !goal.trim() || items.length === 0}>
          {busy ? <><LoaderCircle size={16} className="spin" /> Generating options</> : 'Generate layout idea'}
        </button>
        {items.length === 0 ? <p className="note">Add furniture to your room to generate a layout idea.</p> : null}
        {error ? <p className="callout callout-warn" role="alert"><TriangleAlert size={16} /> {error}</p> : null}
      </section>

      {proposal ? (
        <section className="panel-section proposal" aria-label="AI layout proposal">
          <div className="proposal-head">
            <h3>{proposal.name}</h3>
            <button className="icon-btn" onClick={() => setProposal(null)} aria-label="Discard suggestion"><X size={16} /></button>
          </div>
          <p>{proposal.summary}</p>
          {proposal.tradeoffs.length ? (
            <ul className="tradeoffs">{proposal.tradeoffs.map((t, i) => <li key={i}>{t}</li>)}</ul>
          ) : null}
          {stale ? (
            <p className="callout callout-warn"><TriangleAlert size={16} /> Your room or furniture has changed since this suggestion was created. Generate a new layout to match your current plan.</p>
          ) : proposal.issues.length ? (
            <p className="callout callout-warn"><TriangleAlert size={16} /> {proposal.issues.slice(0, 2).map((s) => s.message).join('. ')}. Adjust the arrangement before applying it.</p>
          ) : null}
          <div className="button-row">
            <button className="btn btn-quiet btn-sm" onClick={() => setProposal(null)}>Discard</button>
            <button className="btn btn-dark btn-sm" disabled={blocked} onClick={() => { onApply(proposal.items); setProposal(null) }}>
              <Check size={14} /> Apply layout
            </button>
          </div>
        </section>
      ) : null}

      <p className="privacy-note">
        To generate a layout idea, NEXUS sends your room dimensions, furniture details and the goal you enter to its AI service. Your plan is otherwise saved only in this browser.
      </p>
    </>
  )
}
