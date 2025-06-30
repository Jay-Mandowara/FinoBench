import { Badge } from "@/components/ui/badge"
import { AdvancedMarketAgent } from "@/components/agents/advanced-market-agent"
import { QuantumRiskAgent } from "@/components/agents/quantum-risk-agent"
import { PortfolioOptimizerAgent } from "@/components/agents/portfolio-optimizer-agent"
import { ResearchAgent } from "@/components/agents/research-agent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, ArrowLeft, Brain, Atom, Database, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AgentsPage() {
  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 py-8 relative z-20">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 text-slate-300 hover:text-white hover:bg-slate-700">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center glow-effect">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 neon-text">Advanced AI Agent Demos</h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Experience our next-generation AI agents powered by{" "}
              <span className="text-cyan-400 font-semibold">deep reinforcement learning</span>,{" "}
              <span className="text-purple-400 font-semibold">quantum computing</span>, and{" "}
              <span className="text-green-400 font-semibold">neural architectures</span> trained on{" "}
              <span className="text-blue-400 font-semibold">billions of data points</span>.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-cyan-500/30">
                <Database className="h-4 w-4 text-cyan-400" />
                <span className="text-cyan-300">5.7B+ Training Samples</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-purple-500/30">
                <Atom className="h-4 w-4 text-purple-400" />
                <span className="text-purple-300">Quantum-Enhanced</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-green-500/30">
                <Cpu className="h-4 w-4 text-green-400" />
                <span className="text-green-300">Neural Fusion</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-sm electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center glow-effect">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                Advanced Market Analysis Agent
              </CardTitle>
              <CardDescription className="text-slate-300">
                Deep reinforcement learning with transformer architecture trained on 2.4B market data points
              </CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-400/30 text-xs">Deep RL</Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30 text-xs">Transformer</Badge>
                <Badge className="bg-green-500/20 text-green-400 border-green-400/30 text-xs">Multi-Modal</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <AdvancedMarketAgent />
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-sm electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center glow-effect">
                  <Atom className="h-4 w-4 text-white" />
                </div>
                Quantum Risk Assessment Agent
              </CardTitle>
              <CardDescription className="text-slate-300">
                Quantum-enhanced risk modeling with superposition states and neural-quantum fusion
              </CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/30 text-xs">Quantum</Badge>
                <Badge className="bg-pink-500/20 text-pink-400 border-pink-400/30 text-xs">Superposition</Badge>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-400/30 text-xs">Entanglement</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <QuantumRiskAgent />
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-sm electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center glow-effect">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                Portfolio Optimizer Agent
              </CardTitle>
              <CardDescription className="text-slate-300">
                Advanced optimization with genetic algorithms and reinforcement learning
              </CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-400/30 text-xs">Genetic Algo</Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30 text-xs">RL Optimization</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <PortfolioOptimizerAgent />
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-sm electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center glow-effect">
                  <Database className="h-4 w-4 text-white" />
                </div>
                Research Agent
              </CardTitle>
              <CardDescription className="text-slate-300">
                Comprehensive research with natural language processing and knowledge graphs
              </CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-400/30 text-xs">NLP</Badge>
                <Badge className="bg-red-500/20 text-red-400 border-red-400/30 text-xs">Knowledge Graph</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResearchAgent />
            </CardContent>
          </Card>
        </div>

        {/* Technical Specifications */}
        <div className="mt-12">
          <Card className="bg-slate-800/50 border-cyan-500/30 electric-border">
            <CardHeader>
              <CardTitle className="text-center text-white neon-text">
                Advanced AI Architecture Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Deep Learning</h3>
                  <ul className="text-sm text-cyan-300 space-y-1">
                    <li>• Transformer Architecture</li>
                    <li>• 2.4B+ Training Parameters</li>
                    <li>• Multi-Modal Processing</li>
                    <li>• Attention Mechanisms</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                    <Atom className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Quantum Computing</h3>
                  <ul className="text-sm text-purple-300 space-y-1">
                    <li>• Quantum Superposition</li>
                    <li>• Entanglement Networks</li>
                    <li>• Error Correction</li>
                    <li>• Quantum Advantage</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Reinforcement Learning</h3>
                  <ul className="text-sm text-green-300 space-y-1">
                    <li>• Policy Gradient Methods</li>
                    <li>• Actor-Critic Networks</li>
                    <li>• Monte Carlo Simulations</li>
                    <li>• Reward Optimization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
