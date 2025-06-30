"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Loader2, Search, Star, TrendingUp, Building } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface ResearchResult {
  company: string
  sector: string
  marketCap: string
  rating: number
  priceTarget: string
  keyMetrics: { metric: string; value: string; trend: "up" | "down" | "stable" }[]
  strengths: string[]
  risks: string[]
  analystConsensus: string
  investmentThesis: string
  financialData: { quarter: string; revenue: number; profit: number; eps: number }[]
  competitorAnalysis: { company: string; marketShare: number; growth: number }[]
  scorecard: { category: string; score: number; maxScore: number }[]
}

export function ResearchAgent() {
  const [company, setCompany] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResearchResult | null>(null)

  const generateResearchData = () => {
    const financialData = [
      { quarter: "Q1 2023", revenue: 95000, profit: 23000, eps: 1.45 },
      { quarter: "Q2 2023", revenue: 98000, profit: 24500, eps: 1.52 },
      { quarter: "Q3 2023", revenue: 102000, profit: 26000, eps: 1.61 },
      { quarter: "Q4 2023", revenue: 108000, profit: 28500, eps: 1.75 },
    ]

    const competitorAnalysis = [
      { company: "Company A", marketShare: 35, growth: 12 },
      { company: "Company B", marketShare: 28, growth: 8 },
      { company: "Company C", marketShare: 22, growth: 15 },
      { company: "Others", marketShare: 15, growth: 5 },
    ]

    const scorecard = [
      { category: "Financial Health", score: 85, maxScore: 100 },
      { category: "Market Position", score: 92, maxScore: 100 },
      { category: "Growth Potential", score: 78, maxScore: 100 },
      { category: "Management Quality", score: 88, maxScore: 100 },
      { category: "Innovation", score: 82, maxScore: 100 },
      { category: "ESG Score", score: 75, maxScore: 100 },
    ]

    return { financialData, competitorAnalysis, scorecard }
  }

  const researchCompany = async () => {
    if (!company.trim()) return

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3500))

    const { financialData, competitorAnalysis, scorecard } = generateResearchData()

    const mockResult: ResearchResult = {
      company: company.toUpperCase(),
      sector: "Technology",
      marketCap: "$2.8T",
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      priceTarget: `$${(Math.random() * 50 + 150).toFixed(2)}`,
      keyMetrics: [
        { metric: "P/E Ratio", value: "28.5", trend: "stable" },
        { metric: "Revenue Growth", value: "15.2%", trend: "up" },
        { metric: "Profit Margin", value: "23.1%", trend: "up" },
        { metric: "ROE", value: "31.4%", trend: "stable" },
        { metric: "Debt/Equity", value: "0.18", trend: "down" },
      ],
      strengths: [
        "Strong brand recognition and customer loyalty",
        "Diversified revenue streams across multiple products",
        "Robust cash flow generation and balance sheet",
        "Leading market position in core segments",
        "Strong R&D capabilities and innovation pipeline",
      ],
      risks: [
        "Regulatory scrutiny and potential antitrust actions",
        "Intense competition in key markets",
        "Dependence on key product lines for revenue",
        "Currency exchange rate fluctuations",
        "Economic slowdown impact on consumer spending",
      ],
      analystConsensus: "BUY",
      investmentThesis:
        "Strong fundamentals, market leadership, and growth prospects make this an attractive long-term investment despite near-term headwinds.",
      financialData,
      competitorAnalysis,
      scorecard,
    }

    setResult(mockResult)
    setLoading(false)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />
      default:
        return <div className="h-3 w-3 bg-gray-400 rounded-full" />
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter company name or ticker"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && researchCompany()}
        />
        <Button onClick={researchCompany} disabled={loading || !company.trim()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {result && (
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      {result.company}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {result.sector} • {result.marketCap}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">{renderStars(result.rating)}</div>
                    <Badge className="bg-green-100 text-green-800">{result.analystConsensus}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Price Target</p>
                    <p className="font-semibold text-green-600">{result.priceTarget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Analyst Rating</p>
                    <p className="font-semibold">{result.rating}/5 Stars</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Key Metrics</p>
                  <div className="space-y-2">
                    {result.keyMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{metric.metric}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{metric.value}</span>
                          {getTrendIcon(metric.trend)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-green-700 mb-2">Key Strengths</p>
                    <ul className="space-y-1">
                      {result.strengths.map((strength, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-green-600 mt-1">+</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-red-700 mb-2">Key Risks</p>
                    <ul className="space-y-1">
                      {result.risks.map((risk, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-red-600 mt-1">-</span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-1">Investment Thesis</p>
                  <p className="text-sm text-blue-800">{result.investmentThesis}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quarterly Financial Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue (M)",
                    color: "hsl(var(--chart-1))",
                  },
                  profit: {
                    label: "Profit (M)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
                    <Bar dataKey="profit" fill="var(--color-profit)" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Company Scorecard Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Company Scorecard</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: "Score",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={result.scorecard}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="var(--color-score)"
                      fill="var(--color-score)"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Competitor Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Competitive Landscape</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  marketShare: {
                    label: "Market Share (%)",
                    color: "hsl(var(--chart-1))",
                  },
                  growth: {
                    label: "Growth Rate (%)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.competitorAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="company" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="marketShare" fill="var(--color-marketShare)" name="Market Share %" />
                    <Bar dataKey="growth" fill="var(--color-growth)" name="Growth Rate %" />
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
