import { Link } from 'react-router-dom'
import { Eye, Target, Flag, Sparkles, HeartHandshake, BookOpen } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import IndiaMap from '../components/IndiaMap.jsx'
import { Reveal, SectionHead } from '../components/fx.jsx'

const blocks = [
  [BookOpen, 'Our story', '[Placeholder. Add your real company story here.]'],
  [Eye, 'Our vision', 'To bring dependable, modern display technology to every Indian business and public space.'],
  [Target, 'Our mission', 'To design, supply, install and support displays that fit our customers’ needs.'],
  [Flag, 'Made in India', 'We take pride in Indian engineering. Add verified manufacturing details before publishing.'],
  [Sparkles, 'Quality & innovation', 'Careful engineering, honest recommendations and constant improvement.'],
  [HeartHandshake, 'Customer first', 'We listen first, recommend honestly and support you after installation.']
]
export default function About() {
  return (
    <>
      <Seo title="About Us" description="Learn about KalpLabs, an Indian LED and LCD display company." />
      <PageHero eyebrow="About KalpLabs" title={<>We turn walls into <span className="text-grad">experiences.</span></>} sub="An Indian display team helping brands, venues and public spaces communicate in light." crumbs={[['/', 'Home']]} />
      <section className="wrap section grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map(([I, t, d], i) => (
          <Reveal key={t} delay={(i % 3) * 80} className="card group p-7 transition hover:border-saffron/50">
            <I className="text-saffron transition group-hover:scale-110" size={28} />
            <h2 className="mt-5 text-2xl font-bold">{t}</h2><p className="mt-2 text-white/60">{d}</p>
          </Reveal>
        ))}
      </section>
      <section className="section bg-panel/40">
        <div className="wrap">
          <SectionHead eyebrow="Where we are" title="Offices across India." />
          <div className="mt-12"><IndiaMap /></div>
        </div>
      </section>
      <div className="wrap py-20 text-center"><Link to="/contact" className="btn btn-primary">Start a project</Link></div>
    </>
  )
}
