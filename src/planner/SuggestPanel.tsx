import { useEffect, useMemo, useState } from 'react'
import { Check, LoaderCircle, TriangleAlert, X } from 'lucide-react'
import { findIssues } from './geometry'
import type { Item, Placement, Proposal, Room } from './types'

const GOALS: [string, string][] = [
  ['More room to move', 'I want more open floor space and a clear path to walk through the room.'],
  ['Make space to work', 'I want my desk and chair together, with enough room to sit down and work comfortably.'],
  ['Clear walking space', 'I want an easy path through the room without furniture getting in the way.'],
  ['Reach things easily', 'I want my wardrobe and storage to be easy to reach without crowding the room.'],
]

type Props = {
  room: Room
  items: Item[]
  onPreview: (items: Item[] | null) => void
  onApply: (items: Item[]) => void
}

export default function SuggestPanel({ room, items, onPreview, onApply }: Props) {
  const [goal, setGoal] = useState('I want more room to move around and a comfortable place to work.')
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
        <h2 className="panel-title">Explore another arrangement</h2>
        <p className="note lead-note">
          What would you like to change? Choose an idea below or tell us in your own words. We’ll suggest another way to arrange the furniture you’ve added. Look it over before deciding whether to use it.
        </p>
        <label className="field">
          <span>What would you like your room to feel or do?</span>
          <textarea value={goal} maxLength={1200} rows={5} onChange={(e) => setGoal(e.target.value)} />
        </label>
        <p className="counter">{goal.length} of 1200</p>
        <div className="chips" role="group" aria-label="Choose what you want to change about the room">
          {GOALS.map(([label, value]) => (
            <button key={label} className="chip" onClick={() => setGoal(value)}>{label}</button>
          ))}
        </div>
        <button className="btn btn-primary btn-block" onClick={ask} disabled={busy || !goal.trim() || items.length === 0}>
          {busy ? <><LoaderCircle size={16} className="spin" /> Working on an idea…</> : 'Suggest a layout'}
        </button>
        {items.length === 0 ? <p className="note">Add at least one piece of furniture to get a layout suggestion.</p> : null}
        {error ? <p className="callout callout-warn" role="alert"><TriangleAlert size={16} /> {error}</p> : null}
      </section>

      {proposal ? (
        <section className="panel-section proposal" aria-label="AI layout proposal">
          <div className="proposal-head">
            <h3>{proposal.name}</h3>
            <button className="icon-btn" onClick={() => setProposal(null)} aria-label="Close suggestion"><X size={16} /></button>
          </div>
          <p>{proposal.summary}</p>
          {proposal.tradeoffs.length ? (
            <ul className="tradeoffs">{proposal.tradeoffs.map((t, i) => <li key={i}>{t}</li>)}</ul>
          ) : null}
          {stale ? (
            <p className="callout callout-warn"><TriangleAlert size={16} /> You’ve changed the room or moved furniture since this idea was made. Get a new suggestion to match your latest plan.</p>
          ) : proposal.issues.length ? (
            <p className="callout callout-warn"><TriangleAlert size={16} /> {proposal.issues.slice(0, 2).map((s) => s.message).join('. ')}. Check the highlighted problems and adjust the layout before using it.</p>
          ) : null}
          <div className="button-row">
            <button className="btn btn-quiet btn-sm" onClick={() => setProposal(null)}>Keep my current layout</button>
            <button className="btn btn-dark btn-sm" disabled={blocked} onClick={() => { onApply(proposal.items); setProposal(null) }}>
              <Check size={14} /> Use this layout
            </button>
          </div>
        </section>
      ) : null}

      <p className="privacy-note">
        When you ask for a layout idea, we send your room measurements, furniture details and your description to our AI service to create it. Your plan is saved in this browser when you choose Save changes.
      </p>
    </>
  )
}
