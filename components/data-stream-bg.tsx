"use client"

import { useEffect, useRef } from "react"

interface DataStream {
  x: number
  y: number
  speed: number
  characters: string[]
  opacity: number
  color: string
}

export function DataStreamBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const streamsRef = useRef<DataStream[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$€¥£₿⚡◆◇○●△▲▼▽"
    const financialSymbols = ["BTC", "ETH", "USD", "EUR", "GBP", "JPY", "AI", "ML", "NN", "DL"]

    const createDataStreams = () => {
      const streams: DataStream[] = []
      const streamCount = Math.floor(canvas.width / 60)

      for (let i = 0; i < streamCount; i++) {
        const streamChars = []
        const streamLength = Math.floor(Math.random() * 20) + 10

        for (let j = 0; j < streamLength; j++) {
          if (Math.random() > 0.8) {
            streamChars.push(financialSymbols[Math.floor(Math.random() * financialSymbols.length)])
          } else {
            streamChars.push(characters[Math.floor(Math.random() * characters.length)])
          }
        }

        streams.push({
          x: i * 60 + Math.random() * 40,
          y: Math.random() * canvas.height - canvas.height,
          speed: Math.random() * 2 + 1,
          characters: streamChars,
          opacity: Math.random() * 0.5 + 0.3,
          color: Math.random() > 0.7 ? "rgba(0, 255, 128, 1)" : "rgba(0, 191, 255, 1)",
        })
      }

      return streams
    }

    const updateStreams = (streams: DataStream[]) => {
      streams.forEach((stream) => {
        stream.y += stream.speed

        if (stream.y > canvas.height + stream.characters.length * 20) {
          stream.y = -stream.characters.length * 20
          stream.x = Math.random() * canvas.width
          // Occasionally change characters
          if (Math.random() > 0.9) {
            stream.characters = stream.characters.map(() =>
              Math.random() > 0.8
                ? financialSymbols[Math.floor(Math.random() * financialSymbols.length)]
                : characters[Math.floor(Math.random() * characters.length)],
            )
          }
        }
      })
    }

    const drawStreams = (streams: DataStream[]) => {
      ctx.font = "14px 'Courier New', monospace"
      ctx.textAlign = "center"

      streams.forEach((stream) => {
        stream.characters.forEach((char, index) => {
          const charY = stream.y + index * 20
          if (charY > -20 && charY < canvas.height + 20) {
            const alpha = stream.opacity * (1 - index / stream.characters.length)

            ctx.save()
            ctx.globalAlpha = alpha

            // Glow effect for first few characters
            if (index < 3) {
              ctx.shadowColor = stream.color
              ctx.shadowBlur = 10
            }

            ctx.fillStyle = stream.color.replace("1)", `${alpha})`)
            ctx.fillText(char, stream.x, charY)

            ctx.restore()
          }
        })
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateStreams(streamsRef.current)
      drawStreams(streamsRef.current)

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      streamsRef.current = createDataStreams()
    }

    // Initialize
    resizeCanvas()
    streamsRef.current = createDataStreams()
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
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{
        background: "transparent",
      }}
    />
  )
}
