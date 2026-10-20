import type { ReactNode } from 'react'
import { BRAND } from '../brand'
import { Mark } from '../Mark'
import { Link } from '../router'

const nav = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/about', label: 'About us' },
]

export function SiteHeader({ path }: { path: string }) {
  return (
    <header className="wrap site-header">
      <Link to="/" className="brand" aria-label={`${BRAND} home`}><Mark />{BRAND}</Link>
      <nav className="site-nav" aria-label="Main">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} aria-current={path === n.to ? 'page' : undefined}>{n.label}</Link>
        ))}
      </nav>
      <Link to="/workspace" className="btn btn-primary btn-sm header-cta">Open planner</Link>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-brand-block">
          <Link to="/" className="brand footer-brand" aria-label={`${BRAND} home`}><Mark />{BRAND}</Link>
          <p>Thoughtful planning for the spaces we live and work in.</p>
          <Link to="/workspace" className="btn btn-primary">Plan your room</Link>
        </div>
        <div className="footer-nav-block">
          <p className="footer-heading">Explore Spaces with Nexus</p>
          <nav className="footer-links" aria-label="Footer">
            <Link to="/workspace">Room planner</Link>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/about">About us</Link>
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
        <Link to="/workspace" className="btn btn-primary">Open the planner</Link>
      </div>
    </section>
  )
}
