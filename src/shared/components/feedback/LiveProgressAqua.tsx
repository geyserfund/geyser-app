/* eslint-disable complexity */
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

type LiveProgressAquaProps = {
  value: number // 0–100
  height?: number | string
  width?: number | string
  radius?: number | string
  trackColor?: string
  fillColor?: string
  fillGradient?: string
  glowColor?: string
  label?: string
  showPercent?: boolean
  transitionMs?: number
  flowSpeedSec?: number // stripes speed
  waveIntensity?: number // subtle displacement on bubbles
  bubbleCount?: number
  bubbleSpeed?: number
  bubbleSize?: [number, number]
  sparkleCount?: number
  sparkleDurationMs?: number
  ariaLabel?: string
  removeLiveDot?: boolean
}

type StyleProps = {
  percent: number
  radius: number | string
  height: number | string
  trackColor: string
  fillCss: string
  glowColor: string
  transitionMs: number
  flowSpeedSec: number
  width: number | string
}

type Bubble = {
  x: number
  y: number
  r: number
  vy: number
  wobbleA: number
  wobbleP: number
  alpha: number
}
type Sparkle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  ttl: number
  size: number
}

/* -------------------------------------------------------------------------- */
/* Styles                                                                      */
/* -------------------------------------------------------------------------- */

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    width: ({ width }: StyleProps) => (typeof width === 'number' ? `${width}px` : width || '100%'),
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: 'currentColor',
    marginRight: 6,
    animation: '$pulse 1.6s ease-in-out infinite',
  },
  track: {
    position: 'relative',
    width: '100%',
    height: ({ height }: StyleProps) => (typeof height === 'number' ? `${height}px` : height),
    borderRadius: ({ radius }: StyleProps) => (typeof radius === 'number' ? `${radius}px` : radius),
    overflow: 'hidden',
    background: ({ trackColor }: StyleProps) => trackColor,
  },
  fillWrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: ({ percent }: StyleProps) => `${Math.max(0, Math.min(100, percent))}%`,
    transition: ({ transitionMs }: StyleProps) => `width ${transitionMs}ms cubic-bezier(.2,.8,.2,1)`,
    willChange: 'width',
    overflow: 'hidden',
  },
  barFill: {
    position: 'absolute',
    inset: 0,
    background: ({ fillCss }: StyleProps) => fillCss,
  },
  flowOverlay: {
    position: 'absolute',
    inset: 0,
    background:
      'repeating-linear-gradient(115deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 8px, rgba(255,255,255,0.0) 8px, rgba(255,255,255,0.0) 22px)',
    mixBlendMode: 'screen',
    backgroundSize: '200% 100%',
    animation: ({ flowSpeedSec }: StyleProps) => `$flow ${flowSpeedSec || 3}s linear infinite`,
    pointerEvents: 'none',
  },
  glow: {
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
    boxShadow: ({ glowColor }: StyleProps) => `0 0 22px 2px ${glowColor}`,
    opacity: 0.35,
    filter: 'blur(6px)',
    borderRadius: ({ radius }: StyleProps) => (typeof radius === 'number' ? `${radius}px` : radius),
  },
  // canvases
  bubblesCanvas: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
  },
  sparklesCanvas: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },

  /* -------------------- Canvas Wavecap (right tip) -------------------- */
  capWrap: {
    position: 'absolute',
    top: 0,
    right: '-2px',
    height: '100%',
    width: 24, // thickness of the cap
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 2,
  },
  capCanvas: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
  },

  /* -------------------- Keyframes -------------------- */
  '@keyframes flow': {
    '0%': { backgroundPosition: '0% 0%' },
    '100%': { backgroundPosition: '200% 0%' },
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 0.55, transform: 'scale(0.9)' },
    '50%': { opacity: 1, transform: 'scale(1.15)' },
  },
})

/* -------------------------------------------------------------------------- */
/* Animation Hooks                                                             */
/* -------------------------------------------------------------------------- */

function useBubbles(
  canvas: HTMLCanvasElement | null,
  width: number,
  height: number,
  bubbleCount: number,
  bubbleSpeed: number,
  bubbleSize: [number, number],
) {
  useEffect(() => {
    if (!canvas || width === 0 || height === 0) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.width = Math.max(1, Math.floor(width * dpr))
    canvas.height = Math.max(1, Math.floor(height * dpr))

    let running = true
    let last = performance.now()
    const bubbles: Bubble[] = []

    const [minR, maxR] = bubbleSize
    const R = () => minR + Math.random() * (maxR - minR)
    const gen = (): Bubble => ({
      x: Math.random() * width,
      y: height + Math.random() * height * 0.6,
      r: R(),
      vy: (0.15 + Math.random() * 0.35) * bubbleSpeed,
      wobbleA: 4 + Math.random() * 10,
      wobbleP: Math.random() * Math.PI * 2,
      alpha: 0.25 + Math.random() * 0.55,
    })

    for (let i = 0; i < Math.floor(bubbleCount); i++) bubbles.push(gen())

    const loop = (t: number) => {
      if (!running) return
      const dt = Math.min(50, t - last)
      last = t

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)

      for (let i = 0; i < bubbles.length; i++) {
        let b = bubbles[i]
        if (!b) continue
        b.y -= b.vy * dt
        b.wobbleP += 0.006 * dt
        const wobble = Math.sin(b.wobbleP) * b.wobbleA
        const x = b.x + wobble * (width / 220)

        if (b.y + b.r < -2) {
          const nb = gen()
          nb.y = height + b.r
          bubbles[i] = nb
          b = nb
        }

        const grd = ctx.createRadialGradient(x - b.r * 0.4, b.y - b.r * 0.6, 0.1, x, b.y, b.r * 1.2)
        grd.addColorStop(0, `rgba(255,255,255,${0.55 * b.alpha})`)
        grd.addColorStop(0.4, `rgba(255,255,255,${0.25 * b.alpha})`)
        grd.addColorStop(1, `rgba(255,255,255,0)`)
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
      requestAnimationFrame(loop)
    }

    const raf = requestAnimationFrame(loop)
    return () => {
      running = false
      cancelAnimationFrame(raf)
    }
  }, [canvas, width, height, bubbleCount, bubbleSpeed, bubbleSize])
}

function useSparklesOnIncrease(
  canvas: HTMLCanvasElement | null,
  trackEl: HTMLElement | null,
  percent: number,
  value: number,
  sparkleCount: number,
  sparkleDurationMs: number,
) {
  const prev = useRef(value)
  useEffect(() => {
    const inc = value > prev.current
    prev.current = value
    if (!inc || !canvas || !trackEl) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = trackEl.getBoundingClientRect()
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    canvas.width = Math.max(1, Math.floor(rect.width * dpr))
    canvas.height = Math.max(1, Math.floor(rect.height * dpr))

    const ox = (percent / 100) * rect.width
    const oy = rect.height / 2

    const N = sparkleCount
    const DUR = sparkleDurationMs
    const parts: Sparkle[] = []
    for (let i = 0; i < N; i++) {
      const ang = (i / N) * Math.PI * 2 + (Math.random() - 0.5) * 0.6
      const spd = 0.25 + Math.random() * 0.65
      parts.push({
        x: ox,
        y: oy,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        life: 0,
        ttl: DUR * (0.75 + Math.random() * 0.5),
        size: 1 + Math.random() * 2.2,
      })
    }

    let last = performance.now()
    let running = true

    const loop = (t: number) => {
      if (!running) return
      const dt = Math.min(50, t - last)
      last = t

      const dpr2 = Math.min(2, window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr2, dpr2)

      let alive = false
      for (const p of parts) {
        p.life += dt
        if (p.life <= p.ttl) {
          alive = true
          p.x += p.vx * dt
          p.y += p.vy * dt + 0.0006 * dt * dt * 0.5
          const f = 1 - p.life / p.ttl
          const a = Math.max(0, f)

          ctx.strokeStyle = `rgba(255,255,255,${0.95 * a})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p.x - 3 * p.size, p.y)
          ctx.lineTo(p.x + 3 * p.size, p.y)
          ctx.moveTo(p.x, p.y - 3 * p.size)
          ctx.lineTo(p.x, p.y + 3 * p.size)
          ctx.stroke()

          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 8 * p.size)
          grd.addColorStop(0, `rgba(255,255,255,${0.7 * a})`)
          grd.addColorStop(1, `rgba(255,255,255,0)`)
          ctx.fillStyle = grd
          ctx.beginPath()
          ctx.arc(p.x, p.y, 8 * p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.restore()
      if (!alive) {
        running = false
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      requestAnimationFrame(loop)
    }

    const raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [canvas, trackEl, percent, value, sparkleCount, sparkleDurationMs])
}

/* -------------------- NEW: Canvas Wavecap (noticeable) -------------------- */
function useWaveCapCanvas(canvas: HTMLCanvasElement | null, width: number, height: number, color: string) {
  useEffect(() => {
    if (!canvas || width === 0 || height === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.width = Math.max(1, Math.ceil(width * dpr))
    canvas.height = Math.max(1, Math.ceil(height * dpr))

    let running = true
    let phase1 = 0
    let phase2 = Math.PI // parallax
    const speed1 = 0.06 // radians per frame
    const speed2 = 0.04
    const amp1 = Math.max(6, Math.min(12, height * 0.12))
    const amp2 = Math.max(4, Math.min(10, height * 0.09))
    const period = Math.max(40, Math.min(120, height * 0.8)) // vertical wavelength

    const drawWave = (phase: number, amp: number, color: string, alpha: number) => {
      ctx.save()
      ctx.globalAlpha = alpha

      // We draw a vertical sine front that hugs the right tip.
      // x(y) = w - (capThickness - curvedEdge), with curvedEdge varying by sine.
      ctx.beginPath()
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const capThickness = w // drawing in full canvas width (cap only)

      // start at bottom-right, go upward with curve
      let first = true
      for (let y = 0; y <= h; y += 2) {
        const s = Math.sin((y / period) * 2 * Math.PI + phase)
        const edgeOffset = amp * (0.5 + 0.5 * s) // 0..amp
        const x = capThickness - edgeOffset
        if (first) {
          ctx.moveTo(x, h) // bottom
          first = false
        }

        ctx.lineTo(x, h - y)
      }

      // close to the right border to form the filled cap
      ctx.lineTo(capThickness, 0)
      ctx.lineTo(capThickness, h)
      ctx.closePath()

      // bright fill + soft inner glow to stand out
      const grad = ctx.createLinearGradient(0, 0, capThickness, 0)
      grad.addColorStop(0, color)
      grad.addColorStop(1, color)
      ctx.fillStyle = grad
      ctx.fill()

      // subtle highlight along the curve
      ctx.lineWidth = 1
      ctx.strokeStyle = color
      ctx.stroke()

      ctx.restore()
    }

    const loop = () => {
      if (!running) return

      const dpr2 = Math.min(2, window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr2, dpr2)

      // back wave
      drawWave(phase2, amp2, color, 0.55)
      // front wave
      drawWave(phase1, amp1, color, 0.9)

      ctx.restore()

      phase1 += speed1
      phase2 += speed2

      requestAnimationFrame(loop)
    }

    const raf = requestAnimationFrame(loop)
    return () => {
      running = false
      cancelAnimationFrame(raf)
    }
  }, [canvas, width, height, color])
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export const LiveProgressAqua: React.FC<LiveProgressAquaProps> = ({
  value,
  height = 20,
  width = '100%',
  radius = 16,
  trackColor,
  fillColor,
  fillGradient,
  glowColor,
  label = 'All-or-Nothing',
  showPercent = true,
  transitionMs = 650,
  flowSpeedSec = 2.8,
  waveIntensity = 2.2,
  bubbleCount = 36,
  bubbleSpeed = 1.0,
  bubbleSize = [2, 6],
  sparkleCount = 22,
  sparkleDurationMs = 900,
  ariaLabel = 'Progress',
  removeLiveDot = false,
}) => {
  // Hooks called in fixed order (no conditionals)
  const trackDefault = useColorModeValue('#EDF2F7', '#2D3748')
  const liveLabelColor = useColorModeValue('#0D9488', '#81E6D9')

  const trackRef = useRef<HTMLDivElement>(null)
  const fillWrapRef = useRef<HTMLDivElement>(null)
  const bubblesCanvasRef = useRef<HTMLCanvasElement>(null)
  const sparklesCanvasRef = useRef<HTMLCanvasElement>(null)
  const capCanvasRef = useRef<HTMLCanvasElement>(null)

  const [wrapSize, setWrapSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 })

  const resolvedTrack = trackColor ?? trackDefault
  const resolvedFill =
    fillGradient ?? `linear-gradient(90deg, ${fillColor ?? '#00E4FF'} 0%, ${fillColor ?? '#00F5D4'} 50%, #4ADE80 100%)`
  const resolvedGlow = glowColor ?? (fillColor ? fillColor : '#00E4FF')
  const percentClamped = Math.max(0, Math.min(100, value))

  const removeWaveCap = useMemo(() => {
    return value >= 100
  }, [value])

  // measure only the filled area (for perfect bubble clipping)
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (!fillWrapRef.current) return
      const r = fillWrapRef.current.getBoundingClientRect()
      setWrapSize({ w: Math.max(0, Math.ceil(r.width)), h: Math.max(0, Math.ceil(r.height)) })
    })
    if (fillWrapRef.current) ro.observe(fillWrapRef.current)
    return () => ro.disconnect()
  }, [])

  // animations
  useBubbles(bubblesCanvasRef.current, wrapSize.w, wrapSize.h, bubbleCount, bubbleSpeed, bubbleSize)
  useSparklesOnIncrease(
    sparklesCanvasRef.current,
    trackRef.current,
    percentClamped,
    value,
    sparkleCount,
    sparkleDurationMs,
  )
  // NEW: canvas wavecap animation (very visible)
  useWaveCapCanvas(capCanvasRef.current, 48, wrapSize.h, resolvedTrack)

  const styles = useStyles({
    percent: percentClamped,
    radius,
    height,
    trackColor: resolvedTrack,
    fillCss: resolvedFill,
    glowColor: resolvedGlow,
    transitionMs,
    flowSpeedSec,
    width,
  } as unknown as StyleProps)

  const percentText = useMemo(() => `${value.toFixed(0)}%`, [value])

  return (
    <Box className={styles.root} width={width} aria-label={ariaLabel}>
      {/* subtle wobble filter for extra liquid feel (applied to fill area) */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="lp-fluid-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.007 * (waveIntensity / 2)}
              numOctaves={2}
              seed={7}
              result="n"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n"
              scale={waveIntensity * 6}
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation={0.15} />
          </filter>
        </defs>
      </svg>

      <Flex className={styles.headerRow}>
        <Flex align="center" color={liveLabelColor}>
          {!removeLiveDot && <Box className={styles.liveDot} />}
          <Text fontWeight="semibold" fontSize="sm">
            {label}
          </Text>
        </Flex>
        {showPercent && (
          <Text fontWeight="bold" fontSize="sm" opacity={0.9}>
            {percentText}
          </Text>
        )}
      </Flex>

      <Box
        ref={trackRef}
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentClamped}
      >
        {/* Filled region (clips bubbles) */}
        <Box ref={fillWrapRef} className={styles.fillWrap} style={{ filter: 'url(#lp-fluid-filter)' }}>
          <Box className={styles.barFill} />
          <Box className={styles.flowOverlay} />
          <canvas ref={bubblesCanvasRef} className={styles.bubblesCanvas} />

          {/* NEW: high-contrast canvas wavecap at the right tip */}
          {!removeWaveCap && (
            <Box className={styles.capWrap}>
              <canvas ref={capCanvasRef} className={styles.capCanvas} />
            </Box>
          )}
        </Box>

        {/* Glow + sparkles overlay */}
        <Box className={styles.glow} />
        <canvas ref={sparklesCanvasRef} className={styles.sparklesCanvas} />
      </Box>
    </Box>
  )
}

export default LiveProgressAqua
