"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Loader2, PieChart, Target } from "lucide-react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

interface OptimizationResult {
  currentAllocation: { asset: string; current: number; optimal: number; change: number; color: string }[]
  expectedReturn: number
  expectedRisk: number
  sharpeRatio: number
  rebalanceActions: string[]
  optimizationScore: number
  performanceProjection: { year: number; conservative: number; moderate: number; aggressive: number }[]
  efficientFrontier: { risk: number; return: number }[]
}

export function PortfolioOptimizerAgent() {
  const [riskTolerance, setRiskTolerance] = useState("")
  const [timeHorizon, setTimeHorizon] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<OptimizationResult | null>(null)

  const generateOptimizationData = () => {
    const performanceProjection = []
    for (let i = 1; i <= 10; i++) {
      performanceProjection.push({
        year: i,
        conservative: 100000 * Math.pow(1.05, i),
        moderate: 100000 * Math.pow(1.08, i),
        aggressive: 100000 * Math.pow(1.12, i),
      })
    }

    const efficientFrontier = []
    for (let i = 0; i <= 20; i++) {
      const risk = i * 0.5
      const returnValue = Math.sqrt(risk) * 3 + Math.random() * 2
      efficientFrontier.push({ risk, return: returnValue })
    }

    return { performanceProjection, efficientFrontier }
  }

  const optimizePortfolio = async () => {
    if (!riskTolerance.trim() || !timeHorizon.trim()) return

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const { performanceProjection, efficientFrontier } = generateOptimizationData()

    const mockResult: OptimizationResult = {
      currentAllocation: [
        { asset: "US Stocks", current: 60, optimal: 55, change: -5, color: "#3b82f6" },
        { asset: "International Stocks", current: 20, optimal: 25, change: 5, color: "#10b981" },
        { asset: "Bonds", current: 15, optimal: 15, change: 0, color: "#f59e0b" },
        { asset: "REITs", current: 3, optimal: 3, change: 0, color: "#ef4444" },
        { asset: "Commodities", current: 2, optimal: 2, change: 0, color: "#8b5cf6" },
      ],
      expectedReturn: Math.random() * 5 + 7,
      expectedRisk: Math.random() * 5 + 12,
      sharpeRatio: Math.random() * 0.5 + 1.2,
      rebalanceActions: [
        "Reduce US stock allocation by 5% to decrease concentration risk",
        "Increase international exposure by 5% for better diversification",
        "Maintain current bond allocation as it aligns with risk profile",
        "Consider adding emerging market exposure for growth potential",
        "Review and rebalance quarterly to maintain optimal allocation",
      ],
      optimizationScore: Math.floor(Math.random() * 20) + 80,
      performanceProjection,
      efficientFrontier,
    }

    setResult(mockResult)
    setLoading(false)
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getChangeSymbol = (change: number) => {
    if (change > 0) return "+"
    return ""
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Risk tolerance (1-10)"
          value={riskTolerance}
          onChange={(e) => setRiskTolerance(e.target.value)}
          type="number"
          min="1"
          max="10"
        />
        <Input
          placeholder="Time horizon (years)"
          value={timeHorizon}
          onChange={(e) => setTimeHorizon(e.target.value)}
          type="number"
          min="1"
        />
      </div>

      <Button
        onClick={optimizePortfolio}
        disabled={loading || !riskTolerance.trim() || !timeHorizon.trim()}
        className="w-full"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Target className="h-4 w-4 mr-2" />}
        Optimize Portfolio
      </Button>

      {result && (
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Portfolio Optimization</h3>
                  <Badge className="bg-blue-100 text-blue-800">Score: {result.optimizationScore}%</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Expected Return</p>
                    <p className="font-semibold text-green-600">{result.expectedReturn.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Risk</p>
                    <p className="font-semibold text-orange-600">{result.expectedRisk.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sharpe Ratio</p>
                    <p className="font-semibold">{result.sharpeRatio.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <PieChart className="h-4 w-4 text-blue-600" />
                    <p className="text-sm font-medium">Asset Allocation Changes</p>
                  </div>
                  <div className="space-y-2">
                    {result.currentAllocation.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm font-medium">{item.asset}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{item.current}%</span>
                          <span className="text-sm">→</span>
                          <span className="text-sm font-medium">{item.optimal}%</span>
                          <span className={`text-sm font-medium ${getChangeColor(item.change)}`}>
                            ({getChangeSymbol(item.change)}
                            {item.change}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Rebalancing Actions:</p>
                  <ul className="space-y-1">
                    {result.rebalanceActions.map((action, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Asset Allocation Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Optimal Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  allocation: {
                    label: "Allocation %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={result.currentAllocation}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="optimal"
                      label={({ asset, optimal }) => `${asset}: ${optimal}%`}
                    >
                      {result.currentAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Performance Projection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">10-Year Performance Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  conservative: {
                    label: "Conservative (5%)",
                    color: "hsl(var(--chart-1))",
                  },
                  moderate: {
                    label: "Moderate (8%)",
                    color: "hsl(var(--chart-2))",
                  },
                  aggressive: {
                    label: "Aggressive (12%)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.performanceProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="conservative" stroke="var(--color-conservative)" strokeWidth={2} />
                    <Line type="monotone" dataKey="moderate" stroke="var(--color-moderate)" strokeWidth={2} />
                    <Line type="monotone" dataKey="aggressive" stroke="var(--color-aggressive)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Efficient Frontier */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Efficient Frontier</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  return: {
                    label: "Expected Return (%)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.efficientFrontier}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="risk" label={{ value: "Risk (%)", position: "insideBottom", offset: -5 }} />
                    <YAxis label={{ value: "Return (%)", angle: -90, position: "insideLeft" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="return"
                      stroke="var(--color-return)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-return)", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
