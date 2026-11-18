import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import PitchCalculator from '../components/PitchCalculator.jsx'
import BrightnessSim from '../components/BrightnessSim.jsx'
import { SectionHead } from '../components/fx.jsx'

const RULES = [
  ['Pixel pitch', 'The distance between LED centres in millimetres. Smaller pitch = more pixels = sharper up close.'],
  ['Viewing distance', 'Roughly, the closest comfortable distance in metres equals the pitch in mm. About three times that looks best.'],
  ['Brightness', 'Indoor screens typically run around 600–1,000 nits. Outdoor screens in Indian sun need several thousand.']
]

export default function Calculator() {
  return (
    <>
      <Seo title="LED Screen Calculator" description="Estimate LED screen resolution, cabinet count and viewing distance from size and pixel pitch." />
      <PageHero eyebrow="Tools" title="LED screen calculator" sub="Estimate resolution, cabinets and viewing distance for your wall. Then send the numbers to our team in one tap." crumbs={[['/', 'Home']]} />
      <section className="wrap section pt-12"><PitchCalculator /></section>
      <section className="section bg-panel/40">
        <div className="wrap">
          <SectionHead eyebrow="The basics" title="Three numbers that decide your screen." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {RULES.map(([t, d]) => <div key={t} className="card p-6"><h3 className="text-xl font-bold">{t}</h3><p className="mt-2 text-white/60">{d}</p></div>)}
          </div>
          <div className="mt-14"><BrightnessSim /></div>
        </div>
      </section>
    </>
  )
}
