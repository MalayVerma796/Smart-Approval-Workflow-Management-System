import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area,
} from "recharts";
import { TrendingUp, TrendingDown, Clock, CheckCircle2, Users } from "lucide-react";

const monthlyData = [
  { month: "Jan", submitted: 95, approved: 78, rejected: 12, pending: 5 },
  { month: "Feb", submitted: 118, approved: 99, rejected: 14, pending: 5 },
  { month: "Mar", submitted: 134, approved: 115, rejected: 17, pending: 2 },
  { month: "Apr", submitted: 122, approved: 103, rejected: 13, pending: 6 },
  { month: "May", submitted: 147, approved: 128, rejected: 11, pending: 8 },
  { month: "Jun", submitted: 89, approved: 74, rejected: 9, pending: 6 },
];

const avgCycleTime = [
  { month: "Jan", days: 4.2 },
  { month: "Feb", days: 3.8 },
  { month: "Mar", days: 3.1 },
  { month: "Apr", days: 3.6 },
  { month: "May", days: 2.9 },
  { month: "Jun", days: 2.6 },
];

const byDept = [
  { dept: "Finance", approved: 142, rejected: 28, pending: 18 },
  { dept: "HR", approved: 118, rejected: 12, pending: 8 },
  { dept: "Legal", approved: 87, rejected: 22, pending: 14 },
  { dept: "IT", approved: 210, rejected: 31, pending: 22 },
  { dept: "Ops", approved: 95, rejected: 9, pending: 11 },
  { dept: "Sales", approved: 72, rejected: 14, pending: 7 },
];

const typeBreakdown = [
  { name: "Purchase Request", value: 412, color: "#2563EB" },
  { name: "Travel Auth", value: 198, color: "#10B981" },
  { name: "Software License", value: 156, color: "#F59E0B" },
  { name: "Headcount", value: 89, color: "#EF4444" },
  { name: "Vendor Contract", value: 134, color: "#8B5CF6" },
  { name: "Other", value: 95, color: "#94A3B8" },
];

const topApprovers = [
  { name: "Alex Morrison", approved: 284, avgDays: 1.8, dept: "Admin", avatar: "AM" },
  { name: "Marcus Webb", approved: 198, avgDays: 2.4, dept: "Finance", avatar: "MW" },
  { name: "Sarah Chen", approved: 176, avgDays: 2.1, dept: "Engineering", avatar: "SC" },
  { name: "Diana Moore", approved: 145, avgDays: 3.2, dept: "Legal", avatar: "DM" },
  { name: "James Liu", approved: 121, avgDays: 2.8, dept: "HR", avatar: "JL" },
];

const kpis = [
  { label: "Approval Rate", value: "87.6%", change: "+2.1%", positive: true, icon: CheckCircle2, color: "#10B981" },
  { label: "Avg. Cycle Time", value: "2.6 days", change: "-0.5d", positive: true, icon: Clock, color: "#2563EB" },
  { label: "SLA Compliance", value: "94.2%", change: "+1.3%", positive: true, icon: TrendingUp, color: "#8B5CF6" },
  { label: "Active Requesters", value: "312", change: "+18", positive: true, icon: Users, color: "#F59E0B" },
];

const dateRanges = ["Last 30 days", "Last 6 months", "Last 12 months", "Year to date"];

export function AnalyticsPage() {
  const [range, setRange] = useState("Last 6 months");

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Date filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>Workflow Analytics</h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.85rem" }}>Performance metrics and trend analysis</p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {dateRanges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="px-3.5 py-1.5 rounded-lg transition-all"
              style={{
                background: range === r ? "#2563EB" : "transparent",
                color: range === r ? "#fff" : "var(--muted-foreground)",
                border: "none",
                cursor: "pointer",
                fontSize: "0.78rem",
                fontWeight: range === r ? 600 : 400,
                whiteSpace: "nowrap",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl p-5"
              style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon size={18} style={{ color: kpi.color }} />
                <span
                  className="flex items-center gap-1"
                  style={{ color: kpi.positive ? "#10B981" : "#EF4444", fontSize: "0.78rem", fontWeight: 600 }}
                >
                  {kpi.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.change}
                </span>
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1 }}>{kpi.value}</div>
              <div style={{ color: "var(--muted-foreground)", fontSize: "0.78rem", marginTop: 4 }}>{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Line chart + Pie chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div
          className="xl:col-span-2 rounded-xl p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>Monthly Request Volume</h3>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>Submitted vs. Approved vs. Rejected</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                cursor={{ fill: "var(--muted)" }}
              />
              <Bar dataKey="submitted" fill="#BFDBFE" radius={[3, 3, 0, 0]} name="Submitted" />
              <Bar dataKey="approved" fill="#2563EB" radius={[3, 3, 0, 0]} name="Approved" />
              <Bar dataKey="rejected" fill="#EF4444" radius={[3, 3, 0, 0]} name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-3">
            {[
              { color: "#BFDBFE", label: "Submitted" },
              { color: "#2563EB", label: "Approved" },
              { color: "#EF4444", label: "Rejected" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
                <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie chart */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h3 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>By Request Type</h3>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem", marginBottom: "0.75rem" }}>Distribution YTD</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={typeBreakdown} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={2}>
                {typeBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {typeBreakdown.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{d.name}</span>
                </div>
                <span style={{ color: "var(--foreground)", fontSize: "0.8rem", fontWeight: 600 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cycle time + dept breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h3 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>Avg. Cycle Time</h3>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem", marginBottom: "1rem" }}>Days from submission to decision</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={avgCycleTime} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gCycle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="d" />
              <Tooltip
                contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => [`${v} days`, "Avg. Cycle Time"]}
              />
              <Area type="monotone" dataKey="days" stroke="#8B5CF6" fill="url(#gCycle)" strokeWidth={2} dot={{ r: 4, fill: "#8B5CF6", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Dept breakdown */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h3 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>By Department</h3>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem", marginBottom: "1rem" }}>Approved vs. Rejected</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={byDept} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={40} />
              <Tooltip
                contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                cursor={{ fill: "var(--muted)" }}
              />
              <Bar dataKey="approved" fill="#2563EB" radius={[0, 3, 3, 0]} name="Approved" stackId="a" />
              <Bar dataKey="rejected" fill="#FCA5A5" radius={[0, 3, 3, 0]} name="Rejected" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top approvers table */}
      <div
        className="rounded-xl"
        style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}
      >
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, color: "var(--foreground)" }}>Top Approvers</h3>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>Ranked by total approvals YTD</p>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
              {["Rank", "Approver", "Department", "Total Approved", "Avg. Decision Time"].map((h) => (
                <th key={h} className="px-5 py-3 text-left" style={{ color: "var(--muted-foreground)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topApprovers.map((a, i) => (
              <tr
                key={a.name}
                style={{ borderBottom: i < topApprovers.length - 1 ? "1px solid var(--border)" : "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                className="transition-colors"
              >
                <td className="px-5 py-3.5">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: i === 0 ? "#FEF3C7" : i === 1 ? "#F1F5F9" : i === 2 ? "#FEE2E2" : "var(--muted)",
                      color: i === 0 ? "#92400E" : i === 1 ? "#475569" : i === 2 ? "#7F1D1D" : "var(--muted-foreground)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      display: "inline-flex",
                    }}
                  >
                    {i + 1}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "#DBEAFE", color: "#1D4ED8", fontSize: "0.65rem", fontWeight: 700 }}
                    >
                      {a.avatar}
                    </div>
                    <span style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}>{a.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5" style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>{a.dept}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${(a.approved / topApprovers[0].approved) * 100}px`, background: "#2563EB", minWidth: 20 }}
                    />
                    <span style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 600 }}>{a.approved}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      background: a.avgDays <= 2 ? "#D1FAE5" : a.avgDays <= 3 ? "#FEF3C7" : "#FEE2E2",
                      color: a.avgDays <= 2 ? "#064E3B" : a.avgDays <= 3 ? "#78350F" : "#7F1D1D",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {a.avgDays} days
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
