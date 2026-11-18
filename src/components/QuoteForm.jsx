import { useState } from 'react'
import { CheckCircle, MessageCircle, Mail, Send } from 'lucide-react'
import { products, industries } from '../data.js'
import { COMPANY, waLink } from '../config.js'

const empty = { name: '', company: '', mobile: '', email: '', city: '', interest: '', requirements: '' }

function Field({ k, label, type = 'text', req, v, err, set, ph }) {
  return (
    <div>
      <label htmlFor={k} className="mb-1.5 block text-sm text-white/70">{label}{req && <span className="text-saffron"> *</span>}</label>
      <input id={k} type={type} placeholder={ph} className="field" value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `${k}-e` : undefined} />
      {err[k] && <p id={`${k}-e`} className="mt-1 text-sm text-red-400">{err[k]}</p>}
    </div>
  )
}

const summary = v => [
  `Enquiry from ${v.name}${v.company ? ` (${v.company})` : ''}`,
  `Mobile: ${v.mobile}`, `Email: ${v.email}`, `City: ${v.city}`,
  v.interest && `Interested in: ${v.interest}`, `Requirements: ${v.requirements}`
].filter(Boolean).join('\n')

export default function QuoteForm({ defaultInterest = '' }) {
  const [v, setV] = useState({ ...empty, interest: defaultInterest })
  const [err, setErr] = useState({})
  const [done, setDone] = useState(false)
  const set = k => e => setV(prev => ({ ...prev, [k]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    const x = {}
    if (v.name.trim().length < 2) x.name = 'Enter your full name.'
    if (!/^(\+91)?[6-9]\d{9}$/.test(v.mobile.replace(/[\s-]/g, ''))) x.mobile = 'Enter a valid 10-digit Indian mobile number.'
    if (!/^\S+@\S+\.\S+$/.test(v.email)) x.email = 'Enter a valid email address.'
    if (!v.city.trim()) x.city = 'Enter your city or location.'
    if (v.requirements.trim().length < 10) x.requirements = 'Describe your requirements in at least 10 characters.'
    setErr(x)
    if (Object.keys(x).length) return
    // To receive enquiries automatically, post `v` to a backend or a service like Formspree here.
    setDone(true)
  }

  if (done) return (
    <div role="status" className="card p-6">
      <CheckCircle className="mb-3 text-india" size={32} />
      <p className="text-lg font-semibold text-white">Almost there, {v.name.split(' ')[0]}.</p>
      <p className="mt-1 text-white/60">Choose how to send your enquiry. Your details are already filled in.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a className="btn bg-[#25D366] text-white hover:brightness-110" href={waLink(summary(v))} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />Send on WhatsApp</a>
        <a className="btn btn-line" href={`mailto:${COMPANY.email}?subject=${encodeURIComponent('Display enquiry – ' + (v.interest || v.city))}&body=${encodeURIComponent(summary(v))}`}><Mail size={18} />Send by email</a>
      </div>
      <button className="mt-4 text-sm text-white/40 underline hover:text-white" onClick={() => setDone(false)}>Edit details</button>
    </div>
  )

  const p = { v, err, set }
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field k="name" label="Full name" req ph="Your name" {...p} /><Field k="company" label="Company" ph="Optional" {...p} />
      <Field k="mobile" label="Mobile" type="tel" req ph="98xxxxxxxx" {...p} /><Field k="email" label="Email" type="email" req ph="you@company.com" {...p} />
      <Field k="city" label="City / location" req ph="e.g. Gurugram" {...p} />
      <div>
        <label htmlFor="interest" className="mb-1.5 block text-sm text-white/70">Interested in</label>
        <select id="interest" className="field" value={v.interest} onChange={set('interest')}>
          <option value="">Select…</option>
          <optgroup label="Products">{products.map(x => <option key={x.slug}>{x.title}</option>)}</optgroup>
          <optgroup label="Industries">{industries.map(x => <option key={x.slug}>{x.title}</option>)}</optgroup>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="requirements" className="mb-1.5 block text-sm text-white/70">Project requirements <span className="text-saffron">*</span></label>
        <textarea id="requirements" rows="4" placeholder="Approx. size, indoor/outdoor, what it will show…" className="field" value={v.requirements} onChange={set('requirements')} aria-invalid={!!err.requirements} />
        {err.requirements && <p className="mt-1 text-sm text-red-400">{err.requirements}</p>}
      </div>
      <div className="sm:col-span-2"><button className="btn btn-primary w-full sm:w-auto"><Send size={18} />Submit enquiry</button></div>
    </form>
  )
}
