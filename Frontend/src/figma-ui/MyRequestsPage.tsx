import { useState } from "react";
import { Search, X, FileText, MessageSquare, Clock, CheckCircle2, XCircle, ExternalLink } from "lucide-react";

const allRequests = [
  { id: "REQ-2286", title: "Cloud Infrastructure Upgrade", type: "Capital Expenditure", priority: "High", status: "pending", date: "Jun 5, 2026", amount: "$24,000", approver: "Marcus Webb", dept: "Engineering", comments: 2 },
  { id: "REQ-2283", title: "New Software License — Adobe CC", type: "Software License", priority: "Medium", status: "approved", date: "Jun 4, 2026", amount: "$3,600", approver: "Sarah Chen", dept: "Design", comments: 4 },
  { id: "REQ-2282", title: "Conference Travel Authorization", type: "Travel Authorization", priority: "Low", status: "approved", date: "Jun 3, 2026", amount: "$2,100", approver: "Sarah Chen", dept: "Engineering", comments: 1 },
  { id: "REQ-2280", title: "Headcount Addition — Senior Dev", type: "Headcount Request", priority: "High", status: "rejected", date: "Jun 2, 2026", amount: "—", approver: "Marcus Webb", dept: "Engineering", comments: 7 },
  { id: "REQ-2277", title: "Office Furniture Purchase", type: "Purchase Request", priority: "Low", status: "approved", date: "May 28, 2026", amount: "$4,800", approver: "Finance Committee", dept: "Operations", comments: 0 },
  { id: "REQ-2274", title: "Training Budget Increase Q2", type: "Budget Adjustment", priority: "Medium", status: "approved", date: "May 22, 2026", amount: "$8,000", approver: "Marcus Webb", dept: "HR", comments: 3 },
  { id: "REQ-2271", title: "Vendor Contract Renewal — Salesforce", type: "Vendor Contract", priority: "High", status: "pending", date: "May 18, 2026", amount: "$48,000", approver: "Finance Committee", dept: "Sales", comments: 5 },
  { id: "REQ-2268", title: "Remote Work Equipment Allowance", type: "Purchase Request", priority: "Low", status: "draft", date: "May 15, 2026", amount: "$1,500", approver: "—", dept: "Engineering", comments: 0 },
];

const statusConfig: Record<string, { bg: string; color: string; label: string; icon: React.ComponentType<{ size?: number }> }> = {
  pending: { bg: "#FEF3C7", color: "#92400E", label: "Pending", icon: Clock },
  approved: { bg: "#D1FAE5", color: "#064E3B", label: "Approved", icon: CheckCircle2 },
  rejected: { bg: "#FEE2E2", color: "#7F1D1D", label: "Rejected", icon: XCircle },
  draft: { bg: "#F1F5F9", color: "#475569", label: "Draft", icon: FileText },
};

const priorityColors: Record<string, string> = { High: "#EF4444", Medium: "#F59E0B", Low: "#10B981" };

export function MyRequestsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<typeof allRequests[0] | null>(null);

  const filtered = allRequests.filter((r) => {
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: allRequests.length,
    pending: allRequests.filter(r => r.status === "pending").length,
    approved: allRequests.filter(r => r.status === "approved").length,
    rejected: allRequests.filter(r => r.status === "rejected").length,
    draft: allRequests.filter(r => r.status === "draft").length,
  };

  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Search & filters */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[200px]"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <Search size={15} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search by title or ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-transparent"
              style={{ color: "var(--foreground)", fontSize: "0.875rem" }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", padding: 0 }}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            {(["all", "pending", "approved", "rejected", "draft"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-3.5 py-1.5 rounded-lg transition-all capitalize"
                style={{
                  background: statusFilter === s ? "#2563EB" : "transparent",
                  color: statusFilter === s ? "#fff" : "var(--muted-foreground)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: statusFilter === s ? 600 : 400,
                }}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                <span
                  className="ml-1.5 px-1.5 py-0.5 rounded-full"
                  style={{
                    background: statusFilter === s ? "rgba(255,255,255,0.2)" : "var(--muted)",
                    color: statusFilter === s ? "#fff" : "var(--muted-foreground)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                  }}
                >
                  {counts[s]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                {["Request ID", "Title", "Type", "Priority", "Status", "Amount", "Date", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left" style={{ color: "var(--muted-foreground)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center" style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                    No requests found matching your criteria
                  </td>
                </tr>
              ) : (
                filtered.map((r, i) => {
                  const sc = statusConfig[r.status];
                  const StatusIcon = sc.icon;
                  return (
                    <tr
                      key={r.id}
                      style={{
                        borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                        background: selectedRequest?.id === r.id ? "var(--accent)" : "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedRequest(selectedRequest?.id === r.id ? null : r)}
                      onMouseEnter={(e) => { if (selectedRequest?.id !== r.id) e.currentTarget.style.background = "var(--muted)"; }}
                      onMouseLeave={(e) => { if (selectedRequest?.id !== r.id) e.currentTarget.style.background = "transparent"; }}
                      className="transition-colors"
                    >
                      <td className="px-5 py-3.5" style={{ color: "#2563EB", fontSize: "0.82rem", fontWeight: 600, whiteSpace: "nowrap" }}>{r.id}</td>
                      <td className="px-5 py-3.5 max-w-[200px]">
                        <div style={{ color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {r.title}
                        </div>
                        {r.comments > 0 && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <MessageSquare size={11} style={{ color: "var(--muted-foreground)" }} />
                            <span style={{ color: "var(--muted-foreground)", fontSize: "0.7rem" }}>{r.comments} comment{r.comments !== 1 ? "s" : ""}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3.5" style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{r.type}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: priorityColors[r.priority] ?? "#94A3B8" }} />
                          <span style={{ color: "var(--muted-foreground)", fontSize: "0.82rem" }}>{r.priority}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit" style={{ background: sc.bg }}>
                          <StatusIcon size={12} style={{ color: sc.color }} />
                          <span style={{ color: sc.color, fontSize: "0.72rem", fontWeight: 600 }}>{sc.label}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5" style={{ color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 500, whiteSpace: "nowrap" }}>{r.amount}</td>
                      <td className="px-5 py-3.5" style={{ color: "var(--muted-foreground)", fontSize: "0.8rem", whiteSpace: "nowrap" }}>{r.date}</td>
                      <td className="px-5 py-3.5">
                        <ExternalLink size={14} style={{ color: "var(--muted-foreground)" }} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between mt-4">
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>
            Showing {filtered.length} of {allRequests.length} requests
          </p>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{
                  background: p === 1 ? "#2563EB" : "var(--card)",
                  color: p === 1 ? "#fff" : "var(--muted-foreground)",
                  border: `1px solid ${p === 1 ? "#2563EB" : "var(--border)"}`,
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: p === 1 ? 600 : 400,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      {selectedRequest && (
        <div
          className="w-80 flex-shrink-0 overflow-y-auto"
          style={{ borderLeft: "1px solid var(--border)", background: "var(--card)" }}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span style={{ color: "#2563EB", fontSize: "0.82rem", fontWeight: 600 }}>{selectedRequest.id}</span>
              <button
                onClick={() => setSelectedRequest(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", padding: 4 }}
              >
                <X size={16} />
              </button>
            </div>

            <h3 style={{ fontWeight: 600, color: "var(--foreground)", lineHeight: 1.4, marginBottom: "1rem" }}>
              {selectedRequest.title}
            </h3>

            {/* Status badge */}
            <div className="mb-5">
              {(() => {
                const sc = statusConfig[selectedRequest.status];
                const StatusIcon = sc.icon;
                return (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg w-fit" style={{ background: sc.bg }}>
                    <StatusIcon size={14} style={{ color: sc.color }} />
                    <span style={{ color: sc.color, fontSize: "0.82rem", fontWeight: 600 }}>{sc.label}</span>
                  </div>
                );
              })()}
            </div>

            <div className="space-y-3 mb-5">
              {[
                { label: "Type", value: selectedRequest.type },
                { label: "Department", value: selectedRequest.dept },
                { label: "Priority", value: selectedRequest.priority },
                { label: "Amount", value: selectedRequest.amount },
                { label: "Submitted", value: selectedRequest.date },
                { label: "Approver", value: selectedRequest.approver },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>{item.label}</span>
                  <span style={{ color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 12 }}>
                TIMELINE
              </p>
              <div className="space-y-3">
                {[
                  { event: "Request created", date: selectedRequest.date, color: "#2563EB" },
                  { event: "Sent to approver", date: selectedRequest.date, color: "#F59E0B" },
                  selectedRequest.status === "approved" && { event: "Approved", date: selectedRequest.date, color: "#10B981" },
                  selectedRequest.status === "rejected" && { event: "Rejected", date: selectedRequest.date, color: "#EF4444" },
                ].filter(Boolean).map((ev: any, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: ev.color }} />
                    <div>
                      <p style={{ color: "var(--foreground)", fontSize: "0.82rem" }}>{ev.event}</p>
                      <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{ev.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedRequest.status === "pending" && (
              <div className="mt-5 space-y-2">
                <button
                  className="w-full py-2.5 rounded-xl transition-colors"
                  style={{ background: "#FEE2E2", color: "#7F1D1D", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Withdraw Request
                </button>
                <button
                  className="w-full py-2.5 rounded-xl transition-colors"
                  style={{ background: "var(--muted)", color: "var(--foreground)", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Edit Draft
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
