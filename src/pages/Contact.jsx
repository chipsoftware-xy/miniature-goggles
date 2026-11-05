import { useSearchParams } from 'react-router-dom'
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import QuoteForm from '../components/QuoteForm.jsx'
import { COMPANY, waLink } from '../config.js'
export default function Contact() {
  const [sp] = useSearchParams()
  return (
    <section className="wrap section grid gap-12 lg:grid-cols-5">
      <Seo title="Contact Us" description="Contact XYZ for a quote on LED and LCD displays." />
      <div className="lg:col-span-3">
        <h1 className="text-4xl font-extrabold">Contact Us</h1>
        <p className="mb-6 mt-2 text-ink/70">Tell us about your project and we will get back to you.</p>
        <QuoteForm defaultInterest={sp.get('interest') || ''} />
      </div>
      <aside className="space-y-4 lg:col-span-2">
        <p className="flex gap-3"><MapPin className="shrink-0 text-saffron" />{COMPANY.address}</p>
        <p className="flex gap-3"><Mail className="shrink-0 text-saffron" /><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
        <p className="flex gap-3"><Phone className="shrink-0 text-saffron" /><a href={`tel:${COMPANY.mobile}`}>{COMPANY.mobile}</a></p>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-dark"><MessageCircle size={18} />Chat on WhatsApp</a>
        {COMPANY.mapEmbed
          ? <iframe title="Company location" src={COMPANY.mapEmbed} className="h-64 w-full rounded-lg border-0" loading="lazy" />
          : <div className="flex h-64 items-center justify-center rounded-lg bg-mist text-ink/50">[Google Maps location placeholder]</div>}
      </aside>
    </section>
  )
}
