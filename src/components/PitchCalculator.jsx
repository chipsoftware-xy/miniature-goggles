import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { User, ArrowRight } from 'lucide-react'
import { waLink } from '../config.js'

// Common pitches (mm). Cabinet sizes are typical industry sizes used for estimating only.
const PITCHES = [1.2, 1.5, 1.86, 2.5, 3.07, 4, 5, 6.67, 8, 10]
const PRESETS = [['Reception wall', 3, 1.7], ['Boardroom', 4, 2.25], ['Stage backdrop', 8, 4.5], ['Roadside hoarding', 6, 3]]
const STD = [['HD', 1280, 720], ['Full HD', 1920, 1080], ['2K', 2560, 1440], ['4K UHD', 3840, 2160]]

export function calc(w, h, pitch) {
  const cab = pitch >= 5 ? 0.96 : 0.5            // m
  const cx = Math.max(1, Math.round(w / cab)), cy = Math.max(1, Math.round(h / cab))
  const W = cx * cab, H = cy * cab
  const rx = Math.round((W * 1000) / pitch), ry = Math.round((H * 1000) / pitch)
  const std = [...STD].reverse().find(([, a, b]) => rx >= a && ry >= b)
  return { cab, cx, cy, W, H, rx, ry, area: W * H, px: rx * ry, std: std ? std[0] : 'Below HD',
    minView: pitch, bestView: pitch * 3, env: pitch >= 5 ? 'Outdoor / long distance' : pitch >= 2.5 ? 'Indoor, medium distance' : 'Indoor fine-pitch, close viewing' }
}

const Num = ({ label, value, unit, onChange, min, max, step }) => {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm text-white/60">{label}<span className="font-mono text-lg text-white">{value.toFixed(1)}<span className="text-white/40"> {unit}</span></span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} className="mt-3 w-full" style={{ '--p': `${pct}%` }} />
    </label>
  )
}

export default function PitchCalculator({ compact = false }) {
  const [w, setW] = useState(4)
  const [h, setH] = useState(2.25)
  const [pi, setPi] = useState(3)
  const pitch = PITCHES[pi]
  const r = useMemo(() => calc(w, h, pitch), [w, h, pitch])

  // scale preview so the person figure (1.7 m) stays in proportion
  const maxW = 100, scale = Math.min(maxW / Math.max(r.W, 1.7), 62 / Math.max(r.H, 1.7))
  const stats = [
    ['Resolution', `${r.rx.toLocaleString('en-IN')} × ${r.ry.toLocaleString('en-IN')}`],
    ['Class', r.std],
    ['Actual size', `${r.W.toFixed(2)} × ${r.H.toFixed(2)} m`],
    ['Cabinets', `${r.cx} × ${r.cy} = ${r.cx * r.cy}`],
    ['Min. viewing distance', `≈ ${r.minView.toFixed(1)} m`],
    ['Comfortable from', `≈ ${r.bestView.toFixed(1)} m`]
  ]
  const msg = `Hi KalpLabs, I used the screen calculator: about ${r.W.toFixed(2)} × ${r.H.toFixed(2)} m at P${pitch} (${r.rx}×${r.ry}). Please share a quote.`

  return (
    <div className={`grid gap-8 ${compact ? 'lg:grid-cols-2' : 'lg:grid-cols-5'}`}>
      <div className={`card space-y-7 p-6 sm:p-8 ${compact ? '' : 'lg:col-span-2'}`}>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(([n, pw, ph]) => (
            <button key={n} onClick={() => { setW(pw); setH(ph) }}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${w === pw && h === ph ? 'border-saffron bg-saffron/15 text-saffron' : 'border-white/15 text-white/60 hover:border-white/40'}`}>{n}</button>
          ))}
        </div>
        <Num label="Width" unit="m" value={w} onChange={setW} min={1} max={20} step={0.1} />
        <Num label="Height" unit="m" value={h} onChange={setH} min={0.5} max={10} step={0.1} />
        <div>
          <span className="flex items-baseline justify-between text-sm text-white/60">Pixel pitch<span className="font-mono text-lg text-white">P{pitch}</span></span>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {PITCHES.map((p, i) => (
              <button key={p} onClick={() => setPi(i)} className={`rounded-lg py-2 font-mono text-xs transition ${i === pi ? 'bg-saffron text-ink' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>P{p}</button>
            ))}
          </div>
          <p className="mt-3 text-xs text-white/40">{r.env}</p>
        </div>
      </div>

      <div className={compact ? '' : 'lg:col-span-3'}>
        {/* live scale preview */}
        <div className="card relative flex h-72 items-end justify-center overflow-hidden p-6">
          <div className="led-grid absolute inset-0 opacity-[.05]" aria-hidden />
          <div className="relative flex items-end gap-3" style={{ height: '100%' }}>
            <div className="relative rounded-sm border border-white/20 transition-all duration-500"
              style={{ width: `${r.W * scale * 2.6}px`, height: `${r.H * scale * 2.6}px`, background: 'linear-gradient(120deg,#f28c28,#ff3d77,#7b2cff,#38e1ff)', backgroundSize: '300% 300%', animation: 'drift 8s ease-in-out infinite', boxShadow: '0 0 60px rgba(242,140,40,.35)' }}>
              <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${r.cx},1fr)`, gridTemplateRows: `repeat(${r.cy},1fr)` }}>
                {r.cx * r.cy <= 400 && Array.from({ length: r.cx * r.cy }).map((_, i) => <i key={i} className="border border-black/25" />)}
              </div>
              <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white">{r.W.toFixed(1)} × {r.H.toFixed(1)} m</span>
            </div>
            <div className="flex flex-col items-center text-white/50 transition-all duration-500" style={{ height: `${1.7 * scale * 2.6}px` }}>
              <User className="h-full w-auto" strokeWidth={1.2} />
            </div>
          </div>
          <span className="absolute bottom-3 right-4 text-[10px] text-white/30">Person = 1.7 m for scale</span>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map(([k, v]) => (
            <div key={k} className="card p-4"><dt className="text-xs text-white/50">{k}</dt><dd className="mt-1 font-mono text-sm text-white sm:text-base">{v}</dd></div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Send this to our team <ArrowRight size={18} /></a>
          {compact && <Link to="/calculator" className="btn btn-line">Open full calculator</Link>}
        </div>
        <p className="mt-3 text-xs text-white/35">Estimates use typical cabinet sizes (0.5 m indoor, 0.96 m outdoor). Final sizes depend on the exact model.</p>
      </div>
    </div>
  )
}
