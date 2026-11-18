import { useState } from 'react'
import { Sun, Building2, CloudSun, Cloud, Lamp } from 'lucide-react'

// Shows why outdoor screens need far more brightness.
// Reflected light ≈ lux × reflectance / π. Wash-out = reflected / (screen + reflected).
const STOPS = [[Lamp, 'Office', 500], [Building2, 'Mall atrium', 2000], [CloudSun, 'Outdoor shade', 10000], [Cloud, 'Overcast day', 25000], [Sun, 'Direct sun', 100000]]
const SCREENS = [['Indoor screen', 800], ['Outdoor screen', 6000]]
const REFL = 0.05

export default function BrightnessSim() {
  const [v, setV] = useState(0.15) // 0..1 on a log scale
  const lux = Math.round(10 ** (Math.log10(300) + v * (Math.log10(100000) - Math.log10(300))))
  const refl = (lux * REFL) / Math.PI
  const near = STOPS.reduce((a, s) => (Math.abs(Math.log10(s[2]) - Math.log10(lux)) < Math.abs(Math.log10(a[2]) - Math.log10(lux)) ? s : a))
  const sky = Math.min(1, v * 1.1)
  const NearIcon = near[0]

  return (
    <div className="card overflow-hidden">
      <div className="relative p-6 transition-colors duration-500 sm:p-10"
        style={{ background: `linear-gradient(180deg, rgba(${120 + sky * 135},${150 + sky * 105},${190 + sky * 65},${0.08 + sky * 0.85}), rgba(16,20,27,${1 - sky * 0.5}))` }}>
        <div className="grid gap-6 sm:grid-cols-2">
          {SCREENS.map(([name, nits]) => {
            const wash = refl / (nits + refl)
            const contrast = (nits + refl) / refl
            const ok = contrast > 10
            return (
              <figure key={name}>
                <div className="relative overflow-hidden rounded-xl border-4 border-black bg-black">
                  <div className="scene-anim aspect-video" style={{ background: 'linear-gradient(120deg,#f28c28,#ff3d77,#7b2cff,#38e1ff)', backgroundSize: '300% 300%' }}>
                    <div className="flex h-full items-center justify-center font-display text-[clamp(20px,4vw,44px)] font-extrabold text-white drop-shadow">SALE 50%</div>
                  </div>
                  <div className="led-grid absolute inset-0 opacity-10" aria-hidden />
                  <div className="absolute inset-0 bg-[#e9eef3] transition-opacity duration-300" style={{ opacity: wash * 0.95 }} aria-hidden />
                </div>
                <figcaption className={`mt-3 flex items-center justify-between rounded-lg px-3 py-2 text-sm ${sky > .55 ? 'bg-black/60' : 'bg-white/5'}`}>
                  <span><b className="text-white">{name}</b> <span className="font-mono text-white/60">~{nits.toLocaleString('en-IN')} nits</span></span>
                  <span className={`font-mono ${ok ? 'text-india' : 'text-red-400'}`}>{contrast < 100 ? contrast.toFixed(1) : Math.round(contrast)}:1 {ok ? '✓ readable' : '✗ washed out'}</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
      <div className="border-t border-white/10 p-6 sm:px-10">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-white"><NearIcon size={18} className="text-saffron" />{near[1]}</span>
          <span className="font-mono text-white/60">{lux.toLocaleString('en-IN')} lux ambient</span>
        </div>
        <input aria-label="Ambient light" type="range" min="0" max="1" step="0.005" value={v} onChange={e => setV(+e.target.value)} className="mt-4 w-full" style={{ '--p': `${v * 100}%` }} />
        <div className="mt-3 flex justify-between gap-1">
          {STOPS.map(([I, n, l]) => (
            <button key={n} onClick={() => setV((Math.log10(l) - Math.log10(300)) / (Math.log10(100000) - Math.log10(300)))}
              className="flex flex-col items-center gap-1 text-[10px] text-white/45 hover:text-white sm:text-xs"><I size={16} />{n}</button>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/35">Illustration using typical brightness values. Real readability also depends on content, viewing angle and screen finish.</p>
      </div>
    </div>
  )
}
