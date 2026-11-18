import { useEffect, useRef, useState } from 'react'

// Fades children up as they scroll into view.
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>{children}</Tag>
}

// 3D tilt + moving glare that follows the pointer.
export function Tilt({ className = '', max = 10, children }) {
  const ref = useRef(null)
  const move = e => {
    const el = ref.current, r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * max}deg) rotateX(${(0.5 - y) * max}deg) translateZ(0)`
    el.style.setProperty('--gx', `${x * 100}%`); el.style.setProperty('--gy', `${y * 100}%`)
  }
  const leave = () => { ref.current.style.transform = '' }
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave}
      className={`group/tilt relative transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}>
      {children}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{ background: 'radial-gradient(400px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,.14), transparent 40%)' }} />
    </div>
  )
}

// Counts up to `to` when visible.
export function Counter({ to, suffix = '', dur = 1400 }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = t => { const k = Math.min(1, (t - t0) / dur); setN(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(tick) }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [to, dur])
  return <span ref={ref}>{n}{suffix}</span>
}

// Soft glow that trails the cursor inside a section.
export function Spotlight({ className = '', color = 'rgba(242,140,40,.18)', children }) {
  const ref = useRef(null)
  const move = e => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--sx', `${e.clientX - r.left}px`); ref.current.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onPointerMove={move} className={`relative ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(600px circle at var(--sx,50%) var(--sy,30%), ${color}, transparent 45%)` }} />
      <div className="relative">{children}</div>
    </div>
  )
}

export const SectionHead = ({ eyebrow, title, sub, center }) => (
  <Reveal className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">{title}</h2>
    {sub && <p className="mt-4 text-lg text-white/60">{sub}</p>}
  </Reveal>
)
