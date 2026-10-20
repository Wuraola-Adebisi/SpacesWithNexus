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
    title: 'Start with the room you have',
    body: 'Enter your room dimensions to create a scaled floor plan. No idealised showroom, just a practical starting point based on your space.',
  },
  {
    number: '02',
    title: 'Make your furniture part of the plan',
    body: 'Add the pieces you own, adjust their measurements, then move and rotate them on the plan to see how the arrangement comes together.',
  },
  {
    number: '03',
    title: 'Try another way',
    body: 'Describe what you want the room to do and explore an AI-assisted layout proposal shaped by your dimensions, furniture and goal.',
  },
]

const moments = [
  { title: 'Making a room work harder', body: 'Find a place for work, rest, storage or guests without pretending you have more space than you do.' },
  { title: 'Considering a new piece', body: 'Check the footprint of a desk, bed or cabinet against your room before bringing it home.' },
  { title: 'Getting ready to move', body: 'Think through where the larger pieces could go before the lifting, shifting and rearranging begin.' },
]

function LayoutComparison() {
  return (
    <div className="layout-comparison" aria-label="Illustrative comparison of two furniture arrangements in the same room">
      <div className="comparison-heading">
        <span className="comparison-kicker">ONE ROOM, TWO POSSIBILITIES</span>
        <span className="comparison-dimensions">4.2 m × 3.4 m</span>
      </div>
      <div className="comparison-plans">
        <div className="comparison-plan">
          <div className="comparison-plan-label"><span>01</span><strong>Current arrangement</strong></div>
          <svg className="mini-plan" viewBox="0 0 280 220" role="img" aria-label="A room plan with a bed, desk and wardrobe arranged around a crowded centre">
            <rect x="18" y="14" width="244" height="190" rx="2" className="plan-room" />
            <rect x="30" y="26" width="112" height="78" rx="3" className="plan-bed" />
            <path d="M36 32h100v18H36z" className="plan-pillow" />
            <rect x="150" y="26" width="98" height="36" rx="2" className="plan-wardrobe" />
            <path d="M199 26v36" className="plan-detail" />
            <rect x="30" y="120" width="94" height="32" rx="2" className="plan-desk" />
            <rect x="54" y="158" width="42" height="30" rx="5" className="plan-chair" />
            <rect x="146" y="90" width="70" height="88" rx="3" className="plan-bed" />
            <path d="M153 98h56v14h-56z" className="plan-pillow" />
            <path d="M18 204h244" className="plan-wall" />
          </svg>
          <p>The centre feels crowded.</p>
        </div>
        <div className="comparison-plan comparison-plan-proposed">
          <div className="comparison-plan-label"><span>02</span><strong>Another possibility</strong></div>
          <svg className="mini-plan" viewBox="0 0 280 220" role="img" aria-label="An alternative room plan with the bed against one wall, desk by the side and a clearer centre">
            <rect x="18" y="14" width="244" height="190" rx="2" className="plan-room" />
            <rect x="30" y="26" width="112" height="78" rx="3" className="plan-bed" />
            <path d="M36 32h100v18H36z" className="plan-pillow" />
            <rect x="150" y="26" width="98" height="36" rx="2" className="plan-wardrobe" />
            <path d="M199 26v36" className="plan-detail" />
            <rect x="150" y="142" width="94" height="32" rx="2" className="plan-desk" />
            <rect x="174" y="105" width="42" height="30" rx="5" className="plan-chair" />
            <rect x="30" y="132" width="48" height="48" rx="3" className="plan-table" />
            <path d="M88 122h50" className="plan-path" />
            <path d="M18 204h244" className="plan-wall" />
          </svg>
          <p>More open space to consider.</p>
        </div>
      </div>
      <div className="comparison-note"><span className="comparison-note-dot" /> Illustrative layout only, not a generated result. Your options depend on your measurements and furniture.</div>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <section className="wrap hero">
        <div className="hero-copy">
          <p className="eyebrow">Room planning for real life</p>
          <h1>A little more room to live.</h1>
          <p className="lede">
            Plan your space around the room you have, the furniture you own, and the life you want it to make room for. Explore an arrangement on a measured floor plan before you start moving things.
          </p>
          <div className="hero-actions">
            <Link to="/workspace" className="btn btn-primary btn-lg">Plan your room</Link>
            <Link to="/how-it-works" className="text-link">See how it works</Link>
          </div>
          <p className="hero-reassurance">Your room. Your furniture. Your call.</p>
        </div>
        <HeroPlanner />
      </section>

      <Reveal>
        <section className="section">
          <div className="wrap split">
            <div className="lead">
              <p className="eyebrow">Start with what is real</p>
              <h2>A room has to do more than look good.</h2>
              <p>It might need to fit a bed, a desk, storage, and the everyday space to move around. You should not have to guess your way through every possible arrangement.</p>
              <p className="lead-last">Spaces with Nexus helps you think through the options before you put your back into moving everything.</p>
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
              <p className="eyebrow">Think it through before you move it</p>
              <h2>See what could change.</h2>
              <p>Tell Spaces with Nexus what you want your room to do. AI-assisted suggestions give you another arrangement to consider, using your room dimensions, furniture details and goal as context.</p>
              <p>It is a proposal, not a verdict. Review the layout, check any flagged fit issues, and decide what makes sense for your space and the way you live.</p>
              <Link to="/workspace" className="btn btn-primary">Explore a layout</Link>
            </div>
            <LayoutComparison />
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
        <CtaBand title="Start with your room. Explore what could work." />
      </Reveal>
    </main>
  )
}
