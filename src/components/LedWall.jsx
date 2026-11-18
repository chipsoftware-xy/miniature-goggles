import { useEffect, useRef } from 'react'

// Interactive LED wall: a living colour field drawn as individual LED dots.
// - pointer acts like a flashlight that powers pixels to full brightness
// - click / tap sends a ripple across the wall
// - `pitch` sets the dot spacing in CSS px (simulates pixel pitch)
const PALETTE = [[242, 140, 40], [255, 61, 119], [123, 44, 255], [56, 225, 255], [29, 185, 84], [242, 140, 40]]
function pal(t) {
  t = ((t % 1) + 1) % 1
  const f = t * (PALETTE.length - 1), i = Math.floor(f), k = f - i
  const a = PALETTE[i], b = PALETTE[i + 1]
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]
}

export default function LedWall({ pitch = 10, base = 0.22, className = '' }) {
  const ref = useRef(null)
  const pitchRef = useRef(pitch)
  pitchRef.current = pitch

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d')
    const small = document.createElement('canvas'), sctx = small.getContext('2d')
    const maskC = document.createElement('canvas'), mctx = maskC.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, cols = 0, rows = 0, p = 0, dpr = 1, img, raf, visible = true
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    const ripples = []

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = cv.clientWidth; H = cv.clientHeight; p = pitchRef.current
      cv.width = W * dpr; cv.height = H * dpr
      cols = Math.ceil(W / p) + 1; rows = Math.ceil(H / p) + 1
      small.width = cols; small.height = rows
      img = sctx.createImageData(cols, rows)
      // one LED dot, repeated as a pattern mask
      const cell = Math.max(2, Math.round(p * dpr))
      maskC.width = maskC.height = cell
      mctx.clearRect(0, 0, cell, cell); mctx.fillStyle = '#fff'
      mctx.beginPath(); mctx.arc(cell / 2, cell / 2, cell * 0.36, 0, Math.PI * 2); mctx.fill()
    }

    const draw = now => {
      if (pitchRef.current !== p) setup()
      const t = now / 1000
      ptr.x += (ptr.tx - ptr.x) * 0.15; ptr.y += (ptr.ty - ptr.y) * 0.15
      const R = 240, d = img.data
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * p, py = y * p
          const v = Math.sin(x * p * 0.006 + t * 0.6) + Math.sin(y * p * 0.009 - t * 0.45) + Math.sin((x + y) * p * 0.004 + t * 0.3)
          const c = pal(v / 6 + t * 0.03)
          const dx = px - ptr.x, dy = py - ptr.y, dist = Math.sqrt(dx * dx + dy * dy)
          let b = base + Math.max(0, 1 - dist / R) ** 2 * 0.95
          for (const r of ripples) { const w = Math.abs(Math.hypot(px - r.x, py - r.y) - r.r); if (w < 40) b += (1 - w / 40) * r.a }
          b = Math.min(1, b)
          const i = (y * cols + x) * 4
          d[i] = c[0] * b; d[i + 1] = c[1] * b; d[i + 2] = c[2] * b; d[i + 3] = 255
        }
      }
      for (let i = ripples.length - 1; i >= 0; i--) { ripples[i].r += 9; ripples[i].a *= 0.975; if (ripples[i].a < 0.02) ripples.splice(i, 1) }
      sctx.putImageData(img, 0, 0)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, cv.width, cv.height)
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(small, 0, 0, cols * p * dpr, rows * p * dpr)
      ctx.globalCompositeOperation = 'destination-in'
      ctx.fillStyle = ctx.createPattern(maskC, 'repeat')
      ctx.fillRect(0, 0, cv.width, cv.height)
      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    const toLocal = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top] }
    const onMove = e => { const [x, y] = toLocal(e); ptr.tx = x; ptr.ty = y; if (ptr.x < -999) { ptr.x = x; ptr.y = y } }
    const onLeave = () => { ptr.tx = -9999; ptr.ty = -9999 }
    const onDown = e => { const [x, y] = toLocal(e); ripples.push({ x, y, r: 0, a: 0.9 }); if (reduce) requestAnimationFrame(draw) }
    const host = cv.parentElement
    host.addEventListener('pointermove', onMove); host.addEventListener('pointerleave', onLeave); host.addEventListener('pointerdown', onDown)
    const ro = new ResizeObserver(() => { setup(); if (reduce) requestAnimationFrame(draw) }); ro.observe(cv)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible) raf = requestAnimationFrame(draw) })
    io.observe(cv)
    setup(); raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave); host.removeEventListener('pointerdown', onDown) }
  }, [base])

  return <canvas ref={ref} aria-hidden className={`absolute inset-0 h-full w-full ${className}`} />
}
