"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Menu, X, Zap, TrendingUp, Shield, BarChart3, Sparkles } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: Sparkles },
    { name: "AI Agents", href: "/agents", icon: Bot },
    { name: "Features", href: "/features", icon: Zap },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Security", href: "/security", icon: Shield },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center glow-effect group-hover:scale-110 transition-transform duration-300">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent neon-text">
                FinTech AI
              </span>
              <div className="text-xs text-cyan-300 opacity-80">Neural Network</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className="relative group px-4 py-2 text-cyan-100 hover:text-white hover:bg-cyan-500/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className="h-4 w-4 mr-2 group-hover:text-cyan-400 transition-colors" />
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                </Button>
              </Link>
            ))}
          </nav>

          {/* Status Indicators */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-cyan-300">AI Active</span>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 pulse-glow">
              <TrendingUp className="h-3 w-3 mr-1" />
              Live Trading
            </Badge>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-300 transition-all duration-300 bg-transparent"
            >
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white glow-effect hover:scale-105 transition-all duration-300">
              <Zap className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-cyan-400 hover:text-white hover:bg-cyan-500/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-xl">
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-cyan-100 hover:text-white hover:bg-cyan-500/10 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <item.icon className="h-4 w-4 mr-3 text-cyan-400" />
                      {item.name}
                    </Button>
                  </Link>
                ))}
                <div className="border-t border-cyan-500/20 pt-4 mt-4">
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                    >
                      Sign In
                    </Button>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                      <Zap className="h-4 w-4 mr-2" />
                      Get Started
                    </Button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
