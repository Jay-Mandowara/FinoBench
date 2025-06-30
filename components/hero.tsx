import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, TrendingUp, Shield, Zap, Sparkles, Activity } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-blue-950 to-black text-white pt-20 min-h-screen flex items-center">
      {/* Static Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32 z-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-cyan-400/30 glow-effect">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-400 animate-pulse" />
                <span className="text-sm text-cyan-100">Neural Networks Active</span>
              </div>
              <div className="w-px h-4 bg-cyan-400/50"></div>
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-cyan-100">6 AI Agents Online</span>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-white">The Future of</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent neon-text float-animation">
              Financial Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 text-cyan-100 max-w-4xl mx-auto leading-relaxed">
            Harness the power of <span className="text-cyan-400 font-semibold">multiple AI agents</span> working in
            perfect harmony to revolutionize your financial operations, risk management, and investment strategies with{" "}
            <span className="text-blue-400 font-semibold">lightning-fast precision</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg px-10 py-6 glow-effect hover:scale-105 transition-all duration-300"
            >
              <Link href="/agents" className="flex items-center gap-3">
                <Zap className="h-6 w-6" />
                Launch AI Agents
                <ArrowRight className="h-6 w-6" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-300 text-lg px-10 py-6 pulse-glow hover:scale-105 transition-all duration-300 bg-transparent"
            >
              <Sparkles className="h-6 w-6 mr-3" />
              Watch Live Demo
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="group bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 electric-border">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-cyan-100 group-hover:text-white transition-colors">
                  Real-time Analysis
                </span>
              </div>
              <p className="text-sm text-cyan-200/80">Lightning-fast market insights</p>
            </div>

            <div className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 electric-border">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-blue-100 group-hover:text-white transition-colors">
                  Risk Management
                </span>
              </div>
              <p className="text-sm text-blue-200/80">Advanced protection algorithms</p>
            </div>

            <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 electric-border">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-purple-100 group-hover:text-white transition-colors">
                  AI-Powered Insights
                </span>
              </div>
              <p className="text-sm text-purple-200/80">Neural network intelligence</p>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">99.9%</div>
              <div className="text-sm text-cyan-200/80">Uptime</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors">50K+</div>
              <div className="text-sm text-green-200/80">Active Users</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                &lt;10ms
              </div>
              <div className="text-sm text-blue-200/80">Response Time</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                $2.8B
              </div>
              <div className="text-sm text-purple-200/80">Assets Managed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
