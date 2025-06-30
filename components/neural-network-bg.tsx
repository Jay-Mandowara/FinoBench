"use client"

import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  size: number
  color: string
  pulsePhase: number
  layer: number
}

interface Synapse {
  from: Node
  to: Node
  strength: number
  activity: number
  pulsePosition: number
}

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const synapsesRef = useRef<Synapse[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createNeuralNetwork = () => {
      const nodes: Node[] = []
      const synapses: Synapse[] = []
      const layers = 4
      const nodesPerLayer = 8
      const colors = [
        "rgba(0, 191, 255, 0.8)",
        "rgba(0, 255, 128, 0.7)",
        "rgba(255, 0, 128, 0.6)",
        "rgba(128, 0, 255, 0.7)",
      ]

      // Create nodes in layers
      for (let layer = 0; layer < layers; layer++) {
        const layerX = (canvas.width / (layers + 1)) * (layer + 1)
        for (let i = 0; i < nodesPerLayer; i++) {
          const nodeY = (canvas.height / (nodesPerLayer + 1)) * (i + 1)
          nodes.push({
            x: layerX + (Math.random() - 0.5) * 100,
            y: nodeY + (Math.random() - 0.5) * 80,
            size: Math.random() * 4 + 2,
            color: colors[layer],
            pulsePhase: Math.random() * Math.PI * 2,
            layer,
          })
        }
      }

      // Create synapses between adjacent layers
      for (let layer = 0; layer < layers - 1; layer++) {
        const currentLayerNodes = nodes.filter((n) => n.layer === layer)
        const nextLayerNodes = nodes.filter((n) => n.layer === layer + 1)

        currentLayerNodes.forEach((fromNode) => {
          nextLayerNodes.forEach((toNode) => {
            if (Math.random() > 0.3) {
              // 70% chance of connection
              synapses.push({
                from: fromNode,
                to: toNode,
                strength: Math.random() * 0.8 + 0.2,
                activity: 0,
                pulsePosition: 0,
              })
            }
          })
        })
      }

      return { nodes, synapses }
    }

    const updateNetwork = (nodes: Node[], synapses: Synapse[]) => {
      // Update node pulses
      nodes.forEach((node) => {
        node.pulsePhase += 0.03
      })

      // Update synapse activity
      synapses.forEach((synapse) => {
        if (Math.random() > 0.98) {
          synapse.activity = 1
          synapse.pulsePosition = 0
        }

        if (synapse.activity > 0) {
          synapse.pulsePosition += 0.02
          if (synapse.pulsePosition >= 1) {
            synapse.activity = 0
            synapse.pulsePosition = 0
          }
        }
      })
    }

    const drawNodes = (nodes: Node[]) => {
      nodes.forEach((node) => {
        const pulseIntensity = Math.sin(node.pulsePhase) * 0.3 + 0.7

        ctx.save()
        ctx.globalAlpha = pulseIntensity * 0.6

        // Outer glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 4)
        glowGradient.addColorStop(0, node.color)
        glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Inner core
        ctx.globalAlpha = pulseIntensity
        ctx.fillStyle = node.color.replace(/0\.\d+/, "1")
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()

        // Neural activity ring
        if (pulseIntensity > 0.9) {
          ctx.globalAlpha = 0.8
          ctx.strokeStyle = "rgba(0, 255, 255, 0.8)"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2)
          ctx.stroke()
        }

        ctx.restore()
      })
    }

    const drawSynapses = (synapses: Synapse[]) => {
      synapses.forEach((synapse) => {
        ctx.save()
        ctx.globalAlpha = synapse.strength * 0.3

        // Base synapse line
        const gradient = ctx.createLinearGradient(synapse.from.x, synapse.from.y, synapse.to.x, synapse.to.y)
        gradient.addColorStop(0, synapse.from.color)
        gradient.addColorStop(1, synapse.to.color)

        ctx.strokeStyle = gradient
        ctx.lineWidth = synapse.strength * 1.5
        ctx.lineCap = "round"

        ctx.beginPath()
        ctx.moveTo(synapse.from.x, synapse.from.y)
        ctx.lineTo(synapse.to.x, synapse.to.y)
        ctx.stroke()

        // Neural pulse
        if (synapse.activity > 0) {
          const pulseX = synapse.from.x + (synapse.to.x - synapse.from.x) * synapse.pulsePosition
          const pulseY = synapse.from.y + (synapse.to.y - synapse.from.y) * synapse.pulsePosition

          ctx.globalAlpha = synapse.activity * 0.9
          const pulseGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 12)
          pulseGradient.addColorStop(0, "rgba(0, 255, 255, 1)")
          pulseGradient.addColorStop(0.5, "rgba(0, 191, 255, 0.8)")
          pulseGradient.addColorStop(1, "rgba(0, 191, 255, 0)")

          ctx.fillStyle = pulseGradient
          ctx.beginPath()
          ctx.arc(pulseX, pulseY, 6, 0, Math.PI * 2)
          ctx.fill()

          // Pulse trail
          ctx.globalAlpha = synapse.activity * 0.4
          ctx.strokeStyle = "rgba(0, 255, 255, 0.8)"
          ctx.lineWidth = 3
          ctx.lineCap = "round"

          const trailLength = 20
          const trailStartX = pulseX - (synapse.to.x - synapse.from.x) * 0.1
          const trailStartY = pulseY - (synapse.to.y - synapse.from.y) * 0.1

          ctx.beginPath()
          ctx.moveTo(trailStartX, trailStartY)
          ctx.lineTo(pulseX, pulseY)
          ctx.stroke()
        }

        ctx.restore()
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateNetwork(nodesRef.current, synapsesRef.current)
      drawSynapses(synapsesRef.current)
      drawNodes(nodesRef.current)

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      const { nodes, synapses } = createNeuralNetwork()
      nodesRef.current = nodes
      synapsesRef.current = synapses
    }

    // Initialize
    resizeCanvas()
    const { nodes, synapses } = createNeuralNetwork()
    nodesRef.current = nodes
    synapsesRef.current = synapses
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
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      style={{
        background: "transparent",
      }}
    />
  )
}
