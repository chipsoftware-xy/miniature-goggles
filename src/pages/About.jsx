import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
const blocks = [
  ['Our Story', '[Placeholder. Add your real company story here.]'],
  ['Our Vision', 'To bring dependable, modern display technology to every Indian business and public space. (Placeholder wording.)'],
  ['Our Mission', 'To design, supply, install and support displays that fit our customers\' needs. (Placeholder wording.)'],
  ['Made in India', 'We take pride in Indian engineering and manufacturing. Add verified details before publishing.'],
  ['Quality and Innovation', 'We focus on careful engineering and keep improving our products. (Placeholder wording.)'],
  ['Our Approach to Customer Service', 'We listen first, recommend honestly and support you after installation. (Placeholder wording.)']
]
export default function About() {
  return (
    <>
      <Seo title="About Us" description="Learn about XYZ, an Indian LED and LCD display company." />
      <section className="bg-ink py-16 text-white"><div className="wrap"><h1 className="text-4xl font-extrabold sm:text-5xl">About XYZ</h1></div></section>
      <section className="wrap section grid gap-10 md:grid-cols-2">
        {blocks.map(([t, d]) => <div key={t}><h2 className="text-2xl font-bold">{t}</h2><p className="mt-2 text-ink/75">{d}</p></div>)}
      </section>
      <div className="wrap pb-20"><Link to="/contact" className="btn btn-primary">Contact Us</Link></div>
    </>
  )
}
