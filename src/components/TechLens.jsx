import { useState } from 'react'
import { techs } from '../data.js'

// Macro "lens" that shows what each LED packaging type looks like up close.
function Macro({ look }) {
  const cells = Array.from({ length: 36 })
  return (
    <div className="relative aspect-square overflow-hidden rounded-full border border-white/15 bg-[#0b0d11] shadow-[inset_0_0_60px_rgba(0,0,0,.9)]">
      <div className="absolute inset-[6%] grid grid-cols-6 gap-[6%]">
        {cells.map((_, i) => look === 'cob'
          ? <div key={i} className="flex items-center justify-center gap-[8%]">
              {['#ff3355', '#2bff88', '#3a7bff'].map(c => <i key={c} className="h-[22%] w-[22%] rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />)}
            </div>
          : <div key={i} className="relative rounded-[3px] border border-white/25 bg-[#e8e3d6]">
              <div className="absolute inset-[18%] flex items-center justify-center gap-[10%] rounded-full bg-[#2a2a2a]">
                {['#ff3355', '#2bff88', '#3a7bff'].map(c => <i key={c} className="h-[26%] w-[26%] rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />)}
              </div>
            </div>)}
      </div>
      {look !== 'smd' && <div className="absolute inset-0" style={{ background: look === 'cob' ? 'linear-gradient(135deg,rgba(255,255,255,.10),transparent 40%,rgba(0,0,0,.25))' : 'linear-gradient(135deg,rgba(255,255,255,.28),rgba(255,255,255,.05) 35%,transparent 55%,rgba(255,255,255,.12))' }} />}
      <div className="absolute inset-0 rounded-full ring-8 ring-inset ring-black/60" />
    </div>
  )
}

export default function TechLens() {
  const [k, setK] = useState(0)
  const t = techs[k]
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute -inset-10 rounded-full bg-saffron/10 blur-3xl" aria-hidden />
        <div key={t.key} style={{ animation: 'fadein .5s' }}><Macro look={t.look} /></div>
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-ink px-3 py-1 font-mono text-xs text-white/60">×40 macro view</span>
      </div>
      <div>
        <div role="tablist" className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
          {techs.map((x, i) => (
            <button key={x.key} role="tab" aria-selected={i === k} onClick={() => setK(i)}
              className={`rounded-full px-6 py-2 font-mono text-sm font-semibold transition ${i === k ? 'bg-saffron text-ink' : 'text-white/60 hover:text-white'}`}>{x.name}</button>
          ))}
        </div>
        <div key={t.key} style={{ animation: 'fadein .5s' }}>
          <h3 className="mt-6 text-3xl font-extrabold">{t.full}</h3>
          <p className="mt-4 text-lg text-white/65">{t.text}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm"><span className="text-white/50">Best for</span><b className="text-white">{t.best}</b></p>
        </div>
      </div>
    </div>
  )
}
