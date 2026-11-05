import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import QuoteForm from '../components/QuoteForm.jsx'
import { faqs, products, industries } from '../data.js'
import { img } from '../config.js'

const specs = [['Pixel pitch', '[placeholder]'], ['Brightness', '[placeholder]'], ['Screen size', '[placeholder]'], ['Refresh rate', '[placeholder]'], ['Ingress protection', '[placeholder]'], ['Warranty', '[placeholder]']]

function Faq({ q, a }) {
  const [o, setO] = useState(false)
  return (
    <div className="border-b border-ink/10">
      <button className="flex w-full items-center justify-between py-4 text-left font-semibold" aria-expanded={o} onClick={() => setO(!o)}>{q}<ChevronDown className={o ? 'rotate-180' : ''} size={18} /></button>
      {o && <p className="pb-4 text-ink/70">{a}</p>}
    </div>
  )
}

export default function Detail({ items, base }) {
  const { slug } = useParams()
  const item = items.find(i => i.slug === slug)
  if (!item) return <div className="wrap section"><h1 className="text-3xl font-bold">Not found</h1><Link className="btn btn-primary mt-4" to={base}>View all</Link></div>
  const isProduct = item.type === 'product'
  const related = items.filter(i => i.slug !== slug).slice(0, 3)
  return (
    <>
      <Seo title={item.title} description={item.blurb} />
      <section className="bg-ink text-white">
        <div className="wrap grid items-center gap-8 py-14 lg:grid-cols-2">
          <div>
            <p className="text-saffron">{isProduct ? 'Our Products' : 'Services by Industry'}</p>
            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">{item.title}</h1>
            <p className="mt-4 text-lg text-white/80">{item.blurb}</p>
            <a href="#quote" className="btn btn-primary mt-6">Request a Quote</a>
          </div>
          <img src={img(item.title + ' (placeholder)', 800, 500)} alt={`${item.title} placeholder`} className="rounded-lg" />
        </div>
      </section>
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold">Overview and key benefits</h2>
            <p className="mt-3 text-ink/75">[Placeholder overview. Describe this {isProduct ? 'product category' : 'industry solution'} in your own words.]</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-ink/75"><li>[Benefit one]</li><li>[Benefit two]</li><li>[Benefit three]</li></ul>
            <h2 className="mt-10 text-2xl font-bold">Applications</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-ink/75"><li>[Application one]</li><li>[Application two]</li><li>[Application three]</li></ul>
            {isProduct && (<>
              <h2 className="mt-10 text-2xl font-bold">Specifications <span className="text-base font-normal text-ink/50">(placeholders, not real data)</span></h2>
              <table className="mt-3 w-full text-left"><tbody>{specs.map(([k, v]) => <tr key={k} className="border-b border-ink/10"><th className="w-1/2 py-2 font-medium">{k}</th><td className="text-ink/60">{v}</td></tr>)}</tbody></table>
            </>)}
            <h2 className="mt-10 text-2xl font-bold">Gallery</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">{[1, 2].map(n => <img key={n} loading="lazy" src={img(`Gallery ${n}`, 600, 400)} alt={`Gallery placeholder ${n}`} className="rounded-lg" />)}</div>
            <h2 className="mt-10 text-2xl font-bold">FAQs</h2>
            <div className="mt-2">{faqs.map(([q, a]) => <Faq key={q} q={q} a={a} />)}</div>
          </div>
          <aside id="quote" className="h-fit rounded-lg border border-ink/10 bg-mist p-6 lg:sticky lg:top-24">
            <h2 className="mb-4 text-xl font-bold">Request a Quote</h2>
            <QuoteForm defaultInterest={item.title} />
          </aside>
        </div>
      </section>
      <section className="section bg-mist">
        <div className="wrap">
          <h2 className="text-2xl font-bold">Related {isProduct ? 'products' : 'solutions'}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">{related.map(r => <Link key={r.slug} to={`${base}/${r.slug}`} className="rounded-lg bg-white p-5 hover:shadow-md"><h3 className="font-bold">{r.title}</h3><p className="mt-1 text-sm text-ink/70">{r.blurb}</p></Link>)}</div>
        </div>
      </section>
    </>
  )
}

Detail.List = function List({ items, title, base }) {
  return (
    <>
      <Seo title={title} description={`${title} from XYZ.`} />
      <section className="wrap section">
        <h1 className="text-4xl font-extrabold">{title}</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(p => (
            <Link key={p.slug} to={`${base}/${p.slug}`} className="rounded-lg border border-ink/10 p-5 hover:border-saffron">
              <img src={img(p.title, 500, 320)} alt="" loading="lazy" className="mb-3 rounded" />
              <h2 className="text-lg font-bold">{p.title}</h2><p className="mt-1 text-sm text-ink/70">{p.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
