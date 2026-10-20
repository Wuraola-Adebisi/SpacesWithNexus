import { useEffect } from 'react'
import { BRAND } from './brand'
import Planner from './planner/Planner'
import { usePath } from './router'
import { Shell } from './site/Layout'
import Home from './site/Home'
import { About, Contact, Examples, HowItWorks, NotFound, Privacy } from './site/pages'

const titles: Record<string, string> = {
  '/': `${BRAND}: try the layout before you lift anything`,
  '/examples': `Room planning examples | ${BRAND}`,
  '/about': `About | ${BRAND}`,
  '/contact': `Contact | ${BRAND}`,
  '/how-it-works': `How it works | ${BRAND}`,
  '/privacy': `Privacy | ${BRAND}`,
  '/workspace': `Planner | ${BRAND}`,
}

export default function App() {
  const path = usePath()

  useEffect(() => {
    document.title = titles[path] ?? `Page not found | ${BRAND}`
  }, [path])

  if (path === '/workspace') return <Planner />

  const page =
    path === '/' ? <Home /> :
    path === '/examples' ? <Examples /> :
    path === '/about' ? <About /> :
    path === '/contact' ? <Contact /> :
    path === '/how-it-works' ? <HowItWorks /> :
    path === '/privacy' ? <Privacy /> :
    <NotFound />

  return <Shell path={path}>{page}</Shell>
}
