"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  pulsePhase: number
}

interface Connection {
  particle1: Particle
  particle2: Particle
  opacity: number
  strength: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const connectionsRef = useRef<Connection[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const colors = [
      "rgba(0, 191, 255, 0.8)", // Cyan
      "rgba(0, 128, 255, 0.6)", // Blue
      "rgba(128, 0, 255, 0.5)", // Purple
      "rgba(255, 0, 128, 0.4)", // Pink
      "rgba(0, 255, 128, 0.6)", // Green
    ]

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
      return particles
    }

    const updateParticles = (particles: Particle[]) => {
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulsePhase += 0.02

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Pulse effect
        particle.opacity = 0.3 + Math.sin(particle.pulsePhase) * 0.3
      })
    }

    const createConnections = (particles: Particle[]) => {
      const connections: Connection[] = []
      const maxDistance = 120
      const maxConnections = 200

      for (let i = 0; i < particles.length && connections.length < maxConnections; i++) {
        for (let j = i + 1; j < particles.length && connections.length < maxConnections; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const strength = 1 - distance / maxDistance
            connections.push({
              particle1: particles[i],
              particle2: particles[j],
              opacity: strength * 0.4,
              strength,
            })
          }
        }
      }
      return connections
    }

    const drawParticles = (particles: Particle[]) => {
      particles.forEach((particle) => {
        ctx.save()
        ctx.globalAlpha = particle.opacity

        // Outer glow
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Inner core
        ctx.fillStyle = particle.color.replace(/0\.\d+/, "1")
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })
    }

    const drawConnections = (connections: Connection[]) => {
      connections.forEach((connection) => {
        ctx.save()
        ctx.globalAlpha = connection.opacity

        // Create gradient line
        const gradient = ctx.createLinearGradient(
          connection.particle1.x,
          connection.particle1.y,
          connection.particle2.x,
          connection.particle2.y,
        )

        gradient.addColorStop(0, connection.particle1.color)
        gradient.addColorStop(0.5, "rgba(0, 191, 255, 0.6)")
        gradient.addColorStop(1, connection.particle2.color)

        ctx.strokeStyle = gradient
        ctx.lineWidth = connection.strength * 2
        ctx.lineCap = "round"

        // Add glow effect
        ctx.shadowColor = "rgba(0, 191, 255, 0.8)"
        ctx.shadowBlur = 5

        ctx.beginPath()
        ctx.moveTo(connection.particle1.x, connection.particle1.y)
        ctx.lineTo(connection.particle2.x, connection.particle2.y)
        ctx.stroke()

        ctx.restore()
      })
    }

    const drawNeuralPulses = (connections: Connection[]) => {
      const time = Date.now() * 0.001
      connections.forEach((connection, index) => {
        if (Math.random() > 0.995) {
          // Occasional neural pulse
          const progress = (time * 2 + index) % 1
          const x = connection.particle1.x + (connection.particle2.x - connection.particle1.x) * progress
          const y = connection.particle1.y + (connection.particle2.y - connection.particle1.y) * progress

          ctx.save()
          ctx.globalAlpha = Math.sin(progress * Math.PI) * 0.8

          const pulseGradient = ctx.createRadialGradient(x, y, 0, x, y, 15)
          pulseGradient.addColorStop(0, "rgba(0, 255, 255, 1)")
          pulseGradient.addColorStop(1, "rgba(0, 255, 255, 0)")

          ctx.fillStyle = pulseGradient
          ctx.beginPath()
          ctx.arc(x, y, 8, 0, Math.PI * 2)
          ctx.fill()

          ctx.restore()
        }
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateParticles(particlesRef.current)
      connectionsRef.current = createConnections(particlesRef.current)

      drawConnections(connectionsRef.current)
      drawNeuralPulses(connectionsRef.current)
      drawParticles(particlesRef.current)

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      particlesRef.current = createParticles()
    }

    // Initialize
    resizeCanvas()
    particlesRef.current = createParticles()
    animate()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "transparent",
      }}
    />
  )
}
