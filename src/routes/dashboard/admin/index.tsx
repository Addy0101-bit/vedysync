import { createFileRoute, Link } from '@tanstack/react-router'
import { AdminLoading } from '#/components/admin/loading'
import { getDashboardMetrics } from '#/components/admin/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '#/components/ui/card'
import { CheckCircle, Clock, ArrowRight, ShieldCheck } from 'lucide-react'
import { Blobatar } from '@blobatar/react'
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '#/components/ui/chart'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/dashboard/admin/')({
  loader: async () => {
    return await getDashboardMetrics()
  },
  pendingComponent: AdminLoading,
  pendingMs: 0,
  component: RouteComponent,
})

const pipelineData = [
  { phase: "Phase I", value: 12, fill: "var(--color-phase1)" },
  { phase: "Phase II", value: 8, fill: "var(--color-phase2)" },
  { phase: "Phase III", value: 4, fill: "var(--color-phase3)" },
  { phase: "Completed", value: 15, fill: "var(--color-completed)" },
]

const pipelineConfig = {
  value: { label: "Trials" },
  phase1: { label: "Phase I", color: "#1e3a8a" },
  phase2: { label: "Phase II", color: "#1d4ed8" },
  phase3: { label: "Phase III", color: "#3b82f6" },
  completed: { label: "Completed", color: "#93c5fd" },
}

const growthData = [
  { month: "Jan", signups: 12, approvals: 8 },
  { month: "Feb", signups: 19, approvals: 15 },
  { month: "Mar", signups: 25, approvals: 18 },
  { month: "Apr", signups: 32, approvals: 28 },
  { month: "May", signups: 45, approvals: 38 },
  { month: "Jun", signups: 58, approvals: 50 },
]

const growthConfig = {
  signups: { label: "Signups", color: "#2563eb" },
  approvals: { label: "Approvals", color: "#93c5fd" },
}

const regionalData = [
  { region: "Gujarat", count: 45, fill: "var(--color-gujarat)" },
  { region: "Jharkhand", count: 25, fill: "var(--color-jharkhand)" },
  { region: "Maharashtra", count: 65, fill: "var(--color-maharashtra)" },
  { region: "Delhi", count: 35, fill: "var(--color-delhi)" },
]

const regionalConfig = {
  count: { label: "Researchers" },
  gujarat: { color: "#1e40af" },
  jharkhand: { color: "#2563eb" },
  maharashtra: { color: "#60a5fa" },
  delhi: { color: "#bfdbfe" },
}

const auditLogs = [
  { id: 1, action: "Admin Ankit approved Dr. Sharma's credentials", time: "10 mins ago" },
  { id: 2, action: "New medicine batch #402 submitted for review", time: "25 mins ago" },
  { id: 3, action: "System automatic backup completed", time: "1 hour ago" },
  { id: 4, action: "Admin Priya rejected application #1084", time: "2 hours ago" },
  { id: 5, action: "Trial Phase II 'Ayu-01' status updated to Active", time: "3 hours ago" },
]

function RouteComponent() {
  const { metrics, health, latestPendingMakers } = Route.useLoaderData()

  return (
    <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">VedaSync Super-Admin Control Center</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Welcome to your administrative portal.</p>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Clinical Trial Pipeline Status</CardTitle>
            <CardDescription>Breakdown by trial phase.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-[250px]">
            <ChartContainer config={pipelineConfig} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip cursor={{ fill: 'transparent' }} content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={pipelineData}
                    dataKey="value"
                    nameKey="phase"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    stroke="none"
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-1 p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Active Trials</span>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">{metrics.activeTrials}</span>
                <span className="text-xs text-zinc-500 mt-1">Currently running</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">System Health</span>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">{health.dbStatus === 'Connected' ? '100%' : 'Error'}</span>
                <span className="text-xs text-zinc-500 mt-1">Operational</span>
              </div>
            </div>
            <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white" variant="default">
              View Full Report
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Quick Action Queue</CardTitle>
            <CardDescription>Priority list of makers waiting for document approval.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-start">
            {latestPendingMakers.length > 0 ? (
              <div className="space-y-4">
                {latestPendingMakers.map(maker => (
                  <div key={maker.id} className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                        {maker.profilePhotoUrl ? (
                          <img src={maker.profilePhotoUrl} alt={maker.firstName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full scale-110">
                            <Blobatar name={maker.user.name || maker.firstName || 'User'} animate="never" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">{maker.firstName} {maker.lastName}</p>
                        <p className="text-xs text-zinc-500 mt-1.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(maker.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Link to="/dashboard/admin/report" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                      Review Docs <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center h-full min-h-[250px]">
                <CheckCircle className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-3" />
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">All caught up!</h3>
                <p className="text-sm text-zinc-500 mt-1">No pending verification requests.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Researcher Verification Trends</CardTitle>
            <CardDescription>Monthly signups vs approvals.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={growthConfig} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillSignups" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-signups)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-signups)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillApprovals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-approvals)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-approvals)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <ChartTooltip cursor={{ fill: 'transparent' }} content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="signups" stroke="var(--color-signups)" strokeWidth={2} fillOpacity={1} fill="url(#fillSignups)" />
                  <Area type="monotone" dataKey="approvals" stroke="var(--color-approvals)" strokeWidth={2} fillOpacity={1} fill="url(#fillApprovals)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-1 p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Total Registered</span>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">{metrics.totalMakers}</span>
                <span className="text-xs text-zinc-500 mt-1">Platform makers</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Total Testers</span>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">{metrics.totalTesters}</span>
                <span className="text-xs text-zinc-500 mt-1">Trial participants</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent System Audit Log Feed</CardTitle>
            <CardDescription>Live feed of critical actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex items-start justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{log.action}</p>
                      <p className="text-xs text-zinc-500 mt-1">{log.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Regional Distribution</CardTitle>
            <CardDescription>Registered researchers by region.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={regionalConfig} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }} barSize={32}>
                  <XAxis dataKey="region" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={{ fill: 'transparent' }} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="count" radius={6}>
                    {regionalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-4 mt-auto">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-1 p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Pending Verifications</span>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">{metrics.pendingVerifications}</span>
                <span className="text-xs text-zinc-500 mt-1">Requires admin approval</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Top Region</span>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">Maharashtra</span>
                <span className="text-xs text-zinc-500 mt-1">Highest user count</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
