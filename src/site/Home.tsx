import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from '../router'
import { CtaBand } from './Layout'
import HeroPlanner from './HeroPlanner'

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>
}

const features = [
  {
    number: '01',
    title: 'Plan with real measurements',
    body: 'Set your room dimensions, enter the width and depth of your furniture, and arrange each piece on a scaled floor plan.',
  },
  {
    number: '02',
    title: 'See basic fit issues sooner',
    body: 'Spaces with Nexus flags furniture that overlaps or extends beyond the room, helping you catch potential problems before moving anything.',
  },
  {
    number: '03',
    title: 'Explore more possibilities',
    body: 'Describe what you want to improve and get an AI-assisted arrangement shaped around your room, furniture and goal. Review it on the floor plan before applying it.',
  },
]

const moments = [
  { title: 'Refreshing a room', body: 'Explore new ways to arrange the furniture you already own.' },
  { title: 'Bringing in something new', body: 'Check the footprint against your room before bringing a new piece home.' },
  { title: 'Moving or settling in', body: 'Plan where larger pieces might go before moving day, then refine the layout as you go.' },
]

export default function Home() {
  return (
    <main>
      <section className="wrap hero">
        <div className="hero-copy">
          <p className="eyebrow">Thoughtful room planning, grounded in real measurements.</p>
          <h1>Make room for what matters.</h1>
          <p className="lede">
            Spaces with Nexus helps you map your room, arrange the furniture you own, and explore layout ideas shaped around your dimensions and goals. See what could work on a floor plan before you start moving things.
          </p>
          <div className="hero-actions">
            <Link to="/workspace" className="btn btn-primary btn-lg">Plan my room</Link>
            <Link to="/how-it-works" className="text-link">See how it works</Link>
          </div>
        </div>
        <HeroPlanner />
      </section>

      <Reveal>
        <section className="section">
          <div className="wrap split">
            <div className="lead">
              <p className="eyebrow">Make the space make sense</p>
              <h2>Good room layouts start with what actually fits.</h2>
              <p>Inspiration is a starting point. Spaces with Nexus pairs your measurements with AI-assisted layout ideas, so you can explore what might work in your own space with your own furniture.</p>
            </div>
            <ul className="rows">
              {features.map((f) => (
                <li key={f.number}>
                  <span className="feature-number">{f.number}</span>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="ai-section">
          <div className="wrap ai-grid">
            <div className="ai-copy">
              <p className="eyebrow">From layout brief to proposal</p>
              <h2>An AI layout partner, grounded in your room.</h2>
              <p>Tell Spaces with Nexus what the room needs to do. It uses your dimensions, furniture details and goal as context to draft another arrangement, giving you a concrete option to evaluate instead of a blank page.</p>
              <p>Every suggestion is a proposal, not a command. Preview the positions, review any flagged overlaps, and decide whether to apply it. You remain responsible for checking walkways, access and clearances in the actual room.</p>
              <Link to="/workspace" className="btn btn-primary">Explore a layout</Link>
            </div>
            <div className="ai-card" aria-label="Illustrative example of a layout brief and suggested outcome">
              <div className="ai-card-top"><span className="ai-pulse" /> LAYOUT BRIEF</div>
              <p className="ai-prompt">“Make more room to move and give me a comfortable work corner.”</p>
              <div className="ai-divider" />
              <div className="ai-result-label">POSSIBLE LAYOUT DIRECTION</div>
              <div className="ai-result">
                <span className="ai-result-mark">01</span>
                <div><strong>Open up the centre</strong><p>Consider moving larger pieces towards the walls where the dimensions allow.</p></div>
              </div>
              <div className="ai-result">
                <span className="ai-result-mark">02</span>
                <div><strong>Group work furniture</strong><p>Place the desk and chair together to define a dedicated work area.</p></div>
              </div>
              <p className="ai-card-foot">Illustrative example. Generated suggestions vary with your room, furniture and goal.</p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section moments-section">
          <div className="wrap">
            <div className="moments-heading">
              <p className="eyebrow">Useful before the heavy lifting</p>
              <h2>For the changes you are thinking about.</h2>
            </div>
            <div className="moment-grid">
              {moments.map((moment, i) => (
                <article className="moment-card" key={moment.title}>
                  <span className="moment-index">0{i + 1}</span>
                  <h3>{moment.title}</h3>
                  <p>{moment.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <CtaBand title="Bring your measurements. Explore what could work." />
      </Reveal>
    </main>
  )
}
