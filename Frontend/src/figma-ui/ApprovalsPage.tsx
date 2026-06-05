import { useState } from "react";
import { Clock, User, Tag, DollarSign, MessageSquare, CheckCircle2, XCircle, ChevronDown, X, Send } from "lucide-react";

const pendingApprovals = [
  {
    id: "REQ-2284",
    title: "Q3 Marketing Budget Increase",
    requester: { name: "Emma Larson", dept: "Marketing", avatar: "EL" },
    type: "Budget Adjustment",
    priority: "High",
    amount: "$45,000",
    submitted: "Jun 4, 2026",
    daysAgo: 1,
    description: "We need to increase the Q3 marketing budget by $45,000 to fund the product launch campaign, including digital advertising, event sponsorships, and PR activities for the Q3 product launch.",
    comments: [
      { author: "Sarah Chen", avatar: "SC", time: "2 hr ago", text: "I've reviewed the breakdown. The digital ad spend looks reasonable given our CAC targets." },
      { author: "Marcus Webb", avatar: "MW", time: "5 hr ago", text: "Can you clarify the split between paid and organic channels?" },
    ],
  },
  {
    id: "REQ-2281",
    title: "Vendor Contract Renewal — AWS",
    requester: { name: "David Kim", dept: "IT", avatar: "DK" },
    type: "Vendor Contract",
    priority: "High",
    amount: "$120,000",
    submitted: "Jun 3, 2026",
    daysAgo: 2,
    description: "Annual AWS contract renewal for our production infrastructure. Current contract expires July 15, 2026. The renewed contract includes reserved instance pricing with a 22% cost reduction compared to on-demand pricing.",
    comments: [
      { author: "Finance Team", avatar: "FT", time: "1 day ago", text: "Budget code 4421-IT is available. Please ensure procurement attaches the updated SLA terms." },
    ],
  },
  {
    id: "REQ-2279",
    title: "UX Research Tool Subscription",
    requester: { name: "Yuki Tanaka", dept: "Product", avatar: "YT" },
    type: "Software License",
    priority: "Medium",
    amount: "$6,000",
    submitted: "Jun 3, 2026",
    daysAgo: 2,
    description: "Annual subscription to UserTesting.com for our product research team. This will enable us to run remote usability tests, gather user feedback, and reduce cycle time for design validation.",
    comments: [],
  },
  {
    id: "REQ-2278",
    title: "Conference Travel — ProductCon SF",
    requester: { name: "Priya Sharma", dept: "Engineering", avatar: "PS" },
    type: "Travel Authorization",
    priority: "Low",
    amount: "$3,200",
    submitted: "Jun 2, 2026",
    daysAgo: 3,
    description: "Travel and accommodation for ProductCon SF (July 8-10). The conference is directly relevant to our Q3 platform roadmap. I plan to attend 4 talks on AI-driven workflow automation and present at the engineering track.",
    comments: [],
  },
  {
    id: "REQ-2276",
    title: "Legal Counsel Retainer",
    requester: { name: "Lena Müller", dept: "Legal", avatar: "LM" },
    type: "Vendor Contract",
    priority: "High",
    amount: "$18,000",
    submitted: "Jun 1, 2026",
    daysAgo: 4,
    description: "Engagement of external IP counsel for the upcoming patent filing process. Estimated 6-week engagement to review 3 provisional patent applications.",
    comments: [
      { author: "CFO Office", avatar: "CF", time: "2 days ago", text: "Approved in principle pending procurement sign-off." },
    ],
  },
];

const priorityConfig: Record<string, { bg: string; color: string }> = {
  High: { bg: "#FEE2E2", color: "#DC2626" },
  Medium: { bg: "#FEF3C7", color: "#D97706" },
  Low: { bg: "#D1FAE5", color: "#059669" },
};

export function ApprovalsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(pendingApprovals[0].id);
  const [actioned, setActioned] = useState<Record<string, "approved" | "rejected">>({});
  const [comment, setComment] = useState("");
  const [confirmModal, setConfirmModal] = useState<{ id: string; action: "approved" | "rejected" } | null>(null);

  const selected = pendingApprovals.find((r) => r.id === selectedId);
  const queue = pendingApprovals.filter((r) => !actioned[r.id]);

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setConfirmModal({ id, action });
  };

  const confirmAction = () => {
    if (!confirmModal) return;
    setActioned((prev) => ({ ...prev, [confirmModal.id]: confirmModal.action }));
    setConfirmModal(null);
    if (confirmModal.id === selectedId) {
      const nextQueued = pendingApprovals.find((r) => r.id !== confirmModal.id && !actioned[r.id]);
      setSelectedId(nextQueued?.id ?? null);
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Confirm modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div
            className="rounded-2xl p-6 w-80"
            style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: confirmModal.action === "approved" ? "#D1FAE5" : "#FEE2E2" }}
              >
                {confirmModal.action === "approved"
                  ? <CheckCircle2 size={20} style={{ color: "#10B981" }} />
                  : <XCircle size={20} style={{ color: "#EF4444" }} />
                }
              </div>
              <div>
                <h3 style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "1rem" }}>
                  {confirmModal.action === "approved" ? "Approve Request" : "Reject Request"}
                </h3>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>{confirmModal.id}</p>
              </div>
            </div>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.5, marginBottom: "1.25rem" }}>
              {confirmModal.action === "approved"
                ? "This will notify the requester and move the request to the next approval stage."
                : "This will notify the requester and close the request. A reason will be required."
              }
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-2.5 rounded-xl"
                style={{ background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--foreground)", fontWeight: 500, fontSize: "0.875rem" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="flex-1 py-2.5 rounded-xl"
                style={{
                  background: confirmModal.action === "approved" ? "#10B981" : "#EF4444",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                {confirmModal.action === "approved" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left panel — queue */}
      <div
        className="w-80 flex-shrink-0 overflow-y-auto"
        style={{ borderRight: "1px solid var(--border)", background: "var(--card)" }}
      >
        <div className="p-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-1">
            <h3 style={{ fontWeight: 600, color: "var(--foreground)" }}>Approval Queue</h3>
            <span
              className="px-2 py-0.5 rounded-full"
              style={{ background: "#FEE2E2", color: "#7F1D1D", fontSize: "0.72rem", fontWeight: 700 }}
            >
              {queue.length} pending
            </span>
          </div>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.78rem" }}>Requests awaiting your decision</p>
        </div>

        <div className="p-2 space-y-1">
          {pendingApprovals.map((r) => {
            const done = actioned[r.id];
            const pc = priorityConfig[r.priority];
            return (
              <div
                key={r.id}
                onClick={() => !done && setSelectedId(r.id)}
                className="rounded-xl p-3.5 transition-all"
                style={{
                  background: selectedId === r.id && !done ? "var(--accent)" : "transparent",
                  border: selectedId === r.id && !done ? "1px solid var(--accent-foreground)" : "1px solid transparent",
                  cursor: done ? "default" : "pointer",
                  opacity: done ? 0.5 : 1,
                }}
                onMouseEnter={(e) => { if (!done && selectedId !== r.id) e.currentTarget.style.background = "var(--muted)"; }}
                onMouseLeave={(e) => { if (!done && selectedId !== r.id) e.currentTarget.style.background = "transparent"; }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span style={{ color: "#2563EB", fontSize: "0.75rem", fontWeight: 600 }}>{r.id}</span>
                  {done ? (
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        background: done === "approved" ? "#D1FAE5" : "#FEE2E2",
                        color: done === "approved" ? "#065F46" : "#7F1D1D",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                      }}
                    >
                      {done === "approved" ? "Approved" : "Rejected"}
                    </span>
                  ) : (
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{ background: pc.bg, color: pc.color, fontSize: "0.65rem", fontWeight: 700 }}
                    >
                      {r.priority}
                    </span>
                  )}
                </div>
                <p style={{ color: "var(--foreground)", fontSize: "0.82rem", fontWeight: 500, lineHeight: 1.4, marginBottom: 6 }}>
                  {r.title}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "#DBEAFE", color: "#1D4ED8", fontSize: "0.55rem", fontWeight: 700 }}
                    >
                      {r.requester.avatar}
                    </div>
                    <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{r.requester.name}</span>
                  </div>
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.72rem" }}>·</span>
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.72rem" }}>{r.daysAgo}d ago</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right panel — detail */}
      <div className="flex-1 overflow-y-auto">
        {selected && !actioned[selected.id] ? (
          <div className="p-6 max-w-2xl">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: "#2563EB", fontSize: "0.85rem", fontWeight: 600 }}>{selected.id}</span>
                <span style={{ color: "var(--border)" }}>·</span>
                <span style={{ color: "var(--muted-foreground)", fontSize: "0.82rem" }}>{selected.type}</span>
              </div>
              <h2 style={{ fontWeight: 700, color: "var(--foreground)", lineHeight: 1.3, marginBottom: "1.25rem" }}>
                {selected.title}
              </h2>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "#DBEAFE", color: "#1D4ED8", fontSize: "0.72rem", fontWeight: 700 }}
                  >
                    {selected.requester.avatar}
                  </div>
                  <div>
                    <div style={{ color: "var(--foreground)", fontSize: "0.82rem", fontWeight: 500 }}>{selected.requester.name}</div>
                    <div style={{ color: "var(--muted-foreground)", fontSize: "0.72rem" }}>{selected.requester.dept}</div>
                  </div>
                </div>

                {[
                  { icon: Tag, label: selected.priority, style: priorityConfig[selected.priority] },
                  { icon: DollarSign, label: selected.amount, style: { bg: "#F1F5F9", color: "#475569" } },
                  { icon: Clock, label: selected.submitted, style: { bg: "#F1F5F9", color: "#475569" } },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: m.style.bg }}
                  >
                    <m.icon size={12} style={{ color: m.style.color }} />
                    <span style={{ color: m.style.color, fontSize: "0.78rem", fontWeight: 500 }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div
              className="rounded-xl p-5 mb-5"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <h4 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: "0.75rem" }}>Request Details</h4>
              <p style={{ color: "var(--foreground)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                {selected.description}
              </p>
            </div>

            {/* Comments */}
            {selected.comments.length > 0 && (
              <div
                className="rounded-xl mb-5"
                style={{ background: "var(--card)", border: "1px solid var(--border)", overflow: "hidden" }}
              >
                <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                  <h4 style={{ fontWeight: 600, color: "var(--foreground)" }}>
                    Comments ({selected.comments.length})
                  </h4>
                </div>
                <div className="p-5 space-y-5">
                  {selected.comments.map((c, i) => (
                    <div key={i} className="flex gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "#EFF6FF", color: "#1D4ED8", fontSize: "0.65rem", fontWeight: 700 }}
                      >
                        {c.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.85rem" }}>{c.author}</span>
                          <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{c.time}</span>
                        </div>
                        <p style={{ color: "var(--foreground)", fontSize: "0.85rem", lineHeight: 1.5 }}>{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add comment */}
            <div
              className="rounded-xl mb-6"
              style={{ background: "var(--card)", border: "1px solid var(--border)", overflow: "hidden" }}
            >
              <div className="flex items-start gap-3 p-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "#2563EB", color: "#fff", fontSize: "0.65rem", fontWeight: 700 }}
                >
                  AM
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment or note for the requester…"
                  rows={2}
                  className="flex-1 outline-none bg-transparent resize-none"
                  style={{ color: "var(--foreground)", fontSize: "0.875rem", lineHeight: 1.5 }}
                />
              </div>
              {comment && (
                <div className="flex justify-end px-4 pb-3">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg"
                    style={{ background: "#2563EB", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 500 }}
                    onClick={() => setComment("")}
                  >
                    <Send size={13} /> Send
                  </button>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div
              className="flex items-center gap-3 p-5 rounded-2xl"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="flex-1">
                <p style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.9rem", marginBottom: 2 }}>Ready to decide?</p>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>Your decision will be logged and the requester notified.</p>
              </div>
              <button
                onClick={() => handleAction(selected.id, "rejected")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all"
                style={{ background: "#FEE2E2", color: "#DC2626", border: "1px solid #FECACA", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FCA5A5")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#FEE2E2")}
              >
                <XCircle size={16} /> Reject
              </button>
              <button
                onClick={() => handleAction(selected.id, "approved")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all"
                style={{ background: "#10B981", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#10B981")}
              >
                <CheckCircle2 size={16} /> Approve
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "var(--muted)" }}>
                <CheckCircle2 size={28} style={{ color: "var(--muted-foreground)" }} />
              </div>
              <h3 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 8 }}>Queue Complete</h3>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                You've reviewed all pending requests for today.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
