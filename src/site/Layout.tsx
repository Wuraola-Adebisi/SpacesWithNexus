import type { ReactNode } from 'react'
import { BRAND } from '../brand'
import { Mark } from '../Mark'
import { Link } from '../router'

const nav = [
  { to: '/examples', label: 'Examples' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function SiteHeader({ path }: { path: string }) {
  return (
    <header className="site-header-wrap">
      <div className="wrap site-header">
        <Link to="/" className="brand" aria-label={`${BRAND} home`}><Mark />{BRAND}</Link>
        <nav className="site-nav" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={path === n.to ? 'is-active' : undefined} aria-current={path === n.to ? 'page' : undefined}>{n.label}</Link>
          ))}
        </nav>
        <Link to="/workspace" className="btn btn-primary btn-sm header-cta">Plan a room</Link>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-brand-block">
          <Link to="/" className="brand footer-brand" aria-label={`${BRAND} home`}><Mark />{BRAND}</Link>
          <p>Make a little more room for the life happening in yours.</p>
          <Link to="/workspace" className="btn btn-primary">Plan your room</Link>
        </div>
        <div className="footer-nav-block">
          <p className="footer-heading">Explore Spaces with Nexus</p>
          <nav className="footer-links" aria-label="Footer">
            <Link to="/workspace">Room planner</Link>
            <Link to="/examples">Examples</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
          </nav>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>© {new Date().getFullYear()} {BRAND}</p>
        <p>Room planning, made more considered.</p>
      </div>
    </footer>
  )
}

export function Shell({ path, children }: { path: string; children: ReactNode }) {
  return (
    <div className="site">
      <SiteHeader path={path} />
      {children}
      <SiteFooter />
    </div>
  )
}

export function CtaBand({ title }: { title: string }) {
  return (
    <section className="wrap">
      <div className="cta-band on-dark">
        <h2>{title}</h2>
        <Link to="/workspace" className="btn btn-primary">Try the room planner</Link>
      </div>
    </section>
  )
}
