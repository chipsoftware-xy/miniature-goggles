import { Link } from 'react-router-dom'
import { COMPANY } from '../config.js'
import { products } from '../data.js'
export default function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-14 text-white/80 lg:pb-14">
      <div className="wrap grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold text-white">XYZ</p>
          <p className="mt-3 max-w-xs">Indian LED &amp; LCD display solutions: manufacturing, supply, installation and service.</p>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">Products</p>
          <ul className="space-y-1.5">{products.slice(0, 6).map(p => <li key={p.slug}><Link className="hover:text-saffron" to={`/products/${p.slug}`}>{p.title}</Link></li>)}</ul>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">Contact</p>
          <p>{COMPANY.address}</p>
          <p><a className="hover:text-saffron" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
          <p><a className="hover:text-saffron" href={`tel:${COMPANY.mobile}`}>{COMPANY.mobile}</a></p>
        </div>
      </div>
      <p className="wrap mt-10 border-t border-white/10 pt-6 text-sm">© {new Date().getFullYear()} XYZ. All rights reserved.</p>
    </footer>
  )
}
