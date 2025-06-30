"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Loader2, Shield, Atom, Cpu, AlertTriangle, Activity } from "lucide-react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"

interface QuantumRiskResult {
  portfolioValue: string
  quantumRiskScore: number
  quantumEntanglement: number
  superpositionStates: {
    state: string
    probability: number
    riskLevel: number
    expectedReturn: number
    description: string
  }[]
  quantumMetrics: {
    coherenceTime: number
    decoherenceRate: number
    quantumAdvantage: number
    errorCorrection: number
  }
  riskRecommendations: string[]
  overallAssessment: string
  hedgingStrategies: {
    strategy: string
    effectiveness: number
    cost: number
    description: string
  }[]
  riskDimensions: {
    dimension: string
    quantumRisk: number
    classicalRisk: number
    advantage: number
  }[]
  var95: string
  var99: string
  timestamp: string
  quantumProcessor: string
  processingTime: string
}

export function QuantumRiskAgent() {
  const [portfolioValue, setPortfolioValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<QuantumRiskResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeQuantumRisk = async () => {
    if (!portfolioValue.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/agents/quantum-risk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ portfolioValue: portfolioValue.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze quantum risk")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getQuantumColor = (value: number) => {
    if (value >= 90) return "text-cyan-400"
    if (value >= 80) return "text-blue-400"
    if (value >= 70) return "text-purple-400"
    return "text-pink-400"
  }

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 80) return "text-green-400"
    if (effectiveness >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Portfolio value for quantum analysis (e.g., 1000000)"
          value={portfolioValue}
          onChange={(e) => setPortfolioValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && analyzeQuantumRisk()}
          className="bg-slate-800/50 border-purple-500/30 text-white"
          type="number"
        />
        <Button
          onClick={analyzeQuantumRisk}
          disabled={loading || !portfolioValue.trim()}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Atom className="h-4 w-4" />}
          {loading ? "Computing..." : "Quantum Analysis"}
        </Button>
      </div>

      {error && (
        <Card className="bg-red-900/20 border-red-500/30">
          <CardContent className="pt-6">
            <p className="text-red-400">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="space-y-6">
          {/* Quantum Overview */}
          <Card className="bg-slate-800/50 border-purple-500/30 electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center glow-effect">
                  <Atom className="h-6 w-6 text-white" />
                </div>
                Quantum Risk Analysis
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/30 ml-auto">
                  {result.quantumProcessor}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 neon-text">
                    {result.quantumRiskScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-purple-300">Quantum Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{result.quantumEntanglement.toFixed(3)}</div>
                  <div className="text-sm text-cyan-300">Entanglement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">
                    {result.quantumMetrics.coherenceTime.toFixed(0)}μs
                  </div>
                  <div className="text-sm text-pink-300">Coherence Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {result.quantumMetrics.quantumAdvantage.toFixed(1)}%
                  </div>
                  <div className="text-sm text-blue-300">Quantum Advantage</div>
                </div>
              </div>

              <div className="mb-6 bg-slate-700/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Risk Assessment</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-400">VaR (95%)</div>
                    <div className="text-lg font-semibold text-red-400">{result.var95}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">VaR (99%)</div>
                    <div className="text-lg font-semibold text-red-500">{result.var99}</div>
                  </div>
                </div>
                <div className="text-sm text-cyan-200">{result.overallAssessment}</div>
              </div>

              {/* Quantum Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(result.quantumMetrics).map(([key, value]) => (
                  <div key={key} className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-200 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className={`font-semibold ${getQuantumColor(typeof value === "number" ? value : 0)}`}>
                        {typeof value === "number"
                          ? key === "coherenceTime"
                            ? `${value.toFixed(0)}μs`
                            : key === "decoherenceRate"
                              ? `${(value * 100).toFixed(2)}%`
                              : `${value.toFixed(1)}%`
                          : value}
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                        style={{
                          width: `${typeof value === "number" ? (key === "coherenceTime" ? (value / 200) * 100 : value) : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Superposition States */}
          <Card className="bg-slate-800/50 border-cyan-500/30 electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Activity className="h-5 w-5 text-cyan-400" />
                Market Superposition States
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.superpositionStates.map((state, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-white">{state.state}</span>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-400/30">
                        {(state.probability * 100).toFixed(1)}% probability
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-400 mb-1">Description:</div>
                      <div className="text-sm text-cyan-200">{state.description}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Risk Level</div>
                        <div className="text-lg font-semibold text-red-400">{state.riskLevel.toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Expected Return</div>
                        <div
                          className={`text-lg font-semibold ${state.expectedReturn >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {state.expectedReturn >= 0 ? "+" : ""}
                          {(state.expectedReturn * 100).toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Quantum State</div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full animate-pulse"
                            style={{ width: `${state.probability * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Dimensions Radar */}
          <Card className="bg-slate-800/50 border-green-500/30 electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Shield className="h-5 w-5 text-green-400" />
                Quantum vs Classical Risk Dimensions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  quantumRisk: {
                    label: "Quantum Risk",
                    color: "hsl(var(--chart-1))",
                  },
                  classicalRisk: {
                    label: "Classical Risk",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={result.riskDimensions}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 70]}
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                    />
                    <Radar
                      name="Quantum Risk"
                      dataKey="quantumRisk"
                      stroke="var(--color-quantumRisk)"
                      fill="var(--color-quantumRisk)"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Classical Risk"
                      dataKey="classicalRisk"
                      stroke="var(--color-classicalRisk)"
                      fill="var(--color-classicalRisk)"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.riskDimensions.map((dim, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-white">{dim.dimension}</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                        {dim.advantage.toFixed(1)}% advantage
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-purple-300">Quantum: </span>
                        <span className="text-purple-400 font-semibold">{dim.quantumRisk.toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-red-300">Classical: </span>
                        <span className="text-red-400 font-semibold">{dim.classicalRisk.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hedging Strategies */}
          <Card className="bg-slate-800/50 border-yellow-500/30 electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Quantum Hedging Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.hedgingStrategies.map((strategy, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-white">{strategy.strategy}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-green-300">
                          Effectiveness:{" "}
                          <span className={getEffectivenessColor(strategy.effectiveness)}>
                            {strategy.effectiveness.toFixed(1)}%
                          </span>
                        </span>
                        <span className="text-yellow-300">
                          Cost: <span className="text-yellow-400">{(strategy.cost * 100).toFixed(2)}%</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-cyan-200">{strategy.description}</div>
                    <div className="mt-3">
                      <div className="text-xs text-gray-400 mb-1">Strategy Effectiveness</div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-yellow-600 h-2 rounded-full"
                          style={{ width: `${strategy.effectiveness}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Recommendations */}
          <Card className="bg-slate-800/50 border-blue-500/30 electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Cpu className="h-5 w-5 text-blue-400" />
                Quantum Risk Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.riskRecommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <div className="text-sm text-blue-200">{recommendation}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-gray-400">
                Processing Time: {result.processingTime} | Last Updated: {new Date(result.timestamp).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
