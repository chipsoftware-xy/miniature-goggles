import { Link } from 'react-router-dom'
import { Wrench, Settings2, ShieldCheck, Truck, LifeBuoy, Headphones, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import QuoteForm from '../components/QuoteForm.jsx'
import { products, industries, posts } from '../data.js'
import { img, waLink } from '../config.js'

const why = [
  [Wrench, 'Made in India approach', 'Designed and built with Indian conditions in mind.'],
  [Settings2, 'Customised solutions', 'Sizes, shapes and mounting matched to your site.'],
  [ShieldCheck, 'Quality-focused engineering', 'Careful design and testing at every stage.'],
  [Truck, 'Professional installation', 'Trained teams to set up your display properly.'],
  [LifeBuoy, 'Support and maintenance', 'Help available after the display goes live.'],
  [Headphones, 'Reliable customer service', 'A team that answers and follows through.']
]
const projects = ['Outdoor advertising screen', 'Indoor video wall', 'Commercial digital signage', 'Retail storefront display']

export function ProductCard({ p, base = '/products' }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-ink/10 bg-white">
      <img src={img(p.title)} alt={`${p.title} (placeholder image)`} loading="lazy" className="aspect-[8/5] w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold">{p.title}</h3>
        <p className="mt-2 flex-1 text-ink/70">{p.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={`${base}/${p.slug}`} className="btn btn-dark px-4 py-2 text-sm">View Details</Link>
          <Link to={`/contact?interest=${encodeURIComponent(p.title)}`} className="btn btn-line px-4 py-2 text-sm">Request a Quote</Link>
        </div>
      </div>
    </article>
  )
}

export default function Home() {
  return (
    <>
      <Seo title="LED & LCD Display Solutions" description="XYZ: Indian LED and LCD display solutions for businesses, industries and public spaces." />
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="led-grid absolute inset-0 opacity-[0.12]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 flex h-2" aria-hidden>
          <i className="flex-1 bg-saffron" /><i className="flex-1 bg-white" /><i className="flex-1 bg-india" />
        </div>
        <div className="wrap relative grid items-center gap-10 py-20 md:py-28 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-6xl">Made in India. Built to Illuminate the Future.</h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">Advanced LED &amp; LCD display solutions engineered for Indian businesses, industries, and public spaces.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-primary">Explore Our Products</Link>
              <Link to="/contact" className="btn btn-ghost">Get a Quote</Link>
            </div>
          </div>
          <img src={img('LED video wall (placeholder)', 900, 600)} alt="LED video wall in a commercial space (placeholder image)" className="rounded-lg border border-white/10 shadow-2xl" />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <img src={img('Indian engineering illustration (placeholder)', 800, 560)} alt="Engineering illustration placeholder" className="rounded-lg" loading="lazy" />
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Proudly Indian. Engineered for Excellence.</h2>
            <p className="mt-4 text-ink/75">XYZ is committed to Indian manufacturing, consistent quality and continuous innovation. We tailor every display to the project and stand behind it with dependable after-sales service.</p>
            <p className="mt-3 text-sm text-ink/50">[Placeholder copy. Add verified facts about your manufacturing before publishing.]</p>
            <div className="mt-6 flex h-1.5 w-40 overflow-hidden rounded" aria-hidden><i className="flex-1 bg-saffron" /><i className="flex-1 bg-ink/10" /><i className="flex-1 bg-india" /></div>
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap">
          <h2 className="text-3xl font-bold sm:text-4xl">Our Products</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.map(p => <ProductCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="text-3xl font-bold sm:text-4xl">Services by Industry</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map(i => (
              <Link key={i.slug} to={`/services/${i.slug}`} className="group relative block overflow-hidden rounded-lg bg-ink text-white">
                <img src={img(i.title, 600, 420)} alt="" loading="lazy" className="aspect-[10/7] w-full object-cover opacity-60 transition group-hover:opacity-80" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink to-transparent p-4">
                  <h3 className="font-bold">{i.title}</h3><p className="text-sm text-white/80">{i.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink text-white">
        <div className="wrap">
          <h2 className="text-3xl font-bold sm:text-4xl">Why Choose XYZ?</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {why.map(([Icon, t, d]) => (
              <div key={t} className="flex gap-4"><Icon className="mt-1 shrink-0 text-saffron" /><div><h3 className="font-bold">{t}</h3><p className="text-white/70">{d}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="text-3xl font-bold sm:text-4xl">Our Projects</h2>
          <p className="mt-2 text-ink/60">Sample projects shown as placeholders. These are not real installations.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map(t => (
              <figure key={t}><img src={img(`Sample: ${t}`, 600, 600)} alt={`Sample project: ${t}`} loading="lazy" className="aspect-square w-full rounded-lg object-cover" /><figcaption className="mt-2 text-sm text-ink/70">Sample: {t}</figcaption></figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap">
          <div className="flex items-end justify-between"><h2 className="text-3xl font-bold sm:text-4xl">Blog and Insights</h2><Link to="/blog" className="font-semibold text-india">All articles</Link></div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map(p => <PostCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Looking for the Right Display Solution?</h2>
            <p className="mt-4 text-ink/75">Tell us about your requirements, and our team will help you find the right display for your business.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-dark"><MessageCircle size={18} />Chat on WhatsApp</a>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  )
}

export function PostCard({ p }) {
  return (
    <article className="overflow-hidden rounded-lg border border-ink/10 bg-white">
      <img src={img(p.title, 700, 400)} alt="" loading="lazy" className="aspect-[7/4] w-full object-cover" />
      <div className="p-5">
        <time className="text-sm text-ink/50">{p.date}</time>
        <h3 className="mt-1 text-lg font-bold">{p.title}</h3>
        <p className="mt-2 text-ink/70">{p.excerpt}</p>
        <Link to={`/blog/${p.slug}`} className="btn btn-line mt-4 px-4 py-2 text-sm">Read More</Link>
      </div>
    </article>
  )
}
