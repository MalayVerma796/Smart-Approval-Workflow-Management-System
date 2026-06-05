import { useState } from "react";
import { Eye, EyeOff, Shield, CheckCircle } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("admin@acmecorp.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #1D4ED8 100%)" }}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "#3B82F6" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{ background: "#8B5CF6" }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "#3B82F6" }}
          >
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <div style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, lineHeight: 1 }}>
              ApproveFlow
            </div>
            <div style={{ color: "#93C5FD", fontSize: "0.7rem", fontWeight: 400, marginTop: 2 }}>
              Enterprise Workflow
            </div>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10">
          <h1 style={{ color: "#FFFFFF", fontWeight: 700, lineHeight: 1.2, marginBottom: "1rem" }}>
            Streamline Your<br />
            <span style={{ color: "#93C5FD" }}>Approval Workflows</span>
          </h1>
          <p style={{ color: "#94A3B8", lineHeight: 1.6, maxWidth: "380px", marginBottom: "2.5rem" }}>
            Manage requests, automate approvals, and track progress — all in one powerful enterprise platform.
          </p>

          <div className="space-y-3">
            {[
              "Multi-level approval chains",
              "Real-time status tracking",
              "Audit trail & compliance",
              "Role-based access control",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle size={16} style={{ color: "#34D399", flexShrink: 0 }} />
                <span style={{ color: "#CBD5E1", fontSize: "0.875rem" }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div
          className="relative z-10 p-5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p style={{ color: "#CBD5E1", fontSize: "0.875rem", lineHeight: 1.6, fontStyle: "italic" }}>
            "ApproveFlow cut our procurement cycle time by 68% and gave leadership real-time visibility into every pending decision."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#2563EB", color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}
            >
              SR
            </div>
            <div>
              <div style={{ color: "#F1F5F9", fontSize: "0.875rem", fontWeight: 600 }}>Sarah Reynolds</div>
              <div style={{ color: "#64748B", fontSize: "0.75rem" }}>COO, Meridian Technologies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "#2563EB" }}
            >
              <Shield size={18} className="text-white" />
            </div>
            <span style={{ fontWeight: 700, color: "var(--foreground)" }}>ApproveFlow</span>
          </div>

          <div className="mb-8">
            <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem" }}>
              Welcome back
            </h2>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.9rem" }}>
              Sign in to your workspace to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" style={{ color: "var(--foreground)", display: "block" }}>
                Work email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl transition-all outline-none"
                style={{
                  background: "var(--input-background)",
                  border: "1.5px solid var(--border)",
                  color: "var(--foreground)",
                }}
                placeholder="you@company.com"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" style={{ color: "var(--foreground)" }}>
                  Password
                </label>
                <button
                  type="button"
                  style={{ color: "var(--primary)", fontSize: "0.8rem", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-12 rounded-xl transition-all outline-none"
                  style={{
                    background: "var(--input-background)",
                    border: "1.5px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => setRemember(!remember)}
                className="w-4 h-4 rounded flex items-center justify-center cursor-pointer flex-shrink-0 transition-colors"
                style={{
                  background: remember ? "#2563EB" : "transparent",
                  border: `2px solid ${remember ? "#2563EB" : "var(--border)"}`,
                }}
              >
                {remember && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                onClick={() => setRemember(!remember)}
                className="cursor-pointer select-none"
                style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}
              >
                Keep me signed in for 30 days
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              style={{
                background: loading ? "#93C5FD" : "#2563EB",
                color: "#FFFFFF",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign in to workspace"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem", textAlign: "center" }}>
              Demo credentials pre-filled — click{" "}
              <strong style={{ color: "var(--foreground)" }}>Sign in</strong> to explore
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            {["SOC 2", "ISO 27001", "GDPR"].map((cert) => (
              <span
                key={cert}
                className="px-2.5 py-1 rounded-md"
                style={{
                  background: "var(--muted)",
                  color: "var(--muted-foreground)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
