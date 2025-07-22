import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building2, FileText, Shield, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Fapshi</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register-account">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        {/* <Badge variant="secondary" className="mb-4">
          Trusted by 1000+ Cameroonian Entrepreneurs
        </Badge> */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Register Your Business in <span className="text-blue-600">Cameroon</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Streamline your business registration process with Fapshi. Get your SARL, SA, or other business entity
          registered quickly and efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="flex items-center gap-2">
              Start Registration
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline">
              View Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Fapshi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <FileText className="h-12 w-12 text-blue-400 mb-4" />
              <CardTitle>Simple Process</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Multi-step guided process that makes business registration straightforward and easy to follow.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Multiple Shareholders</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Support for multiple shareholders with automatic shareholding validation and document management.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Secure & Compliant</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All processes comply with Cameroonian business registration requirements and data protection laws.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Building2 className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>All Business Types</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Support for SARL, SA, SNC, SCS, GIE, EURL and other business entity types in Cameroon.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Register Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of entrepreneurs who have successfully registered their businesses with Fapshi.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="flex items-center gap-2 mx-auto">
              Start Your Registration
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold">Fapshi</span>
          </div>
          <p className="text-gray-400">© 2024 Fapshi. All rights reserved. Empowering Cameroonian entrepreneurs.</p>
        </div>
      </footer>
    </div>
  )
}
