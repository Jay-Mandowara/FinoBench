"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"

interface AnalysisResult {
  symbol: string
  trend: "bullish" | "bearish" | "neutral"
  confidence: number
  keyPoints: string[]
  recommendation: string
  targetPrice: string
  riskLevel: "low" | "medium" | "high"
  priceData: { date: string; price: number; volume: number }[]
  technicalIndicators: { name: string; value: number; signal: "buy" | "sell" | "hold" }[]
}

export function MarketAnalysisAgent() {
  const [symbol, setSymbol] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const generateMockPriceData = (basePrice: number) => {
    const data = []
    let price = basePrice
    for (let i = 30; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      price += (Math.random() - 0.5) * 10
      data.push({
        date: date.toISOString().split("T")[0],
        price: Math.max(price, basePrice * 0.8),
        volume: Math.floor(Math.random() * 1000000) + 500000,
      })
    }
    return data
  }

  const analyzeStock = async () => {
    if (!symbol.trim()) return

    setLoading(true)

    // Simulate API call with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const basePrice = Math.random() * 200 + 100

    // Mock analysis result
    const mockResult: AnalysisResult = {
      symbol: symbol.toUpperCase(),
      trend: Math.random() > 0.5 ? "bullish" : Math.random() > 0.3 ? "bearish" : "neutral",
      confidence: Math.floor(Math.random() * 30) + 70,
      keyPoints: [
        "Strong quarterly earnings growth of 15% YoY",
        "Technical indicators show bullish momentum",
        "Sector rotation favoring technology stocks",
        "Institutional buying pressure increasing",
        "Support level holding at $150",
      ],
      recommendation: Math.random() > 0.5 ? "BUY" : Math.random() > 0.3 ? "SELL" : "HOLD",
      targetPrice: `$${(basePrice * (1 + (Math.random() - 0.5) * 0.3)).toFixed(2)}`,
      riskLevel: Math.random() > 0.6 ? "low" : Math.random() > 0.3 ? "medium" : "high",
      priceData: generateMockPriceData(basePrice),
      technicalIndicators: [
        { name: "RSI", value: Math.floor(Math.random() * 40) + 30, signal: Math.random() > 0.5 ? "buy" : "hold" },
        { name: "MACD", value: Math.random() * 2 - 1, signal: Math.random() > 0.5 ? "buy" : "sell" },
        { name: "Moving Avg", value: basePrice * (1 + (Math.random() - 0.5) * 0.1), signal: "buy" },
      ],
    }

    setResult(mockResult)
    setLoading(false)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "bullish":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "bearish":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "bullish":
        return "bg-green-100 text-green-800"
      case "bearish":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "buy":
        return "text-green-600"
      case "sell":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && analyzeStock()}
        />
        <Button onClick={analyzeStock} disabled={loading || !symbol.trim()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}
        </Button>
      </div>

      {result && (
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{result.symbol} Analysis</h3>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(result.trend)}
                    <Badge className={getTrendColor(result.trend)}>{result.trend.toUpperCase()}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Confidence</p>
                    <p className="font-semibold">{result.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Target Price</p>
                    <p className="font-semibold">{result.targetPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Recommendation</p>
                    <Badge variant="outline">{result.recommendation}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Risk Level</p>
                    <Badge className={getRiskColor(result.riskLevel)}>{result.riskLevel.toUpperCase()}</Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Key Analysis Points:</p>
                  <ul className="space-y-1">
                    {result.keyPoints.map((point, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">30-Day Price Movement</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  price: {
                    label: "Price",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.priceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="var(--color-price)"
                      fill="var(--color-price)"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Technical Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Technical Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.technicalIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{indicator.name}</p>
                      <p className="text-sm text-gray-600">
                        Value: {typeof indicator.value === "number" ? indicator.value.toFixed(2) : indicator.value}
                      </p>
                    </div>
                    <Badge className={`${getSignalColor(indicator.signal)} bg-transparent border`}>
                      {indicator.signal.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
