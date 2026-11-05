import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { products, industries } from '../data.js'
import { COMPANY } from '../config.js'

function Dropdown({ label, to, items, base, heading }) {
  return (
    <div className="group relative">
      <NavLink to={to} className="flex items-center gap-1 px-3 py-2 font-medium hover:text-saffron">
        {label}<ChevronDown size={16} aria-hidden />
      </NavLink>
      <div className="invisible absolute left-0 top-full z-50 w-72 rounded-lg border border-ink/10 bg-white p-2 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        {heading && <p className="px-3 py-1 text-sm font-semibold text-ink/60">{heading}</p>}
        {items.map(i => (
          <Link key={i.slug} to={`${base}/${i.slug}`} className="block rounded px-3 py-2 text-sm hover:bg-mist">{i.title}</Link>
        ))}
      </div>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
      <div className="h-1 led-scan" aria-hidden />
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-2xl font-extrabold tracking-tight" onClick={close}>
          XYZ<span className="ml-1 text-sm font-medium text-india">Displays</span>
        </Link>
        <nav className="hidden items-center lg:flex" aria-label="Main">
          <NavLink to="/" end className="px-3 py-2 font-medium hover:text-saffron">Home</NavLink>
          <Dropdown label="Our Products" to="/products" items={products} base="/products" />
          <Dropdown label="Services" to="/services" items={industries} base="/services" heading="By Industry" />
          <NavLink to="/blog" className="px-3 py-2 font-medium hover:text-saffron">Blog</NavLink>
          <NavLink to="/about" className="px-3 py-2 font-medium hover:text-saffron">About Us</NavLink>
          <NavLink to="/contact" className="px-3 py-2 font-medium hover:text-saffron">Contact Us</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${COMPANY.mobile}`} className="hidden items-center gap-2 text-sm font-medium xl:flex"><Phone size={16} />{COMPANY.mobile}</a>
          <Link to="/contact" className="btn btn-primary hidden py-2 sm:inline-flex">Get a Quote</Link>
          <button className="lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="max-h-[80vh] overflow-y-auto border-t border-ink/10 bg-white p-4 lg:hidden" aria-label="Mobile">
          {[['/', 'Home'], ['/products', 'Our Products'], ['/services', 'Services (By Industry)'], ['/blog', 'Blog'], ['/about', 'About Us'], ['/contact', 'Contact Us']].map(([to, l]) => (
            <Link key={to} to={to} onClick={close} className="block py-3 font-medium">{l}</Link>
          ))}
          <Link to="/contact" onClick={close} className="btn btn-primary mt-2 w-full">Get a Quote</Link>
        </nav>
      )}
    </header>
  )
}
