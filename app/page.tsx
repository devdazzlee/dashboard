"use client"

import { useEffect, useState } from "react"
import { Globe, Settings, Activity, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export default function Home() {
  const backendUrl = "https://swimwear-backend.vercel.app"
  const [isLive, setIsLive] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    fetch(`${backendUrl}/api/site-status`) // change to production API when deploying
      .then((res) => res.json())
      .then((data) => {
        setIsLive(data.isLive)
        setLastUpdated(new Date())
      })
      .catch((err) => console.error("Failed to fetch status:", err))
  }, [])

  const handleToggle = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backendUrl}/api/site-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ live: !isLive }),
      })
      if (res.ok) {
        const data = await res.json()
        setIsLive(data.isLive)
        setLastUpdated(new Date())
      }
    } catch (err) {
      console.error("Failed to toggle status:", err)
    }
    setLoading(false)
  }

  if (isLive === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Website Manager</h1>
                <p className="text-slate-600">Monitor and control your websites</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-slate-600">
                <Activity className="h-3 w-3 mr-1" />1 Website
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Active Websites</h2>
          <p className="text-slate-600">Manage the status of your websites and control maintenance mode.</p>
        </div>

        {/* Website Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Website Card */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${isLive ? "bg-green-500" : "bg-orange-500"} animate-pulse`}
                  ></div>
                  <CardTitle className="text-lg">Main Website</CardTitle>
                </div>
                <Badge
                  variant={isLive ? "default" : "secondary"}
                  className={isLive ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                >
                  {isLive ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Live
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Maintenance
                    </>
                  )}
                </Badge>
              </div>
              <CardDescription>Primary website status and controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-900">Maintenance Mode</p>
                    <p className="text-sm text-slate-600">
                      {isLive ? "Website is live and accessible" : "Website is under maintenance"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isLive}
                  onCheckedChange={handleToggle}
                  disabled={loading}
                  className="data-[state=checked]:bg-green-600"
                />
              </div>

              <div className="flex items-center justify-between text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Last updated</span>
                </div>
                <span>{lastUpdated.toLocaleTimeString()}</span>
              </div>

              {loading && (
                <div className="flex items-center justify-center py-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  <span className="text-sm text-slate-600">Updating status...</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Placeholder Cards for Future Websites */}
          <Card className="border-dashed border-2 border-slate-300 hover:border-slate-400 transition-colors duration-200">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-slate-100 p-3 rounded-full mb-4">
                <Globe className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Add Website</h3>
              <p className="text-sm text-slate-600 mb-4">Connect another website to manage</p>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="border-dashed border-2 border-slate-300 hover:border-slate-400 transition-colors duration-200">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-slate-100 p-3 rounded-full mb-4">
                <Globe className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Add Website</h3>
              <p className="text-sm text-slate-600 mb-4">Connect another website to manage</p>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Websites</p>
                  <p className="text-2xl font-bold text-slate-900">1</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Live Sites</p>
                  <p className="text-2xl font-bold text-slate-900">{isLive ? "1" : "0"}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Under Maintenance</p>
                  <p className="text-2xl font-bold text-slate-900">{isLive ? "0" : "1"}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
