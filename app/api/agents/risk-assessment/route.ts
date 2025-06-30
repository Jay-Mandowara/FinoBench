import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const riskAssessmentSchema = z.object({
  riskScore: z.number().min(0).max(100),
  riskLevel: z.enum(["low", "medium", "high"]),
  var95: z.number(),
  var99: z.number(),
  sharpeRatio: z.number(),
  maxDrawdown: z.number(),
  diversificationScore: z.number().min(0).max(100),
  recommendations: z.array(z.string()),
})

export async function POST(request: NextRequest) {
  try {
    const { portfolioValue, assets } = await request.json()

    if (!portfolioValue) {
      return NextResponse.json({ error: "Portfolio value is required" }, { status: 400 })
    }

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      system: `You are a risk management specialist. Analyze portfolio risk metrics and provide 
      comprehensive risk assessment including VaR calculations, diversification analysis, and 
      actionable risk management recommendations.`,
      schema: riskAssessmentSchema,
      prompt: `Analyze a portfolio with value $${portfolioValue} and provide:
      1. Overall risk score (0-100)
      2. Risk level classification
      3. Value at Risk (95% and 99% confidence)
      4. Sharpe ratio estimation
      5. Maximum drawdown estimate
      6. Diversification score
      7. Risk management recommendations
      
      Consider current market conditions and provide realistic estimates.`,
    })

    return NextResponse.json({
      portfolioValue: `$${Number.parseFloat(portfolioValue).toLocaleString()}`,
      var95: `$${((Number.parseFloat(portfolioValue) * object.var95) / 100).toLocaleString()}`,
      var99: `$${((Number.parseFloat(portfolioValue) * object.var99) / 100).toLocaleString()}`,
      sharpeRatio: object.sharpeRatio,
      maxDrawdown: `${object.maxDrawdown}%`,
      riskScore: object.riskScore,
      riskLevel: object.riskLevel,
      diversificationScore: object.diversificationScore,
      recommendations: object.recommendations,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Risk assessment error:", error)
    return NextResponse.json({ error: "Failed to assess portfolio risk" }, { status: 500 })
  }
}
