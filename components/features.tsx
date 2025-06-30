import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, TrendingUp, Shield, Zap, BarChart3, Users, Clock, Target, Lightbulb } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Multi-Agent Intelligence",
    description:
      "Deploy specialized AI agents that work together to analyze markets, assess risks, and optimize portfolios with unprecedented accuracy.",
    color: "from-purple-400 to-pink-500",
    glowColor: "purple-400",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description:
      "Leverage advanced machine learning models to forecast market trends and identify profitable opportunities before they emerge.",
    color: "from-green-400 to-emerald-500",
    glowColor: "green-400",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description:
      "Comprehensive risk analysis powered by AI agents that continuously monitor and evaluate potential threats to your investments.",
    color: "from-red-400 to-rose-500",
    glowColor: "red-400",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description:
      "Lightning-fast data processing and decision-making capabilities that keep you ahead of market movements.",
    color: "from-yellow-400 to-orange-500",
    glowColor: "yellow-400",
  },
  {
    icon: BarChart3,
    title: "Portfolio Optimization",
    description:
      "AI-driven portfolio management that automatically rebalances and optimizes your investments for maximum returns.",
    color: "from-blue-400 to-cyan-500",
    glowColor: "blue-400",
  },
  {
    icon: Users,
    title: "Collaborative Agents",
    description:
      "Multiple AI agents working in coordination to provide comprehensive financial insights and recommendations.",
    color: "from-indigo-400 to-purple-500",
    glowColor: "indigo-400",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description:
      "Round-the-clock market surveillance and automated alerts to ensure you never miss critical opportunities.",
    color: "from-orange-400 to-red-500",
    glowColor: "orange-400",
  },
  {
    icon: Target,
    title: "Precision Trading",
    description:
      "Execute trades with surgical precision using AI agents trained on vast amounts of market data and patterns.",
    color: "from-pink-400 to-rose-500",
    glowColor: "pink-400",
  },
  {
    icon: Lightbulb,
    title: "Strategic Insights",
    description:
      "Generate actionable insights and strategic recommendations based on comprehensive market analysis and trend prediction.",
    color: "from-cyan-400 to-blue-500",
    glowColor: "cyan-400",
  },
]

export function Features() {
  return (
    <section className="py-24 bg-gradient-to-br from-black via-blue-950 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1200&text=AI+Network+Visualization')",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 neon-text">
            Powerful AI Agent{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Capabilities
            </span>
          </h2>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
            Our suite of specialized AI agents work together to provide comprehensive financial intelligence and
            automated decision-making capabilities with{" "}
            <span className="text-cyan-400 font-semibold">neural precision</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm electric-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 glow-effect`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-white group-hover:text-cyan-100 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-cyan-200/80 leading-relaxed group-hover:text-cyan-100/90 transition-colors">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
