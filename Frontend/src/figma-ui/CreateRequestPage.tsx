import { useState, useRef } from "react";
import { Upload, X, CheckCircle2, ChevronRight, AlertCircle, Info } from "lucide-react";

const requestTypes = [
  "Purchase Request",
  "Travel Authorization",
  "Software License",
  "Headcount Request",
  "Vendor Contract",
  "Budget Adjustment",
  "Policy Exception",
  "Capital Expenditure",
];

const priorities = [
  { value: "low", label: "Low", color: "#10B981", bg: "#D1FAE5", desc: "Non-urgent, flexible timeline" },
  { value: "medium", label: "Medium", color: "#F59E0B", bg: "#FEF3C7", desc: "Standard processing" },
  { value: "high", label: "High", color: "#EF4444", bg: "#FEE2E2", desc: "Requires expedited review" },
  { value: "critical", label: "Critical", color: "#7C3AED", bg: "#EDE9FE", desc: "Immediate attention required" },
];

const steps = ["Details", "Priority & Approvers", "Attachments", "Review"];

export function CreateRequestPage() {
  const [step, setStep] = useState(0);
  const [requestType, setRequestType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [department, setDepartment] = useState("Engineering");
  const [amount, setAmount] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else setSubmitted(true);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const addFile = (name: string) => {
    setFiles((prev) => [...prev, name]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    Array.from(e.dataTransfer.files).forEach((f) => addFile(f.name));
  };

  if (submitted) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div
          className="rounded-2xl p-10 text-center max-w-md w-full"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "#D1FAE5" }}
          >
            <CheckCircle2 size={32} style={{ color: "#10B981" }} />
          </div>
          <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>
            Request Submitted!
          </h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "0.5rem" }}>
            Your request <strong style={{ color: "#2563EB" }}>REQ-2286</strong> has been submitted and is pending review.
          </p>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.85rem", marginBottom: "2rem" }}>
            You'll receive an email notification when the status changes.
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setTitle(""); setDescription(""); setRequestType(""); setFiles([]); }}
            className="w-full py-3 rounded-xl"
            style={{ background: "#2563EB", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}
          >
            Create Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: i < step ? "#10B981" : i === step ? "#2563EB" : "var(--muted)",
                    color: i <= step ? "#fff" : "var(--muted-foreground)",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                  }}
                >
                  {i < step ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span
                  style={{
                    color: i === step ? "#2563EB" : "var(--muted-foreground)",
                    fontSize: "0.72rem",
                    fontWeight: i === step ? 600 : 400,
                    marginTop: 4,
                    whiteSpace: "nowrap",
                  }}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px mx-2 mb-4" style={{ background: i < step ? "#10B981" : "var(--border)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div
          className="rounded-2xl"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
        >
          {/* Step 0: Details */}
          {step === 0 && (
            <div className="p-6 space-y-5">
              <div>
                <h2 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>Request Details</h2>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                  Provide the basic information about your request
                </p>
              </div>

              <div className="space-y-1.5">
                <label style={{ color: "var(--foreground)" }}>Request Type *</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1.5px solid var(--border)", color: requestType ? "var(--foreground)" : "var(--muted-foreground)" }}
                >
                  <option value="">Select a request type…</option>
                  {requestTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label style={{ color: "var(--foreground)" }}>Request Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a clear, concise title…"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1.5px solid var(--border)", color: "var(--foreground)" }}
                />
              </div>

              <div className="space-y-1.5">
                <label style={{ color: "var(--foreground)" }}>Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide context, justification, and any relevant details that will help approvers make a decision…"
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-xl outline-none resize-none"
                  style={{ background: "var(--input-background)", border: "1.5px solid var(--border)", color: "var(--foreground)" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label style={{ color: "var(--foreground)" }}>Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl outline-none"
                    style={{ background: "var(--input-background)", border: "1.5px solid var(--border)", color: "var(--foreground)" }}
                  >
                    {["Engineering", "Marketing", "Finance", "HR", "Legal", "Operations", "Sales"].map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label style={{ color: "var(--foreground)" }}>Estimated Amount (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)", fontSize: "0.9rem" }}>$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl outline-none"
                      style={{ background: "var(--input-background)", border: "1.5px solid var(--border)", color: "var(--foreground)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Priority */}
          {step === 1 && (
            <div className="p-6 space-y-5">
              <div>
                <h2 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>Priority & Approvers</h2>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                  Set urgency and define the approval chain
                </p>
              </div>

              <div className="space-y-1.5">
                <label style={{ color: "var(--foreground)" }}>Priority Level *</label>
                <div className="grid grid-cols-2 gap-3">
                  {priorities.map((p) => (
                    <div
                      key={p.value}
                      onClick={() => setPriority(p.value)}
                      className="p-4 rounded-xl cursor-pointer transition-all"
                      style={{
                        border: priority === p.value ? `2px solid ${p.color}` : "2px solid var(--border)",
                        background: priority === p.value ? p.bg : "var(--input-background)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span style={{ fontWeight: 600, color: p.color, fontSize: "0.875rem" }}>{p.label}</span>
                        {priority === p.value && <CheckCircle2 size={14} style={{ color: p.color }} />}
                      </div>
                      <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label style={{ color: "var(--foreground)" }}>Approver Chain</label>
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)" }}
                >
                  {[
                    { name: "Sarah Chen", role: "Team Lead", status: "auto-assigned" },
                    { name: "Marcus Webb", role: "Department Head", status: "auto-assigned" },
                    { name: "Finance Committee", role: "Budget Approval", status: "conditional" },
                  ].map((a, i) => (
                    <div key={a.name} className="flex items-center gap-3 py-2.5">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: i === 0 ? "#10B981" : i === 1 ? "#2563EB" : "#94A3B8" }}
                      />
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "#DBEAFE", color: "#1D4ED8", fontSize: "0.72rem", fontWeight: 700 }}
                      >
                        {a.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1">
                        <div style={{ color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 500 }}>{a.name}</div>
                        <div style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{a.role}</div>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{
                          background: a.status === "auto-assigned" ? "#D1FAE5" : "#F1F5F9",
                          color: a.status === "auto-assigned" ? "#065F46" : "#475569",
                          fontSize: "0.68rem",
                          fontWeight: 600,
                        }}
                      >
                        {a.status}
                      </span>
                      {i < 2 && <ChevronRight size={14} style={{ color: "var(--border)" }} />}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}
              >
                <Info size={16} style={{ color: "#2563EB", flexShrink: 0, marginTop: 1 }} />
                <p style={{ color: "#1E40AF", fontSize: "0.8rem", lineHeight: 1.5 }}>
                  Approval chain is automatically assigned based on request type and estimated amount. High-value requests above $10,000 require Finance Committee sign-off.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Attachments */}
          {step === 2 && (
            <div className="p-6 space-y-5">
              <div>
                <h2 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>Attachments</h2>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                  Upload supporting documents, quotes, or references
                </p>
              </div>

              <div
                className="rounded-xl transition-all"
                style={{
                  border: `2px dashed ${dragOver ? "#2563EB" : "var(--border)"}`,
                  background: dragOver ? "#EFF6FF" : "var(--input-background)",
                }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center py-10 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "#DBEAFE" }}
                  >
                    <Upload size={22} style={{ color: "#2563EB" }} />
                  </div>
                  <p style={{ color: "var(--foreground)", fontWeight: 500, marginBottom: 4 }}>
                    Drop files here or click to browse
                  </p>
                  <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>
                    PDF, DOCX, XLSX, PNG, JPG — max 25 MB each
                  </p>
                  <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => Array.from(e.target.files ?? []).forEach((f) => addFile(f.name))} />
                </div>
              </div>

              {/* Demo files */}
              {files.length === 0 && (
                <div className="space-y-2">
                  <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem", fontWeight: 500 }}>Sample documents</p>
                  {["vendor_quote_aws_2026.pdf", "budget_approval_form.xlsx"].map((f) => (
                    <button
                      key={f}
                      onClick={() => addFile(f)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left"
                      style={{ background: "var(--muted)", border: "none", cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--muted)")}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#DBEAFE" }}>
                        <span style={{ color: "#1D4ED8", fontSize: "0.6rem", fontWeight: 700 }}>{f.endsWith(".pdf") ? "PDF" : "XLS"}</span>
                      </div>
                      <span style={{ color: "var(--foreground)", fontSize: "0.85rem" }}>{f}</span>
                      <span style={{ color: "#2563EB", fontSize: "0.78rem", marginLeft: "auto" }}>+ Add</span>
                    </button>
                  ))}
                </div>
              )}

              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#D1FAE5" }}>
                        <CheckCircle2 size={14} style={{ color: "#10B981" }} />
                      </div>
                      <span style={{ color: "var(--foreground)", fontSize: "0.85rem", flex: 1 }}>{f}</span>
                      <button
                        onClick={() => setFiles(files.filter((_, fi) => fi !== i))}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", padding: 4 }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="p-6 space-y-5">
              <div>
                <h2 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>Review & Submit</h2>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                  Review your request before submitting for approval
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Request Type", value: requestType || "Purchase Request" },
                  { label: "Title", value: title || "Q3 Cloud Infrastructure Upgrade" },
                  { label: "Department", value: department },
                  { label: "Estimated Amount", value: amount ? `$${Number(amount).toLocaleString()}` : "$15,000" },
                  { label: "Priority", value: priorities.find(p => p.value === priority)?.label ?? "Medium" },
                  { label: "Attachments", value: `${files.length} file${files.length !== 1 ? "s" : ""} attached` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>{item.label}</span>
                    <span style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}

                <div className="py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", display: "block", marginBottom: 8 }}>Description</span>
                  <p style={{ color: "var(--foreground)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    {description || "Upgrade our cloud infrastructure to support the upcoming product launch and handle projected 3x traffic increase in Q3 2026."}
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: "#FEF3C7", border: "1px solid #FDE68A" }}
              >
                <AlertCircle size={16} style={{ color: "#92400E", flexShrink: 0, marginTop: 1 }} />
                <p style={{ color: "#78350F", fontSize: "0.8rem", lineHeight: 1.5 }}>
                  Once submitted, you cannot edit this request. Approvers will be notified immediately.
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="px-5 py-2.5 rounded-xl transition-colors"
              style={{
                background: "var(--muted)",
                border: "none",
                cursor: step === 0 ? "not-allowed" : "pointer",
                color: step === 0 ? "var(--muted-foreground)" : "var(--foreground)",
                fontWeight: 500,
                fontSize: "0.875rem",
                opacity: step === 0 ? 0.5 : 1,
              }}
            >
              Back
            </button>
            <div className="flex items-center gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all"
                  style={{
                    width: i === step ? 20 : 6,
                    height: 6,
                    background: i === step ? "#2563EB" : i < step ? "#10B981" : "var(--border)",
                  }}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl transition-colors"
              style={{
                background: "#2563EB",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              {step === steps.length - 1 ? "Submit Request" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
