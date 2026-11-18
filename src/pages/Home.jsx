import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, MousePointerClick, ChevronDown } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import QuoteForm from '../components/QuoteForm.jsx'
import LedWall from '../components/LedWall.jsx'
import TechLens from '../components/TechLens.jsx'
import BrightnessSim from '../components/BrightnessSim.jsx'
import PitchCalculator from '../components/PitchCalculator.jsx'
import IndiaMap from '../components/IndiaMap.jsx'
import { ProductCard, IndustryCard, Faq } from '../components/Cards.jsx'
import { Reveal, Counter, SectionHead, Spotlight } from '../components/fx.jsx'
import { products, industries, process, faqs } from '../data.js'
import { waLink } from '../config.js'

const HERO_PITCH = [['P2.5', 7], ['P4', 10], ['P6', 14], ['P10', 22]]
const FILTERS = [['all', 'All'], ['indoor', 'Indoor'], ['outdoor', 'Outdoor'], ['special', 'Special']]
const MARQUEE = ['Video walls', 'Roadside hoardings', 'Control rooms', 'Mall atriums', 'Event stages', 'Transparent facades', 'Menu boards', 'Passenger info', 'Auditoriums', 'Boardrooms']

function Hero() {
  const [pi, setPi] = useState(1)
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black pt-16">
      <LedWall pitch={HERO_PITCH[pi][1]} base={0.38} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden />
      <div className="wrap pointer-events-none relative w-full py-20">
        <div className="max-w-3xl">
          <p className="eyebrow" style={{ animation: 'fadein .8s both' }}>LED & LCD display solutions · India</p>
          <h1 className="mt-5 text-[clamp(44px,8vw,104px)] font-extrabold leading-[.95] tracking-tight" style={{ animation: 'fadein .8s .1s both' }}>
            Made in India.<br /><span className="text-grad">Built to illuminate.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70 sm:text-xl" style={{ animation: 'fadein .8s .2s both' }}>
            Video walls, outdoor screens and digital signage designed, installed and supported for Indian businesses and public spaces.
          </p>
          <div className="pointer-events-auto mt-9 flex flex-wrap gap-3" style={{ animation: 'fadein .8s .3s both' }}>
            <Link to="/products" className="btn btn-primary">Explore displays <ArrowRight size={18} /></Link>
            <Link to="/calculator" className="btn btn-ghost">Size my screen</Link>
          </div>
        </div>
      </div>

      {/* live pixel-pitch control */}
      <div className="absolute bottom-28 right-4 z-10 hidden rounded-2xl border border-white/15 bg-black/60 p-4 backdrop-blur-md sm:right-6 md:block">
        <p className="flex items-center gap-2 text-xs text-white/60"><MousePointerClick size={14} className="text-saffron" />Move to light up · click to ripple</p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-white/40">Pixel pitch on this wall</p>
        <div className="mt-2 flex gap-1">
          {HERO_PITCH.map(([l], i) => (
            <button key={l} onClick={() => setPi(i)} className={`rounded-lg px-3 py-1.5 font-mono text-xs transition ${i === pi ? 'bg-saffron text-ink' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>{l}</button>
          ))}
        </div>
      </div>
      <a href="#discover" aria-label="Scroll down" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50 hover:text-white"><ChevronDown className="animate-bounce" /></a>
    </section>
  )
}

export default function Home() {
  const [f, setF] = useState('all')
  const shown = products.filter(p => f === 'all' || p.env === f)
  return (
    <>
      <Seo title="LED & LCD Display Solutions" description="KalpLabs: immersive LED video walls, outdoor screens and digital signage for Indian businesses and public spaces." />
      <Hero />

      {/* marquee */}
      <div id="discover" className="overflow-hidden border-y border-white/10 bg-ink py-5">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl font-bold text-white/25 sm:text-3xl">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i} className="flex items-center gap-10">{m}<i className="h-2 w-2 rounded-full bg-saffron shadow-[0_0_12px_#F28C28]" /></span>)}
        </div>
      </div>

      {/* intro + stats */}
      <Spotlight className="section">
        <div className="wrap grid items-end gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="Who we are" title={<>Screens that stop people <span className="text-saffron">in their tracks.</span></>}
            sub="From a single storefront board to a stadium-sized video wall, we help you choose the right technology, build it on site and keep it running." />
          <div className="grid grid-cols-2 gap-4">
            {[[4, '', 'City offices', 'Delhi · Noida · Pune · Bengaluru'], [8, '', 'Product families', 'LED, LCD & transparent'], [8, '', 'Industries served', 'Retail to government'], [5, '-step', 'Delivery process', 'Consult to support']].map(([n, s, t, d], i) => (
              <Reveal key={t} delay={i * 100} className="card p-6">
                <p className="font-display text-5xl font-extrabold text-white"><Counter to={n} suffix={s} /></p>
                <p className="mt-2 font-semibold text-white">{t}</p><p className="text-sm text-white/45">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Spotlight>

      {/* technology */}
      <section className="section relative overflow-hidden bg-panel/40">
        <div className="wrap">
          <SectionHead eyebrow="Display technology" title="Look closer. Every pixel matters." sub="Three ways LEDs are packaged, each with its own strengths. Switch between them to see the difference up close." />
          <div className="mt-14"><TechLens /></div>
        </div>
      </section>

      {/* products */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Our products" title="Displays for every wall, window and road." />
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(([k, l]) => (
                <button key={k} onClick={() => setF(k)} className={`rounded-full border px-4 py-2 text-sm transition ${f === k ? 'border-saffron bg-saffron text-ink' : 'border-white/15 text-white/70 hover:border-white/40'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 80} className="h-full"><ProductCard p={p} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* brightness simulator */}
      <section className="section bg-panel/40">
        <div className="wrap grid items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHead eyebrow="Indoor vs outdoor" title="Turn up the sun." sub="Drag the slider from office lighting to midday sun and watch an indoor screen wash out while an outdoor screen stays sharp. That is why outdoor displays need many times the brightness." />
            <Reveal><Link to="/products/outdoor-led-displays" className="btn btn-line mt-8">See outdoor displays <ArrowRight size={18} /></Link></Reveal>
          </div>
          <Reveal className="lg:col-span-3"><BrightnessSim /></Reveal>
        </div>
      </section>

      {/* calculator */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Screen calculator" title="Size your screen in seconds." sub="Pick a size and pixel pitch. Get resolution, cabinet count and the best viewing distance, then send it straight to our team." />
          <div className="mt-12"><PitchCalculator compact /></div>
        </div>
      </section>

      {/* industries */}
      <section className="section bg-panel/40">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Solutions" title="Built for the way your industry works." />
            <Link to="/services" className="btn btn-line">All solutions</Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {industries.map((i, n) => <Reveal key={i.slug} delay={(n % 4) * 80}><IndustryCard i={i} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* process */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="From first call to first light." center />
          <ol className="relative mt-16 grid gap-8 md:grid-cols-5">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-saffron via-white/40 to-india md:block" aria-hidden />
            {process.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 120} className="relative">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-saffron bg-ink font-mono font-bold text-saffron shadow-[0_0_30px_rgba(242,140,40,.4)]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-xl font-bold">{t}</h3>
                <p className="mt-2 text-sm text-white/55">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* presence */}
      <section className="section bg-panel/40">
        <div className="wrap">
          <SectionHead eyebrow="Pan-India presence" title="Four offices. One team across India." sub="Tap a city on the map to see the address and get directions." />
          <div className="mt-12"><IndiaMap /></div>
        </div>
      </section>

      {/* faq + quote */}
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Common questions" title="Good to know." />
            <div className="mt-8">{faqs.map(([q, a]) => <Faq key={q} q={q} a={a} />)}</div>
          </div>
          <Reveal className="card relative overflow-hidden p-6 sm:p-8">
            <div className="led-grid absolute inset-0 opacity-[.04]" aria-hidden />
            <div className="relative">
              <h2 className="text-3xl font-extrabold">Let’s light up your space.</h2>
              <p className="mb-6 mt-2 text-white/60">Tell us about your project and we’ll recommend the right display.</p>
              <QuoteForm />
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#25D366]"><MessageCircle size={16} />Prefer chat? WhatsApp us directly</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
