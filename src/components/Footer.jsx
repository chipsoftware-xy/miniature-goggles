import { Link } from 'react-router-dom'
import { Mail, Phone, MessageCircle, Linkedin, Store } from 'lucide-react'
import { COMPANY, OFFICES, waLink } from '../config.js'
import { products, industries } from '../data.js'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink pb-24 pt-20 text-white/60 lg:pb-12">
      <div className="led-grid absolute inset-0 opacity-[.04]" aria-hidden />
      <div className="wrap relative">
        <p className="font-display text-[clamp(48px,11vw,160px)] font-extrabold leading-none text-white/[.06]" aria-hidden>KALPLABS</p>
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl font-extrabold text-white">KalpLabs</p>
            <p className="mt-3 max-w-sm">LED & LCD display solutions for Indian businesses: consultation, supply, installation and support.</p>
            <div className="mt-6 space-y-2 text-sm">
              <a className="flex items-center gap-2 hover:text-saffron" href={`tel:${COMPANY.mobileHref}`}><Phone size={16} />{COMPANY.mobile}</a>
              <a className="flex items-center gap-2 hover:text-saffron" href={`mailto:${COMPANY.email}`}><Mail size={16} />{COMPANY.email}</a>
              <a className="flex items-center gap-2 hover:text-saffron" href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} />WhatsApp us</a>
            </div>
            <div className="mt-6 flex gap-3">
              <a aria-label="LinkedIn" href={COMPANY.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-saffron hover:text-saffron"><Linkedin size={18} /></a>
              <a aria-label="IndiaMART" href={COMPANY.indiamart} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-saffron hover:text-saffron"><Store size={18} /></a>
            </div>
          </div>
          <div>
            <p className="mb-3 font-semibold text-white">Products</p>
            <ul className="space-y-2 text-sm">{products.map(p => <li key={p.slug}><Link className="hover:text-saffron" to={`/products/${p.slug}`}>{p.title}</Link></li>)}</ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-white">Solutions</p>
            <ul className="space-y-2 text-sm">{industries.slice(0, 6).map(p => <li key={p.slug}><Link className="hover:text-saffron" to={`/services/${p.slug}`}>{p.title}</Link></li>)}
              <li><Link className="hover:text-saffron" to="/calculator">Screen calculator</Link></li></ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-white">Offices</p>
            <ul className="space-y-3 text-sm">{OFFICES.map(o => <li key={o.city}><b className="text-white/90">{o.city}</b><br /><span className="text-white/45">{o.address}</span></li>)}</ul>
          </div>
        </div>
        <p className="mt-14 flex flex-wrap justify-between gap-2 border-t border-white/10 pt-6 text-sm">
          <span>© {new Date().getFullYear()} KalpLabs. All rights reserved.</span>
          <span className="font-mono text-xs text-white/30">Made in India</span>
        </p>
      </div>
    </footer>
  )
}
