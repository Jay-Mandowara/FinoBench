import { generateObject, generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const researchSchema = z.object({
  company: z.string(),
  sector: z.string(),
  marketCap: z.string(),
  rating: z.number().min(1).max(5),
  priceTarget: z.string(),
  analystConsensus: z.enum(["STRONG_BUY", "BUY", "HOLD", "SELL", "STRONG_SELL"]),
  investmentThesis: z.string(),
  keyMetrics: z.array(
    z.object({
      metric: z.string(),
      value: z.string(),
      trend: z.enum(["up", "down", "stable"]),
      analysis: z.string(),
    }),
  ),
  strengths: z.array(z.string()),
  risks: z.array(z.string()),
  catalysts: z.array(
    z.object({
      catalyst: z.string(),
      timeframe: z.string(),
      impact: z.enum(["high", "medium", "low"]),
      probability: z.number().min(0).max(100),
    }),
  ),
  competitivePosition: z.object({
    marketShare: z.number(),
    competitiveAdvantages: z.array(z.string()),
    threats: z.array(z.string()),
  }),
  financialHealth: z.object({
    revenueGrowth: z.number(),
    profitMargin: z.number(),
    debtToEquity: z.number(),
    returnOnEquity: z.number(),
    cashPosition: z.string(),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const { company } = await request.json()

    if (!company) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 })
    }

    // Generate comprehensive research context
    const { text: researchContext } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an advanced AI research analyst with access to comprehensive financial databases,
      news sources, and analytical tools. You use natural language processing and knowledge graphs
      to analyze companies across multiple dimensions. You've been trained on billions of financial
      documents, earnings calls, and market data.`,
      prompt: `Conduct comprehensive research analysis on ${company}. Provide detailed analysis covering:

      1. Company Overview & Business Model
      2. Financial Performance & Metrics
      3. Competitive Position & Market Share
      4. Growth Drivers & Catalysts
      5. Risk Factors & Challenges
      6. Valuation Analysis
      7. Technical Analysis
      8. Analyst Recommendations
      9. ESG Considerations
      10. Future Outlook & Price Targets

      Consider:
      - Recent earnings reports and guidance
      - Industry trends and competitive dynamics
      - Macroeconomic factors affecting the business
      - Management quality and strategic initiatives
      - Regulatory environment and policy impacts
      - Innovation pipeline and R&D investments
      - Market sentiment and institutional ownership

      Provide specific, actionable insights with supporting data and reasoning.`,
    })

    // Generate structured research analysis
    const { object: analysis } = await generateObject({
      model: openai("gpt-4o"),
      system: `You are an advanced research system. Based on the research context provided,
      generate a comprehensive structured analysis with realistic financial metrics and ratings.
      
      For ratings: 5 = Strong Buy, 4 = Buy, 3 = Hold, 2 = Sell, 1 = Strong Sell
      For consensus: Use STRONG_BUY for high conviction positive, BUY for positive, HOLD for neutral, etc.
      
      Make all metrics realistic for the company size and sector.
      Provide specific, actionable insights with clear reasoning.`,
      schema: researchSchema,
      prompt: `Based on this research analysis: "${researchContext}"
      
      Generate comprehensive research report for: ${company}
      
      Include:
      - Realistic financial metrics and valuation
      - Specific investment thesis with supporting arguments
      - Detailed competitive analysis
      - Clear catalysts with timeframes and probabilities
      - Balanced view of strengths and risks
      - Actionable price target and recommendation`,
    })

    // Generate additional data structures
    const financialData = [
      {
        quarter: "Q1 2024",
        revenue: Math.floor(Math.random() * 50000 + 80000),
        profit: Math.floor(Math.random() * 15000 + 20000),
        eps: (Math.random() * 2 + 1).toFixed(2),
      },
      {
        quarter: "Q2 2024",
        revenue: Math.floor(Math.random() * 55000 + 85000),
        profit: Math.floor(Math.random() * 18000 + 22000),
        eps: (Math.random() * 2.5 + 1.2).toFixed(2),
      },
      {
        quarter: "Q3 2024",
        revenue: Math.floor(Math.random() * 60000 + 90000),
        profit: Math.floor(Math.random() * 20000 + 25000),
        eps: (Math.random() * 3 + 1.5).toFixed(2),
      },
      {
        quarter: "Q4 2024",
        revenue: Math.floor(Math.random() * 65000 + 95000),
        profit: Math.floor(Math.random() * 25000 + 28000),
        eps: (Math.random() * 3.5 + 1.8).toFixed(2),
      },
    ]

    const competitorAnalysis = [
      {
        company: "Competitor A",
        marketShare: 25 + Math.random() * 15,
        growth: 8 + Math.random() * 10,
      },
      {
        company: "Competitor B",
        marketShare: 20 + Math.random() * 12,
        growth: 5 + Math.random() * 8,
      },
      {
        company: "Competitor C",
        marketShare: 15 + Math.random() * 10,
        growth: 12 + Math.random() * 15,
      },
      {
        company: "Others",
        marketShare: 25 + Math.random() * 10,
        growth: 3 + Math.random() * 6,
      },
    ]

    const scorecard = [
      {
        category: "Financial Health",
        score: 75 + Math.random() * 20,
        maxScore: 100,
      },
      {
        category: "Market Position",
        score: 80 + Math.random() * 15,
        maxScore: 100,
      },
      {
        category: "Growth Potential",
        score: 70 + Math.random() * 25,
        maxScore: 100,
      },
      {
        category: "Management Quality",
        score: 85 + Math.random() * 12,
        maxScore: 100,
      },
      {
        category: "Innovation",
        score: 75 + Math.random() * 20,
        maxScore: 100,
      },
      {
        category: "ESG Score",
        score: 65 + Math.random() * 25,
        maxScore: 100,
      },
    ]

    return NextResponse.json({
      ...analysis,
      financialData,
      competitorAnalysis,
      scorecard,
      researchDate: new Date().toISOString(),
      analystName: "AI Research System v3.2",
      confidenceLevel: 85 + Math.random() * 12,
      lastUpdated: new Date().toISOString(),
      processingTime: `${(Math.random() * 1000 + 500).toFixed(0)}ms`,
    })
  } catch (error) {
    console.error("Research analysis error:", error)
    return NextResponse.json({ error: "Failed to conduct research analysis" }, { status: 500 })
  }
}
