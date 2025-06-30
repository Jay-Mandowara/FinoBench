import { ParticleBackground } from "./particle-background"
import { NeuralNetworkBackground } from "./neural-network-bg"
import { DataStreamBackground } from "./data-stream-bg"

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <DataStreamBackground />
      <ParticleBackground />
      <NeuralNetworkBackground />
    </div>
  )
}
