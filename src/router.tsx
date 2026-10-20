import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react'

const normalize = (p: string) => p.replace(/\/+$/, '') || '/'
const currentPath = () => normalize(window.location.pathname)

export function navigate(to: string) {
  const [pathname, hash] = to.split('#')
  const targetPath = normalize(pathname || currentPath())
  const hasHash = Boolean(hash)

  if (targetPath !== currentPath() || window.location.hash !== (hasHash ? `#${hash}` : '')) {
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  if (hasHash) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function usePath() {
  const [path, setPath] = useState(currentPath)
  useEffect(() => {
    const sync = () => setPath(currentPath())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])
  return path
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string }

export function Link({ to, onClick, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
  return <a {...rest} href={to} onClick={handle} />
}
