import { useMemo, useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { OFFICES } from '../config.js'

// Simplified outline of India (lon, lat). Rendered as LED dots, so small inaccuracies disappear.
const INDIA = [[74.4,37.0],[75.9,36.6],[77.8,35.5],[78.7,34.3],[79.4,32.6],[78.8,31.2],[80.3,30.4],[80.9,30.2],[80.1,28.8],[81.6,28.2],[82.7,27.5],[84.1,27.5],[85.5,26.8],[86.9,26.5],[88.1,26.4],[88.1,27.9],[88.8,27.9],[88.9,27.1],[89.5,26.8],[92.0,26.9],[92.0,27.8],[94.5,29.2],[96.1,29.4],[97.4,28.2],[96.6,27.3],[95.2,26.6],[94.6,25.2],[94.2,23.9],[93.4,23.0],[93.1,22.2],[92.6,22.0],[92.2,23.5],[91.6,22.9],[91.2,23.0],[91.4,24.1],[92.2,24.9],[92.0,25.1],[89.9,25.2],[89.8,26.0],[89.0,26.2],[88.4,26.5],[88.1,25.6],[88.6,25.2],[88.0,24.6],[88.7,24.0],[88.7,23.2],[89.0,22.0],[88.9,21.6],[88.2,21.6],[87.0,21.5],[86.5,20.6],[85.4,19.7],[84.8,19.2],[83.6,18.1],[82.3,16.6],[81.3,16.3],[80.9,15.7],[80.2,15.1],[80.1,13.4],[79.9,12.0],[79.8,10.6],[79.3,10.3],[78.9,9.4],[78.2,8.9],[77.5,8.1],[76.6,8.9],[76.2,10.2],[75.7,11.6],[74.9,12.8],[74.4,14.4],[73.8,15.9],[73.3,17.5],[72.9,19.0],[72.8,20.4],[72.6,21.3],[72.6,22.2],[72.1,21.2],[71.1,20.7],[70.0,21.0],[69.0,22.3],[70.4,22.9],[68.9,23.0],[68.2,23.6],[69.6,24.3],[71.0,24.3],[70.6,25.6],[70.0,27.1],[71.4,27.9],[72.2,28.6],[73.4,29.9],[74.6,31.0],[74.6,32.0],[75.3,32.3],[74.0,33.0],[73.7,33.6],[73.9,34.6],[73.5,35.0],[74.0,36.0]]
const inside = (x, y) => {
  let c = false
  for (let i = 0, j = INDIA.length - 1; i < INDIA.length; j = i++) {
    const [xi, yi] = INDIA[i], [xj, yj] = INDIA[j]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c
  }
  return c
}
const STEP = 0.55, K = 10
const proj = (lon, lat) => [(lon - 68) * K, (37.5 - lat) * K * 1.05]

export default function IndiaMap() {
  const [sel, setSel] = useState(0)
  const dots = useMemo(() => {
    const out = []
    for (let lat = 7.8; lat < 37.4; lat += STEP) for (let lon = 68; lon < 97.6; lon += STEP) if (inside(lon, lat)) out.push(proj(lon, lat))
    return out
  }, [])
  const pts = OFFICES.map(o => proj(o.lon, o.lat))
  const o = OFFICES[sel]

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="relative mx-auto w-full max-w-lg">
        <svg viewBox="0 0 300 320" className="w-full" role="img" aria-label="Map of India showing KalpLabs offices in Delhi, Noida, Pune and Bengaluru">
          <defs>
            <radialGradient id="glow"><stop offset="0" stopColor="#F28C28" stopOpacity=".9" /><stop offset="1" stopColor="#F28C28" stopOpacity="0" /></radialGradient>
          </defs>
          {dots.map(([x, y], i) => {
            const d = Math.min(...pts.map(([px, py]) => Math.hypot(px - x, py - y)))
            const lit = Math.max(0, 1 - d / 55)
            return <circle key={i} cx={x} cy={y} r={1.55} fill={lit > 0 ? `rgba(242,${140 + lit * 60},${40 + lit * 80},${0.18 + lit * 0.7})` : 'rgba(255,255,255,.14)'} />
          })}
          {/* network lines from HQ */}
          {pts.slice(1).map(([x, y], i) => (
            <path key={i} d={`M${pts[0][0]},${pts[0][1]} Q${(pts[0][0] + x) / 2 - 30},${(pts[0][1] + y) / 2} ${x},${y}`} fill="none" stroke="#38E1FF" strokeOpacity=".85" strokeWidth="1.1" strokeDasharray="3 4">
              <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1.2s" repeatCount="indefinite" />
            </path>
          ))}
          {pts.map(([x, y], i) => (
            <g key={i} className="cursor-pointer" onClick={() => setSel(i)} onMouseEnter={() => setSel(i)}>
              <circle cx={x} cy={y} r={sel === i ? 16 : 10} fill="url(#glow)">
                <animate attributeName="r" values={sel === i ? '12;20;12' : '8;12;8'} dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r={3.2} fill={sel === i ? '#fff' : '#F28C28'} stroke="#07090D" strokeWidth="1" />
              <text x={x + (OFFICES[i].city === 'Noida' ? 9 : -9)} y={y + (OFFICES[i].city === 'Noida' ? 12 : -7)} textAnchor={OFFICES[i].city === 'Noida' ? 'start' : 'end'}
                className="fill-white font-mono" stroke="#07090D" strokeWidth="2.5" paintOrder="stroke" style={{ fontSize: 8.5, fontWeight: 600, opacity: sel === i ? 1 : .7 }}>{OFFICES[i].city}</text>
            </g>
          ))}
        </svg>
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {OFFICES.map((x, i) => (
            <button key={x.city} onClick={() => setSel(i)}
              className={`rounded-full border px-4 py-2 text-sm transition ${sel === i ? 'border-saffron bg-saffron text-ink' : 'border-white/15 text-white/70 hover:border-white/40'}`}>{x.city}</button>
          ))}
        </div>
        <div key={o.city} className="card mt-6 p-6" style={{ animation: 'fadein .4s' }}>
          <p className="eyebrow">{o.tag}</p>
          <h3 className="mt-2 text-2xl font-bold">{o.city}</h3>
          <p className="mt-3 flex gap-3 text-white/70"><MapPin className="mt-0.5 shrink-0 text-saffron" size={18} />{o.address}</p>
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(o.address)}`} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-5 py-2 text-sm"><Navigation size={16} />Get directions</a>
        </div>
      </div>
    </div>
  )
}
