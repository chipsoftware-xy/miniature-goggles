import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import QuoteForm from '../components/QuoteForm.jsx'
import ScreenVisual from '../components/ScreenVisual.jsx'
import PageHero from '../components/PageHero.jsx'
import { ProductCard, IndustryCard, Faq } from '../components/Cards.jsx'
import { Reveal, Tilt } from '../components/fx.jsx'
import { faqs } from '../data.js'

const BENEFITS = {
  product: ['Matched to your viewing distance and site', 'Professional survey, installation and calibration', 'Training and after-sales support'],
  industry: ['Displays chosen for your environment and hours of use', 'Content-ready setup with suitable controllers', 'One team from site survey to service']
}

export default function Detail({ items, base }) {
  const { slug } = useParams()
  const item = items.find(i => i.slug === slug)
  if (!item) return <PageHero title="Not found"><Link className="btn btn-primary mt-6" to={base}>View all</Link></PageHero>
  const isProduct = item.type === 'product'
  const related = items.filter(i => i.slug !== slug).slice(0, 4)
  const list = isProduct ? ['/products', 'Products'] : ['/services', 'Solutions']

  return (
    <>
      <Seo title={item.title} description={item.blurb} />
      <section className="relative overflow-hidden pb-16 pt-28">
        <div className="absolute inset-0 opacity-30 blur-3xl" aria-hidden><ScreenVisual scene={item.scene} bezel={false} ratio="h-full" className="h-full" /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" aria-hidden />
        <div className="wrap relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 flex gap-2 font-mono text-xs text-white/40"><Link to="/" className="hover:text-saffron">Home</Link>/<Link to={list[0]} className="hover:text-saffron">{list[1]}</Link></nav>
            <p className="eyebrow">{isProduct ? 'Product' : 'Industry solution'}</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-6xl">{item.title}</h1>
            <p className="mt-5 text-xl text-white/70">{item.blurb}</p>
            <ul className="mt-6 space-y-2">{BENEFITS[item.type].map(b => <li key={b} className="flex gap-2 text-white/75"><Check size={20} className="shrink-0 text-india" />{b}</li>)}</ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" className="btn btn-primary">Request a quote <ArrowRight size={18} /></a>
              <Link to="/calculator" className="btn btn-ghost">Size my screen</Link>
            </div>
          </div>
          <Tilt max={8} className="rounded-xl"><ScreenVisual scene={item.scene} label={item.title} className="shadow-[0_0_120px_-20px_rgba(242,140,40,.5)]" /></Tilt>
        </div>
      </section>

      <section className="section pt-10">
        <div className="wrap grid gap-12 lg:grid-cols-3">
          <div className="space-y-16 lg:col-span-2">
            {item.apps?.length > 0 && (
              <Reveal>
                <h2 className="text-3xl font-bold">Where it works best</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {item.apps.map((a, i) => (
                    <div key={a} className="card p-5"><span className="font-mono text-xs text-saffron">0{i + 1}</span><p className="mt-2 font-semibold text-white">{a}</p></div>
                  ))}
                </div>
              </Reveal>
            )}
            {isProduct && (
              <Reveal>
                <h2 className="text-3xl font-bold">Specifications</h2>
                <p className="mt-2 text-sm text-white/40">Exact figures vary by model. Ask us for the full datasheet.</p>
                <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
                  {item.specs.map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between bg-panel px-5 py-4"><dt className="text-white/55">{k}</dt><dd className="font-mono text-white">{v}</dd></div>
                  ))}
                </dl>
              </Reveal>
            )}
            <Reveal>
              <h2 className="text-3xl font-bold">FAQs</h2>
              <div className="mt-4">{faqs.map(([q, a]) => <Faq key={q} q={q} a={a} />)}</div>
            </Reveal>
          </div>
          <aside id="quote" className="card h-fit scroll-mt-24 p-6 lg:sticky lg:top-24">
            <h2 className="mb-1 text-2xl font-bold">Request a quote</h2>
            <p className="mb-5 text-sm text-white/50">For {item.title.toLowerCase()}</p>
            <QuoteForm defaultInterest={item.title} />
          </aside>
        </div>
      </section>

      <section className="section bg-panel/40">
        <div className="wrap">
          <h2 className="text-3xl font-bold">Related {isProduct ? 'products' : 'solutions'}</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {related.map(r => isProduct ? <ProductCard key={r.slug} p={r} base={base} /> : <IndustryCard key={r.slug} i={r} />)}
          </div>
        </div>
      </section>
    </>
  )
}

const FILTERS = [['all', 'All'], ['indoor', 'Indoor'], ['outdoor', 'Outdoor'], ['special', 'Special']]

Detail.List = function List({ items, title, base, sub }) {
  const [f, setF] = useState('all')
  const isProduct = items[0]?.type === 'product'
  const shown = items.filter(p => f === 'all' || p.env === f)
  return (
    <>
      <Seo title={title} description={`${title} from KalpLabs.`} />
      <PageHero eyebrow={isProduct ? 'Catalogue' : 'By industry'} title={title} sub={sub} crumbs={[['/', 'Home']]}>
        {isProduct && (
          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map(([k, l]) => (
              <button key={k} onClick={() => setF(k)} className={`rounded-full border px-4 py-2 text-sm transition ${f === k ? 'border-saffron bg-saffron text-ink' : 'border-white/15 text-white/70 hover:border-white/40'}`}>{l}</button>
            ))}
          </div>
        )}
      </PageHero>
      <section className="wrap section pt-12">
        <div className={`grid gap-6 ${isProduct ? 'sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-4'}`}>
          {shown.map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 80} className="h-full">{isProduct ? <ProductCard p={p} base={base} /> : <IndustryCard i={p} />}</Reveal>)}
        </div>
      </section>
    </>
  )
}
