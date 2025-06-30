"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Loader2, Brain, Cpu, Database, Zap, Activity, TrendingUp } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"

interface AdvancedAnalysisResult {
  symbol: string
  neuralConfidence: number
  reinforcementScore: number
  deepLearningInsights: {
    patternRecognition: number
    sentimentAnalysis: number
    volumeAnalysis: number
    technicalSignals: number
  }
  trainingMetrics: {
    datasetSize: string
    modelAccuracy: number
    backtestResults: number
    realTimePerformance: number
  }
  multiModalAnalysis: {
    textualSentiment: number
    imagePatterns: number
    audioSignals: number
    socialMedia: number
  }
  reinforcementActions: {
    action: string
    confidence: number
    expectedReward: number
    riskAdjustedReturn: number
    reasoning: string
  }[]
  marketPrediction: {
    direction: string
    priceTarget: number
    timeHorizon: string
    keyFactors: string[]
  }
  riskAssessment: {
    overallRisk: string
    volatilityForecast: number
    maxDrawdown: number
    confidenceInterval: number
  }
  neuralNetworkLayers: {
    layer: string
    neurons: number
    activation: number
    gradient: number
  }[]
  predictionHorizon: {
    timeframe: string
    prediction: number
    confidence: number
    volatility: number
  }[]
  timestamp: string
  modelVersion: string
  processingTime: string
}

export function AdvancedMarketAgent() {
  const [symbol, setSymbol] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AdvancedAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeWithDeepRL = async () => {
    if (!symbol.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/agents/advanced-market", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol: symbol.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze market data")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-400"
    if (confidence >= 80) return "text-yellow-400"
    return "text-red-400"
  }

  const getActionColor = (action: string) => {
    switch (action.toUpperCase()) {
      case "STRONG_BUY":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "BUY":
        return "bg-blue-500/20 text-blue-400 border-blue-400/30"
      case "HOLD":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
      case "SELL":
        return "bg-orange-500/20 text-orange-400 border-orange-400/30"
      case "STRONG_SELL":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
    }
  }

  const getDirectionColor = (direction: string) => {
    switch (direction.toLowerCase()) {
      case "bullish":
        return "text-green-400"
      case "bearish":
        return "text-red-400"
      default:
        return "text-yellow-400"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "high":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Enter symbol for deep RL analysis (e.g., AAPL, TSLA)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && analyzeWithDeepRL()}
          className="bg-slate-800/50 border-cyan-500/30 text-white"
        />
        <Button
          onClick={analyzeWithDeepRL}
          disabled={loading || !symbol.trim()}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
          {loading ? "Analyzing..." : "Deep Analysis"}
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
          {/* Main Analysis Card */}
          <Card className="bg-slate-800/50 border-cyan-500/30 electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center glow-effect">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                Deep RL Analysis: {result.symbol}
                <Badge className="bg-green-500/20 text-green-400 border-green-400/30 ml-auto">
                  {result.modelVersion}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 neon-text">
                    {result.neuralConfidence.toFixed(1)}%
                  </div>
                  <div className="text-sm text-cyan-300">Neural Confidence</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{result.reinforcementScore.toFixed(3)}</div>
                  <div className="text-sm text-green-300">RL Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{result.trainingMetrics.datasetSize}</div>
                  <div className="text-sm text-blue-300">Training Data</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {result.trainingMetrics.modelAccuracy.toFixed(1)}%
                  </div>
                  <div className="text-sm text-purple-300">Model Accuracy</div>
                </div>
              </div>

              {/* Market Prediction */}
              <div className="mb-6 bg-slate-700/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Market Prediction
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Direction</div>
                    <div className={`font-semibold capitalize ${getDirectionColor(result.marketPrediction.direction)}`}>
                      {result.marketPrediction.direction}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Price Target</div>
                    <div className="font-semibold text-green-400">
                      ${result.marketPrediction.priceTarget.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Time Horizon</div>
                    <div className="font-semibold text-blue-400">{result.marketPrediction.timeHorizon}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Risk Level</div>
                    <div className={`font-semibold capitalize ${getRiskColor(result.riskAssessment.overallRisk)}`}>
                      {result.riskAssessment.overallRisk}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm text-gray-400 mb-2">Key Factors:</div>
                  <div className="flex flex-wrap gap-2">
                    {result.marketPrediction.keyFactors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-cyan-500/40 text-cyan-300">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deep Learning Insights */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-cyan-400" />
                  Deep Learning Insights
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(result.deepLearningInsights).map(([key, value]) => (
                    <div key={key} className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cyan-200 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className={`font-semibold ${getConfidenceColor(value)}`}>{value.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-Modal Analysis */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5 text-green-400" />
                  Multi-Modal Analysis
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(result.multiModalAnalysis).map(([key, value]) => (
                    <div key={key} className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-200 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className={`font-semibold ${getConfidenceColor(value)}`}>{value.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reinforcement Learning Actions */}
          <Card className="bg-slate-800/50 border-green-500/30 electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Zap className="h-5 w-5 text-green-400" />
                Reinforcement Learning Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.reinforcementActions.map((action, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getActionColor(action.action)}>{action.action.replace(/_/g, " ")}</Badge>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-cyan-300">
                          Confidence:{" "}
                          <span className={getConfidenceColor(action.confidence)}>{action.confidence.toFixed(1)}%</span>
                        </span>
                        <span className="text-green-300">
                          Expected Return:{" "}
                          <span className="text-green-400">{(action.expectedReward * 100).toFixed(2)}%</span>
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-400 mb-1">AI Reasoning:</div>
                      <div className="text-sm text-cyan-200">{action.reasoning}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Risk-Adjusted Return</div>
                        <div className="text-lg font-semibold text-blue-400">
                          {(action.riskAdjustedReturn * 100).toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Action Strength</div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full"
                            style={{ width: `${action.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Neural Network Architecture */}
          <Card className="bg-slate-800/50 border-purple-500/30 electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Activity className="h-5 w-5 text-purple-400" />
                Neural Network Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.neuralNetworkLayers.map((layer, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{layer.layer}</span>
                      <span className="text-sm text-purple-300">{layer.neurons.toLocaleString()} neurons</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Activation Level</div>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                              style={{ width: `${layer.activation * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-purple-400">{(layer.activation * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Gradient Flow</div>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
                              style={{ width: `${layer.gradient * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-cyan-400">{(layer.gradient * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prediction Horizon */}
          <Card className="bg-slate-800/50 border-blue-500/30 electric-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Multi-Horizon Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  prediction: {
                    label: "Price Change %",
                    color: "hsl(var(--chart-1))",
                  },
                  confidence: {
                    label: "Confidence %",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.predictionHorizon}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="timeframe" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="prediction"
                      stroke="var(--color-prediction)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-prediction)", strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="confidence"
                      stroke="var(--color-confidence)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {result.predictionHorizon.map((pred, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-400 mb-1">{pred.timeframe}</div>
                    <div className={`text-lg font-bold ${pred.prediction >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {pred.prediction >= 0 ? "+" : ""}
                      {pred.prediction.toFixed(2)}%
                    </div>
                    <div className="text-xs text-cyan-300">{pred.confidence.toFixed(1)}% confidence</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center text-sm text-gray-400">
                Processing Time: {result.processingTime} | Last Updated: {new Date(result.timestamp).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
