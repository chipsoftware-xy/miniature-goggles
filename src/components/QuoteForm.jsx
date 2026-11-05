import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { products, industries } from '../data.js'

const empty = { name: '', company: '', mobile: '', email: '', city: '', interest: '', requirements: '' }

function Field({ k, label, type = 'text', req, v, err, set }) {
  return (
    <div>
      <label htmlFor={k} className="mb-1 block text-sm font-medium">{label}{req && ' *'}</label>
      <input id={k} type={type} className="field" value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `${k}-e` : undefined} />
      {err[k] && <p id={`${k}-e`} className="mt-1 text-sm text-red-600">{err[k]}</p>}
    </div>
  )
}

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
    // TODO: send `v` to your backend or an email service (Formspree, EmailJS, your own API).
    console.info('Enquiry (not sent anywhere yet):', v)
    setDone(true)
  }

  if (done) return (
    <div role="status" className="rounded-lg border border-india/30 bg-india/5 p-6">
      <CheckCircle className="mb-2 text-india" />
      <p className="font-semibold">Form validated successfully.</p>
      <p className="mt-1 text-sm text-ink/70">Demo notice: this form has no backend yet, so nothing was sent or stored. Connect a backend or email service to receive enquiries.</p>
    </div>
  )

  const p = { v, err, set }
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field k="name" label="Full Name" req {...p} /><Field k="company" label="Company Name" {...p} />
      <Field k="mobile" label="Mobile Number" type="tel" req {...p} /><Field k="email" label="Email Address" type="email" req {...p} />
      <Field k="city" label="City / Location" req {...p} />
      <div>
        <label htmlFor="interest" className="mb-1 block text-sm font-medium">Product or Service Interested In</label>
        <select id="interest" className="field" value={v.interest} onChange={set('interest')}>
          <option value="">Select…</option>
          <optgroup label="Products">{products.map(x => <option key={x.slug}>{x.title}</option>)}</optgroup>
          <optgroup label="Industries">{industries.map(x => <option key={x.slug}>{x.title}</option>)}</optgroup>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="requirements" className="mb-1 block text-sm font-medium">Project Requirements *</label>
        <textarea id="requirements" rows="4" className="field" value={v.requirements} onChange={set('requirements')} aria-invalid={!!err.requirements} />
        {err.requirements && <p className="mt-1 text-sm text-red-600">{err.requirements}</p>}
      </div>
      <div className="sm:col-span-2"><button className="btn btn-primary w-full sm:w-auto">Submit Enquiry</button></div>
    </form>
  )
}
