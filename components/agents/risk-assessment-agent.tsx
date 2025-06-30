"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Loader2, AlertTriangle, Shield, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface RiskAssessment {
  portfolioValue: string
  var95: string
  var99: string
  sharpeRatio: number
  maxDrawdown: string
  riskScore: number
  riskLevel: "low" | "medium" | "high"
  recommendations: string[]
  diversificationScore: number
  riskBreakdown: { category: string; risk: number; color: string }[]
  historicalVaR: { date: string; var95: number; var99: number }[]
}

export function RiskAssessmentAgent() {
  const [portfolioValue, setPortfolioValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<RiskAssessment | null>(null)

  const generateRiskData = (value: number) => {
    const riskBreakdown = [
      { category: "Market Risk", risk: Math.floor(Math.random() * 30) + 20, color: "#ef4444" },
      { category: "Credit Risk", risk: Math.floor(Math.random() * 20) + 10, color: "#f97316" },
      { category: "Liquidity Risk", risk: Math.floor(Math.random() * 15) + 5, color: "#eab308" },
      { category: "Operational Risk", risk: Math.floor(Math.random() * 10) + 5, color: "#22c55e" },
      { category: "Currency Risk", risk: Math.floor(Math.random() * 15) + 5, color: "#3b82f6" },
    ]

    const historicalVaR = []
    for (let i = 30; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      historicalVaR.push({
        date: date.toISOString().split("T")[0],
        var95: value * (0.04 + Math.random() * 0.02),
        var99: value * (0.07 + Math.random() * 0.03),
      })
    }

    return { riskBreakdown, historicalVaR }
  }

  const assessRisk = async () => {
    if (!portfolioValue.trim()) return

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const value = Number.parseFloat(portfolioValue)
    const { riskBreakdown, historicalVaR } = generateRiskData(value)

    const mockResult: RiskAssessment = {
      portfolioValue: `$${value.toLocaleString()}`,
      var95: `$${(value * 0.05).toLocaleString()}`,
      var99: `$${(value * 0.08).toLocaleString()}`,
      sharpeRatio: Math.random() * 2 + 0.5,
      maxDrawdown: `${(Math.random() * 20 + 5).toFixed(1)}%`,
      riskScore: Math.floor(Math.random() * 40) + 30,
      riskLevel: Math.random() > 0.6 ? "low" : Math.random() > 0.3 ? "medium" : "high",
      recommendations: [
        "Consider increasing bond allocation to reduce volatility",
        "Diversify across more sectors to minimize concentration risk",
        "Implement stop-loss orders for high-risk positions",
        "Review correlation between holdings to improve diversification",
        "Consider adding defensive stocks during market uncertainty",
      ],
      diversificationScore: Math.floor(Math.random() * 30) + 70,
      riskBreakdown,
      historicalVaR,
    }

    setResult(mockResult)
    setLoading(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <Shield className="h-4 w-4 text-green-600" />
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter portfolio value (e.g., 100000)"
          value={portfolioValue}
          onChange={(e) => setPortfolioValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && assessRisk()}
          type="number"
        />
        <Button onClick={assessRisk} disabled={loading || !portfolioValue.trim()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Assess Risk"}
        </Button>
      </div>

      {result && (
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Risk Assessment Report</h3>
                  <div className="flex items-center gap-2">
                    {getRiskIcon(result.riskLevel)}
                    <Badge className={getRiskColor(result.riskLevel)}>{result.riskLevel.toUpperCase()} RISK</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Portfolio Value</p>
                    <p className="font-semibold">{result.portfolioValue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Risk Score</p>
                    <p className="font-semibold">{result.riskScore}/100</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">VaR (95%)</p>
                    <p className="font-semibold text-red-600">{result.var95}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">VaR (99%)</p>
                    <p className="font-semibold text-red-600">{result.var99}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sharpe Ratio</p>
                    <p className="font-semibold">{result.sharpeRatio.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Max Drawdown</p>
                    <p className="font-semibold">{result.maxDrawdown}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <p className="text-sm font-medium">Diversification Score: {result.diversificationScore}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${result.diversificationScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Risk Management Recommendations:</p>
                  <ul className="space-y-1">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Breakdown Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risk Breakdown by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer
                  config={{
                    risk: {
                      label: "Risk Level",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={result.riskBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="risk"
                        label={({ category, risk }) => `${category}: ${risk}%`}
                      >
                        {result.riskBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>

                <div className="space-y-2">
                  {result.riskBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium">{item.category}</span>
                      </div>
                      <span className="text-sm font-semibold">{item.risk}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historical VaR Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Historical Value at Risk (30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  var95: {
                    label: "VaR 95%",
                    color: "hsl(var(--chart-1))",
                  },
                  var99: {
                    label: "VaR 99%",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.historicalVaR}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="var95" fill="var(--color-var95)" name="VaR 95%" />
                    <Bar dataKey="var99" fill="var(--color-var99)" name="VaR 99%" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
