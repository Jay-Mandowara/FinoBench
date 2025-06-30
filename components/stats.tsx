import { TrendingUp, Users, Zap, Shield, Activity, Cpu, Database, Globe } from "lucide-react"

const stats = [
  {
    icon: TrendingUp,
    value: "99.7%",
    label: "Prediction Accuracy",
    description: "Market trend predictions",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Active Users",
    description: "Financial professionals",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Zap,
    value: "<10ms",
    label: "Response Time",
    description: "Real-time analysis",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Shield,
    value: "100%",
    label: "Compliance Rate",
    description: "Regulatory adherence",
    color: "from-purple-400 to-pink-500",
  },
]

const additionalMetrics = [
  { icon: Activity, label: "Neural Networks", value: "6 Active", color: "text-green-400" },
  { icon: Cpu, label: "Processing Power", value: "2.4 PetaFLOPS", color: "text-cyan-400" },
  { icon: Database, label: "Data Points", value: "1.2B Daily", color: "text-blue-400" },
  { icon: Globe, label: "Global Markets", value: "150+ Covered", color: "text-purple-400" },
]

export function Stats() {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black border-b border-cyan-500/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm electric-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 glow-effect`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors neon-text">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-cyan-300 mb-1 group-hover:text-cyan-200 transition-colors">
                {stat.label}
              </div>
              <div className="text-sm text-cyan-400/80 group-hover:text-cyan-300/90 transition-colors">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Metrics */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-400/30 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-center text-white mb-8 neon-text">
            Real-Time System{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Performance
            </span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalMetrics.map((metric, index) => (
              <div
                key={index}
                className="group text-center hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-3">
                  <metric.icon className={`h-8 w-8 ${metric.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="text-xl font-bold text-white mb-1 group-hover:text-cyan-100 transition-colors">
                  {metric.value}
                </div>
                <div className="text-sm text-cyan-300/80 group-hover:text-cyan-200 transition-colors">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
