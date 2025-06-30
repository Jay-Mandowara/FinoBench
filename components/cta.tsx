import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/placeholder.svg?height=400&width=1200&text=Financial+Growth+Chart')",
        }}
      />
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-blue-400/30">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">Ready to Transform Your Finance Operations?</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your AI-Powered Financial Journey Today</h2>

          <p className="text-xl mb-8 text-slate-300">
            Join thousands of financial professionals who are already leveraging our AI agents to make smarter, faster,
            and more profitable decisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4">
              <Link href="/agents" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400/10 text-lg px-8 py-4 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>

          <p className="text-sm text-slate-400 mt-6">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </div>
    </section>
  )
}
