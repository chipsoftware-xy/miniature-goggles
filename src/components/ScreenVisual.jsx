// Animated "LED screen" artwork used instead of stock photos.
// Every scene is pure CSS so it stays sharp and light. Swap for real photos later
// by passing `photo="/images/xyz.jpg"`.

const G = {
  sunset: 'linear-gradient(120deg,#ff5f2e,#f28c28,#ffcf6b,#ff3d77,#7b2cff)',
  aurora: 'linear-gradient(120deg,#0b1f3a,#1db954,#38e1ff,#7b2cff,#0b1f3a)',
  mosaic: 'linear-gradient(120deg,#7b2cff,#ff3d77,#f28c28,#38e1ff)',
  menu: 'linear-gradient(140deg,#1a0f05,#3d1d06)',
  ticker: 'linear-gradient(120deg,#150b2e,#3b0d4f,#150b2e)',
  dashboard: 'linear-gradient(140deg,#03121c,#06283a)',
  glass: 'linear-gradient(120deg,rgba(56,225,255,.25),rgba(242,140,40,.25),rgba(29,185,84,.25))',
  orbit: 'radial-gradient(circle at 50% 50%,#2a0f4a,#07090D 70%)'
}

function Scene({ scene, label }) {
  switch (scene) {
    case 'menu':
      return (
        <div className="absolute inset-0 grid grid-cols-3 gap-[6%] p-[7%]">
          {['Masala Chai', 'Paneer Wrap', 'Cold Coffee'].map((t, i) => (
            <div key={t} className="flex flex-col justify-end rounded-md p-[8%]" style={{ background: ['#f28c28', '#1db954', '#ff3d77'][i], animation: `blink 3s ${i * .6}s infinite` }}>
              <span className="text-[clamp(8px,1.4vw,14px)] font-bold text-ink">{t}</span>
              <span className="font-mono text-[clamp(8px,1.6vw,16px)] font-bold text-white">₹{[49, 129, 99][i]}</span>
            </div>
          ))}
        </div>
      )
    case 'ticker':
      return (
        <div className="absolute inset-0 flex flex-col justify-center gap-[6%]">
          <div className="whitespace-nowrap font-display text-[clamp(18px,5vw,56px)] font-extrabold text-saffron" style={{ animation: 'slide 9s linear infinite', width: 'max-content' }}>
            {'MEGA SALE · 50% OFF · NEW ARRIVALS · '.repeat(4)}
          </div>
          <div className="whitespace-nowrap font-mono text-[clamp(10px,2vw,20px)] text-neon" style={{ animation: 'slide 14s linear infinite reverse', width: 'max-content' }}>
            {'PLATFORM 3 → 18:42 RAJDHANI EXP · ON TIME · '.repeat(4)}
          </div>
        </div>
      )
    case 'dashboard':
      return (
        <div className="absolute inset-0 flex items-end gap-[3%] px-[8%] pb-[10%] pt-[22%]">
          {[60, 85, 40, 95, 70, 55, 90, 45].map((h, i) => (
            <div key={i} className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-india to-neon" style={{ height: `${h}%`, animation: `rise 1.8s ${i * .15}s ease-in-out infinite alternate` }} />
          ))}
          <span className="absolute left-[8%] top-[8%] font-mono text-[clamp(8px,1.4vw,13px)] text-neon">OUTPUT / HR ▲ 12%</span>
        </div>
      )
    case 'glass':
      return (
        <>
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3">{Array.from({ length: 12 }).map((_, i) => <i key={i} className="border border-white/15" />)}</div>
          <div className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#f28c28,transparent_65%)]" style={{ animation: 'floaty 5s ease-in-out infinite' }} />
        </>
      )
    case 'orbit':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          {[90, 65, 40].map((s, i) => (
            <div key={s} className="absolute rounded-full border-2 border-dashed" style={{ width: `${s}%`, aspectRatio: '1', borderColor: ['#f28c28', '#38e1ff', '#1db954'][i], animation: `spin ${12 - i * 3}s linear infinite ${i % 2 ? 'reverse' : ''}` }} />
          ))}
        </div>
      )
    case 'mosaic':
      return (
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 gap-[2px] p-[2px]">
          {Array.from({ length: 18 }).map((_, i) => <i key={i} className="bg-white/10" style={{ animation: `blink ${2 + (i % 5) * .6}s ${(i * 0.37) % 2}s infinite` }} />)}
        </div>
      )
    default: // sunset / aurora: soft blobs
      return (
        <>
          <div className="absolute -left-[10%] top-[10%] h-[80%] w-[60%] rounded-full bg-white/25 blur-2xl" style={{ animation: 'floaty 7s ease-in-out infinite' }} />
          <div className="absolute bottom-0 right-0 h-[60%] w-[50%] rounded-full bg-black/25 blur-2xl" style={{ animation: 'floaty 9s ease-in-out infinite reverse' }} />
        </>
      )
  }
}

export default function ScreenVisual({ scene = 'aurora', label, photo, className = '', bezel = true, ratio = 'aspect-[16/9]' }) {
  return (
    <div className={`relative overflow-hidden ${bezel ? 'rounded-xl border border-white/10 bg-black p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)]' : ''} ${className}`}>
      <div className={`relative overflow-hidden rounded-lg ${ratio}`}>
        {photo
          ? <img src={photo} alt={label || ''} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          : <div className="scene-anim absolute inset-0" style={{ background: G[scene] || G.aurora, backgroundSize: '300% 300%' }}><Scene scene={scene} label={label} /></div>}
        {/* pixel texture + scanlines make it read as an LED surface */}
        <div aria-hidden className="led-grid pointer-events-none absolute inset-0 opacity-[.10] mix-blend-overlay" />
        <div aria-hidden className="scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10" />
      </div>
    </div>
  )
}
