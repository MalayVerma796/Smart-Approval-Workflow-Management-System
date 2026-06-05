import { useState } from "react";
import { Bell, Shield, Users, Palette, Globe, Webhook, ChevronRight, CheckCircle2 } from "lucide-react";

const settingsSections = [
  { id: "general", label: "General", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Access", icon: Shield },
  { id: "team", label: "Team & Permissions", icon: Users },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Webhook },
];

const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
  <button
    onClick={() => onChange(!value)}
    className="relative w-10 h-5 rounded-full transition-all"
    style={{
      background: value ? "#2563EB" : "var(--switch-background)",
      border: "none",
      cursor: "pointer",
      flexShrink: 0,
    }}
  >
    <div
      className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
      style={{
        background: "#fff",
        left: value ? "calc(100% - 18px)" : "2px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }}
    />
  </button>
);

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [settings, setSettings] = useState({
    workspaceName: "Acme Corporation",
    subdomain: "acme",
    timezone: "America/New_York",
    language: "English",
    emailNotifs: true,
    pushNotifs: true,
    weeklyDigest: true,
    approvalReminders: true,
    slackNotifs: false,
    twoFactor: true,
    sessionTimeout: "8 hours",
    auditLog: true,
    ssoEnabled: false,
    theme: "light",
    compactMode: false,
    animations: true,
  });

  const setSetting = (key: keyof typeof settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Sidebar */}
      <div
        className="w-56 flex-shrink-0 overflow-y-auto"
        style={{ borderRight: "1px solid var(--border)", background: "var(--card)" }}
      >
        <div className="p-4">
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8 }}>
            SETTINGS
          </p>
          <div className="space-y-0.5">
            {settingsSections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
                style={{
                  background: activeSection === id ? "var(--accent)" : "transparent",
                  color: activeSection === id ? "#1D4ED8" : "var(--muted-foreground)",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => { if (activeSection !== id) e.currentTarget.style.background = "var(--muted)"; }}
                onMouseLeave={(e) => { if (activeSection !== id) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon size={15} />
                <span style={{ fontSize: "0.875rem", fontWeight: activeSection === id ? 600 : 400 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 max-w-2xl">

        {activeSection === "general" && (
          <div className="space-y-5">
            <div>
              <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: 4 }}>General Settings</h2>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>Workspace-wide configuration</p>
            </div>

            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--border)", background: "var(--card)" }}
            >
              {[
                { label: "Workspace Name", desc: "Displayed across the platform", key: "workspaceName", type: "input" },
                { label: "Subdomain", desc: "Your workspace URL prefix", key: "subdomain", type: "input", suffix: ".approveflow.io" },
                { label: "Timezone", desc: "Used for timestamps and scheduling", key: "timezone", type: "select", options: ["America/New_York", "America/Los_Angeles", "Europe/London", "Asia/Tokyo"] },
                { label: "Language", desc: "Interface display language", key: "language", type: "select", options: ["English", "Spanish", "French", "German", "Japanese"] },
              ].map((item, i, arr) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between px-5 py-4 gap-4"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}
                >
                  <div className="flex-1 min-w-0">
                    <div style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}>{item.label}</div>
                    <div style={{ color: "var(--muted-foreground)", fontSize: "0.78rem" }}>{item.desc}</div>
                  </div>
                  <div className="flex-shrink-0">
                    {item.type === "input" ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={(settings as any)[item.key]}
                          onChange={(e) => setSetting(item.key as any, e.target.value)}
                          className="px-3 py-1.5 rounded-lg outline-none text-right"
                          style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem", width: 160 }}
                        />
                        {item.suffix && <span style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>{item.suffix}</span>}
                      </div>
                    ) : (
                      <select
                        value={(settings as any)[item.key]}
                        onChange={(e) => setSetting(item.key as any, e.target.value)}
                        className="px-3 py-1.5 rounded-lg outline-none"
                        style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }}
                      >
                        {item.options?.map(o => <option key={o}>{o}</option>)}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="px-5 py-2.5 rounded-xl"
              style={{ background: "#2563EB", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}
            >
              Save Changes
            </button>
          </div>
        )}

        {activeSection === "notifications" && (
          <div className="space-y-5">
            <div>
              <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: 4 }}>Notifications</h2>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>Control how and when you're notified</p>
            </div>

            {[
              { section: "Email", items: [
                { label: "Email Notifications", desc: "Receive email updates for request activity", key: "emailNotifs" },
                { label: "Weekly Digest", desc: "Summary of weekly workflow activity", key: "weeklyDigest" },
                { label: "Approval Reminders", desc: "Remind approvers of pending decisions", key: "approvalReminders" },
              ]},
              { section: "Other Channels", items: [
                { label: "Push Notifications", desc: "Browser push notifications", key: "pushNotifs" },
                { label: "Slack Integration", desc: "Send notifications to your Slack workspace", key: "slackNotifs" },
              ]},
            ].map(({ section, items }) => (
              <div key={section}>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 10 }}>
                  {section.toUpperCase()}
                </p>
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid var(--border)", background: "var(--card)" }}
                >
                  {items.map((item, i) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between px-5 py-4"
                      style={{ borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none" }}
                    >
                      <div>
                        <div style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}>{item.label}</div>
                        <div style={{ color: "var(--muted-foreground)", fontSize: "0.78rem" }}>{item.desc}</div>
                      </div>
                      <Toggle value={(settings as any)[item.key]} onChange={(v) => setSetting(item.key as any, v)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "security" && (
          <div className="space-y-5">
            <div>
              <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: 4 }}>Security & Access</h2>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>Manage authentication and security policies</p>
            </div>

            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--border)", background: "var(--card)" }}
            >
              {[
                { label: "Two-Factor Authentication", desc: "Require 2FA for all workspace members", key: "twoFactor", type: "toggle" },
                { label: "Single Sign-On (SSO)", desc: "Connect your identity provider (SAML/OIDC)", key: "ssoEnabled", type: "toggle" },
                { label: "Audit Log", desc: "Log all user actions for compliance", key: "auditLog", type: "toggle" },
              ].map((item, i, arr) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between px-5 py-4"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}
                >
                  <div>
                    <div style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}>{item.label}</div>
                    <div style={{ color: "var(--muted-foreground)", fontSize: "0.78rem" }}>{item.desc}</div>
                  </div>
                  <Toggle value={(settings as any)[item.key]} onChange={(v) => setSetting(item.key as any, v)} />
                </div>
              ))}
            </div>

            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--border)", background: "var(--card)" }}
            >
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <div style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}>Session Timeout</div>
                  <div style={{ color: "var(--muted-foreground)", fontSize: "0.78rem" }}>Automatically sign out inactive users</div>
                </div>
                <select
                  value={settings.sessionTimeout}
                  onChange={(e) => setSetting("sessionTimeout", e.target.value)}
                  className="px-3 py-1.5 rounded-lg outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }}
                >
                  {["1 hour", "4 hours", "8 hours", "24 hours", "Never"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div
              className="p-4 rounded-xl flex items-start gap-3"
              style={{ background: "#D1FAE5", border: "1px solid #A7F3D0" }}
            >
              <CheckCircle2 size={16} style={{ color: "#059669", flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ color: "#065F46", fontSize: "0.875rem", fontWeight: 600, marginBottom: 2 }}>Security Posture: Strong</p>
                <p style={{ color: "#047857", fontSize: "0.8rem", lineHeight: 1.5 }}>
                  2FA is enabled, session management is configured, and audit logging is active.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === "appearance" && (
          <div className="space-y-5">
            <div>
              <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: 4 }}>Appearance</h2>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>Customize your workspace look and feel</p>
            </div>

            <div>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 10 }}>
                THEME
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "light", label: "Light", preview: "#F8FAFC" },
                  { id: "dark", label: "Dark", preview: "#0B1120" },
                  { id: "auto", label: "System", preview: "linear-gradient(135deg, #F8FAFC 50%, #0B1120 50%)" },
                ].map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSetting("theme", t.id)}
                    className="rounded-xl cursor-pointer overflow-hidden transition-all"
                    style={{
                      border: `2px solid ${settings.theme === t.id ? "#2563EB" : "var(--border)"}`,
                    }}
                  >
                    <div className="h-20" style={{ background: t.preview }} />
                    <div className="px-3 py-2 flex items-center justify-between" style={{ background: "var(--card)" }}>
                      <span style={{ color: "var(--foreground)", fontSize: "0.82rem", fontWeight: 500 }}>{t.label}</span>
                      {settings.theme === t.id && <CheckCircle2 size={14} style={{ color: "#2563EB" }} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--border)", background: "var(--card)" }}
            >
              {[
                { label: "Compact Mode", desc: "Reduce spacing for denser information display", key: "compactMode" },
                { label: "Animations", desc: "Enable micro-animations and transitions", key: "animations" },
              ].map((item, i, arr) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between px-5 py-4"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}
                >
                  <div>
                    <div style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}>{item.label}</div>
                    <div style={{ color: "var(--muted-foreground)", fontSize: "0.78rem" }}>{item.desc}</div>
                  </div>
                  <Toggle value={(settings as any)[item.key]} onChange={(v) => setSetting(item.key as any, v)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeSection === "team" || activeSection === "integrations") && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--muted)" }}>
              {activeSection === "team" ? <Users size={24} style={{ color: "var(--muted-foreground)" }} /> : <Webhook size={24} style={{ color: "var(--muted-foreground)" }} />}
            </div>
            <h3 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 8 }}>
              {activeSection === "team" ? "Team & Permissions" : "Integrations"}
            </h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", maxWidth: 300, lineHeight: 1.6 }}>
              {activeSection === "team"
                ? "Manage team roles and permissions from the Users page."
                : "Connect Slack, Jira, and other tools. Available in the Enterprise plan."}
            </p>
            {activeSection === "integrations" && (
              <button
                className="mt-5 px-5 py-2.5 rounded-xl"
                style={{ background: "#2563EB", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}
              >
                Upgrade to Enterprise
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
