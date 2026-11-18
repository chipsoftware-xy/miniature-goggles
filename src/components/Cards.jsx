import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import ScreenVisual from './ScreenVisual.jsx'
import { Tilt } from './fx.jsx'

const ENV = { indoor: 'Indoor', outdoor: 'Outdoor', special: 'Special' }

export function ProductCard({ p, base = '/products' }) {
  return (
    <Tilt className="h-full rounded-2xl">
      <Link to={`${base}/${p.slug}`} className="card group flex h-full flex-col overflow-hidden transition hover:border-saffron/50">
        <div className="p-3 pb-0 [transform:translateZ(30px)]"><ScreenVisual scene={p.scene} label={p.title} /></div>
        <div className="flex flex-1 flex-col p-5">
          {p.env && <span className="w-fit rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/50">{ENV[p.env]}</span>}
          <h3 className="mt-3 flex items-start justify-between gap-2 text-lg font-bold">{p.title}<ArrowUpRight size={20} className="shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-saffron" /></h3>
          <p className="mt-2 flex-1 text-sm text-white/55">{p.blurb}</p>
        </div>
      </Link>
    </Tilt>
  )
}

export function IndustryCard({ i }) {
  return (
    <Link to={`/services/${i.slug}`} className="group relative block overflow-hidden rounded-2xl border border-white/10">
      <ScreenVisual scene={i.scene} bezel={false} ratio="aspect-[4/5]" className="transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent transition group-hover:via-ink/40" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-lg font-bold">{i.title}</h3>
        <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">{i.blurb}</p>
      </div>
    </Link>
  )
}

export function PostCard({ p }) {
  return (
    <Link to={`/blog/${p.slug}`} className="card group block overflow-hidden transition hover:border-saffron/50">
      <ScreenVisual scene={p.scene} bezel={false} ratio="aspect-[16/9]" className="transition duration-700 group-hover:scale-105" />
      <div className="p-5">
        <time className="font-mono text-xs text-white/40">{p.date}</time>
        <h3 className="mt-2 text-lg font-bold group-hover:text-saffron">{p.title}</h3>
        <p className="mt-2 text-sm text-white/55">{p.excerpt}</p>
      </div>
    </Link>
  )
}

export function Faq({ q, a }) {
  const [o, setO] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-white" aria-expanded={o} onClick={() => setO(!o)}>
        {q}<ChevronDown className={`shrink-0 text-saffron transition ${o ? 'rotate-180' : ''}`} size={20} />
      </button>
      <div className={`grid transition-all duration-300 ${o ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}><p className="overflow-hidden text-white/60">{a}</p></div>
    </div>
  )
}
