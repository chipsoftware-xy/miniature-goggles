import { Link } from 'react-router-dom'
export default function PageHero({ eyebrow, title, sub, crumbs = [], children }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-16 pt-32">
      <div className="led-grid absolute inset-0 opacity-[.06]" aria-hidden />
      <div className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-saffron/20 blur-[120px]" aria-hidden />
      <div className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-india/15 blur-[120px]" aria-hidden />
      <div className="wrap relative">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 font-mono text-xs text-white/40">
            {crumbs.map(([to, l], i) => <span key={to} className="flex gap-2">{i > 0 && '/'}<Link to={to} className="hover:text-saffron">{l}</Link></span>)}
          </nav>
        )}
        {eyebrow && <p className="eyebrow" style={{ animation: 'fadein .6s both' }}>{eyebrow}</p>}
        <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl" style={{ animation: 'fadein .6s .08s both' }}>{title}</h1>
        {sub && <p className="mt-5 max-w-2xl text-lg text-white/60" style={{ animation: 'fadein .6s .16s both' }}>{sub}</p>}
        {children}
      </div>
    </section>
  )
}
