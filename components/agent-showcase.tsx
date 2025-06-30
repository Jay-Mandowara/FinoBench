import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, Activity, Cpu, Zap } from "lucide-react"
import Link from "next/link"

const agents = [
  {
    name: "Market Analyst",
    description:
      "Analyzes market trends, news sentiment, and technical indicators to provide comprehensive market insights with neural precision.",
    capabilities: ["Technical Analysis", "Sentiment Analysis", "Trend Prediction"],
    status: "Active",
    color: "from-blue-500 to-cyan-500",
    performance: "99.7%",
  },
  {
    name: "Risk Manager",
    description:
      "Continuously monitors portfolio risk, calculates VaR, and provides risk mitigation strategies using advanced algorithms.",
    capabilities: ["Risk Assessment", "VaR Calculation", "Stress Testing"],
    status: "Active",
    color: "from-red-500 to-pink-500",
    performance: "99.9%",
  },
  {
    name: "Portfolio Optimizer",
    description:
      "Optimizes asset allocation using modern portfolio theory and machine learning algorithms for maximum efficiency.",
    capabilities: ["Asset Allocation", "Rebalancing", "Performance Analysis"],
    status: "Active",
    color: "from-green-500 to-emerald-500",
    performance: "98.5%",
  },
  {
    name: "Trading Strategist",
    description:
      "Develops and executes trading strategies based on quantitative analysis and real-time market patterns.",
    capabilities: ["Strategy Development", "Backtesting", "Execution"],
    status: "Active",
    color: "from-purple-500 to-violet-500",
    performance: "99.2%",
  },
  {
    name: "Compliance Monitor",
    description:
      "Ensures all trading activities comply with regulatory requirements and internal policies using AI oversight.",
    capabilities: ["Regulatory Compliance", "Policy Monitoring", "Audit Trail"],
    status: "Active",
    color: "from-orange-500 to-yellow-500",
    performance: "100%",
  },
  {
    name: "Research Assistant",
    description:
      "Conducts comprehensive research on companies, sectors, and economic indicators with deep learning insights.",
    capabilities: ["Company Analysis", "Sector Research", "Economic Data"],
    status: "Active",
    color: "from-indigo-500 to-blue-500",
    performance: "97.8%",
  },
]

export function AgentShowcase() {
  return (
    <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1200&text=AI+Agents+Working+Together')",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 neon-text">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI Agent Team
            </span>
          </h2>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto mb-8">
            Each agent specializes in different aspects of financial analysis and management, working together in
            perfect harmony to provide <span className="text-cyan-400 font-semibold">comprehensive intelligence</span>.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white glow-effect hover:scale-105 transition-all duration-300"
          >
            <Link href="/agents" className="flex items-center gap-3">
              <Zap className="h-5 w-5" />
              Try Interactive Demos
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <Card
              key={index}
              className="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-cyan-500/30 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:-translate-y-3 backdrop-blur-sm electric-border"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${agent.color} flex items-center justify-center group-hover:scale-110 transition-all duration-300 glow-effect`}
                  >
                    <Bot className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-400/30 pulse-glow">
                      <Activity className="h-3 w-3 mr-1 animate-pulse" />
                      {agent.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs">
                      <Cpu className="h-3 w-3 text-cyan-400" />
                      <span className="text-cyan-300">{agent.performance}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-white group-hover:text-cyan-100 transition-colors">
                  {agent.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-cyan-200/80 mb-6 leading-relaxed group-hover:text-cyan-100/90 transition-colors">
                  {agent.description}
                </CardDescription>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-cyan-200">Neural Capabilities:</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities.map((capability, capIndex) => (
                      <Badge
                        key={capIndex}
                        variant="outline"
                        className="text-xs border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200 transition-all duration-300"
                      >
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
