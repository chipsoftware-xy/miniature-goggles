import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { products, industries } from '../data.js'
import { COMPANY } from '../config.js'
import ScreenVisual from './ScreenVisual.jsx'

const nav = 'px-3 py-2 text-sm font-medium text-white/75 transition hover:text-white aria-[current=page]:text-saffron'

function Mega({ label, to, items, base, heading, visuals }) {
  return (
    <div className="group relative">
      <NavLink to={to} className={`flex items-center gap-1 ${nav}`}>{label}<ChevronDown size={14} className="transition group-hover:rotate-180" aria-hidden /></NavLink>
      <div className="invisible absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 translate-y-2 rounded-2xl border border-white/10 bg-panel/95 p-3 opacity-0 shadow-2xl backdrop-blur-xl transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {heading && <p className="eyebrow px-3 pb-2 pt-1">{heading}</p>}
        <div className="grid grid-cols-2 gap-1">
          {items.map(i => (
            <Link key={i.slug} to={`${base}/${i.slug}`} className="flex items-center gap-3 rounded-xl p-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white">
              {visuals && <ScreenVisual scene={i.scene} bezel={false} className="w-16 shrink-0 rounded-md" />}
              <span>{i.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled || open ? 'border-b border-white/10 bg-ink/80 backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="h-[2px] led-scan" aria-hidden />
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight text-white">
          <span className="grid grid-cols-3 gap-[2px]" aria-hidden>
            {['#F28C28', '#F28C28', '#fff', '#F28C28', '#fff', '#1DB954', '#fff', '#1DB954', '#1DB954'].map((c, i) => <i key={i} className="h-[5px] w-[5px] rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />)}
          </span>
          KalpLabs
        </Link>
        <nav className="hidden items-center lg:flex" aria-label="Main">
          <NavLink to="/" end className={nav}>Home</NavLink>
          <Mega label="Products" to="/products" items={products} base="/products" heading="LED & LCD displays" visuals />
          <Mega label="Solutions" to="/services" items={industries} base="/services" heading="By industry" visuals />
          <NavLink to="/calculator" className={nav}>Calculator</NavLink>
          <NavLink to="/blog" className={nav}>Insights</NavLink>
          <NavLink to="/about" className={nav}>About</NavLink>
          <NavLink to="/contact" className={nav}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${COMPANY.mobileHref}`} className="hidden items-center gap-2 font-mono text-sm text-white/70 hover:text-white xl:flex"><Phone size={15} />{COMPANY.mobile}</a>
          <Link to="/contact" className="btn btn-primary hidden py-2 text-sm sm:inline-flex">Get a Quote</Link>
          <button className="text-white lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="max-h-[80vh] overflow-y-auto border-t border-white/10 p-4 lg:hidden" aria-label="Mobile">
          {[['/', 'Home'], ['/products', 'Products'], ['/services', 'Solutions by industry'], ['/calculator', 'Screen calculator'], ['/blog', 'Insights'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, l]) => (
            <Link key={to} to={to} className="block border-b border-white/5 py-3 font-medium text-white">{l}</Link>
          ))}
          <Link to="/contact" className="btn btn-primary mt-4 w-full">Get a Quote</Link>
        </nav>
      )}
    </header>
  )
}
