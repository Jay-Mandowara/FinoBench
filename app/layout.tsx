import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { BackgroundEffects } from "@/components/background-effects"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FinTech AI - Advanced Financial Intelligence",
  description:
    "Harness the power of multiple AI agents for comprehensive financial analysis, risk management, and investment optimization.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundEffects />
        <Header />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
