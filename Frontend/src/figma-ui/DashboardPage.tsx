import {
  FileText, Clock, CheckCircle2, XCircle, TrendingUp, TrendingDown,
  Plus, Search, ArrowRight, Circle
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const kpiData = [
  {
    label: "Total Requests",
    value: "1,284",
    change: "+12%",
    positive: true,
    icon: FileText,
    color: "#2563EB",
    bg: "#DBEAFE",
  },
  {
    label: "Pending Review",
    value: "89",
    change: "+5%",
    positive: false,
    icon: Clock,
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  {
    label: "Approved",
    value: "1,047",
    change: "+18%",
    positive: true,
    icon: CheckCircle2,
    color: "#10B981",
    bg: "#D1FAE5",
  },
  {
    label: "Rejected",
    value: "148",
    change: "-3%",
    positive: true,
    icon: XCircle,
    color: "#EF4444",
    bg: "#FEE2E2",
  },
];

const areaData = [
  { month: "Jan", submitted: 95, approved: 78, rejected: 12 },
  { month: "Feb", submitted: 118, approved: 99, rejected: 14 },
  { month: "Mar", submitted: 134, approved: 115, rejected: 17 },
  { month: "Apr", submitted: 122, approved: 103, rejected: 13 },
  { month: "May", submitted: 147, approved: 128, rejected: 11 },
  { month: "Jun", submitted: 159, approved: 141, rejected: 9 },
  { month: "Jul", submitted: 143, approved: 127, rejected: 12 },
];

const barData = [
  { dept: "Finance", requests: 310 },
  { dept: "HR", requests: 245 },
  { dept: "Legal", requests: 198 },
  { dept: "IT", requests: 287 },
  { dept: "Ops", requests: 174 },
  { dept: "Sales", requests: 70 },
];

const pieData = [
  { name: "Approved", value: 1047, color: "#10B981" },
  { name: "Pending", value: 89, color: "#F59E0B" },
  { name: "Rejected", value: 148, color: "#EF4444" },
];

const recentRequests = [
  { id: "REQ-2284", title: "Q3 Marketing Budget Increase", requester: "Emma Larson", dept: "Marketing", priority: "High", status: "pending", date: "Jun 4, 2026" },
  { id: "REQ-2283", title: "New Software License — Adobe CC", requester: "James Park", dept: "Design", priority: "Medium", status: "approved", date: "Jun 4, 2026" },
  { id: "REQ-2282", title: "Conference Travel Authorization", requester: "Priya Sharma", dept: "Engineering", priority: "Low", status: "approved", date: "Jun 3, 2026" },
  { id: "REQ-2281", title: "Vendor Contract Renewal — AWS", requester: "David Kim", dept: "IT", priority: "High", status: "pending", date: "Jun 3, 2026" },
  { id: "REQ-2280", title: "Headcount Addition — Senior Dev", requester: "Sarah Chen", dept: "Engineering", priority: "High", status: "rejected", date: "Jun 2, 2026" },
  { id: "REQ-2279", title: "Office Equipment Purchase", requester: "Tom Richards", dept: "Operations", priority: "Low", status: "approved", date: "Jun 2, 2026" },
];

const activityFeed = [
  { action: "Request approved", target: "REQ-2283", user: "Alex Morrison", time: "2 min ago", color: "#10B981" },
  { action: "Comment added", target: "REQ-2284", user: "Sarah Chen", time: "15 min ago", color: "#3B82F6" },
  { action: "Request submitted", target: "REQ-2285", user: "James Park", time: "1 hr ago", color: "#8B5CF6" },
  { action: "Request rejected", target: "REQ-2280", user: "Alex Morrison", time: "2 hr ago", color: "#EF4444" },
  { action: "Request escalated", target: "REQ-2278", user: "Emma Larson", time: "4 hr ago", color: "#F59E0B" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    pending: { bg: "#FEF3C7", color: "#92400E", label: "Pending" },
    approved: { bg: "#D1FAE5", color: "#064E3B", label: "Approved" },
    rejected: { bg: "#FEE2E2", color: "#7F1D1D", label: "Rejected" },
    draft: { bg: "#F1F5F9", color: "#475569", label: "Draft" },
  };
  const s = map[status] ?? map.draft;
  return (
    <span
      className="px-2.5 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color, fontSize: "0.72rem", fontWeight: 600 }}
    >
      {s.label}
    </span>
  );
};

const PriorityDot = ({ priority }: { priority: string }) => {
  const colors: Record<string, string> = { High: "#EF4444", Medium: "#F59E0B", Low: "#10B981" };
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: colors[priority] ?? "#94A3B8" }} />
      <span style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>{priority}</span>
    </div>
  );
};

export function DashboardPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl p-5 flex flex-col gap-3"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: kpi.bg }}
                >
                  <Icon size={18} style={{ color: kpi.color }} />
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{ color: kpi.positive ? "#10B981" : "#EF4444", fontSize: "0.78rem", fontWeight: 600 }}
                >
                  {kpi.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {kpi.change}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1 }}>
                  {kpi.value}
                </div>
                <div style={{ color: "var(--muted-foreground)", fontSize: "0.8rem", marginTop: 4 }}>
                  {kpi.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Area chart */}
        <div
          className="xl:col-span-2 rounded-xl p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>Request Volume</h3>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>7-month trend</p>
            </div>
            <select
              className="px-3 py-1.5 rounded-lg outline-none"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}
            >
              <option>Last 7 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={areaData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gSubmitted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gApproved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="submitted" stroke="#2563EB" fill="url(#gSubmitted)" strokeWidth={2} name="Submitted" dot={false} />
              <Area type="monotone" dataKey="approved" stroke="#10B981" fill="url(#gApproved)" strokeWidth={2} name="Approved" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-3">
            {[{ color: "#2563EB", label: "Submitted" }, { color: "#10B981", label: "Approved" }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-1 rounded-full" style={{ background: l.color }} />
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
          <h3 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>Status Breakdown</h3>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem", marginBottom: "1rem" }}>All time</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>{d.name}</span>
                </div>
                <span style={{ color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 600 }}>{d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table + activity row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent requests table */}
        <div
          className="xl:col-span-2 rounded-xl"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontWeight: 600, color: "var(--foreground)" }}>Recent Requests</h3>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: "#2563EB", background: "#EFF6FF", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 500 }}
            >
              View all <ArrowRight size={13} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Request ID", "Title", "Requester", "Priority", "Status", "Date"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left" style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((r, i) => (
                  <tr
                    key={r.id}
                    style={{ borderBottom: i < recentRequests.length - 1 ? "1px solid var(--border)" : "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--muted)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    className="cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3.5" style={{ color: "#2563EB", fontSize: "0.82rem", fontWeight: 500 }}>{r.id}</td>
                    <td className="px-5 py-3.5 max-w-[180px]">
                      <span style={{ color: "var(--foreground)", fontSize: "0.82rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
                        {r.title}
                      </span>
                      <span style={{ color: "var(--muted-foreground)", fontSize: "0.72rem" }}>{r.dept}</span>
                    </td>
                    <td className="px-5 py-3.5" style={{ color: "var(--foreground)", fontSize: "0.82rem" }}>{r.requester}</td>
                    <td className="px-5 py-3.5"><PriorityDot priority={r.priority} /></td>
                    <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                    <td className="px-5 py-3.5" style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity feed */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h3 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: "1rem" }}>Activity Feed</h3>
          <div className="space-y-4">
            {activityFeed.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: a.color }}
                  />
                  {i < activityFeed.length - 1 && (
                    <div className="flex-1 w-px mt-1" style={{ background: "var(--border)", minHeight: 28 }} />
                  )}
                </div>
                <div className="pb-2">
                  <p style={{ color: "var(--foreground)", fontSize: "0.82rem", lineHeight: 1.4 }}>
                    <span style={{ fontWeight: 500 }}>{a.action}</span>{" "}
                    <span style={{ color: "#2563EB", fontWeight: 500 }}>{a.target}</span>
                  </p>
                  <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", marginTop: 2 }}>
                    {a.user} · {a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 10 }}>
              QUICK ACTIONS
            </p>
            <div className="space-y-2">
              {["New Purchase Request", "Travel Authorization", "Software License"].map((action) => (
                <button
                  key={action}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors text-left"
                  style={{ background: "var(--muted)", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--muted)")}
                >
                  <Plus size={14} style={{ color: "#2563EB" }} />
                  <span style={{ color: "var(--foreground)", fontSize: "0.82rem" }}>{action}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div
        className="rounded-xl p-5"
        style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>Requests by Department</h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>YTD 2026</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="dept" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              cursor={{ fill: "var(--muted)" }}
            />
            <Bar dataKey="requests" fill="#2563EB" radius={[4, 4, 0, 0]} name="Requests" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
