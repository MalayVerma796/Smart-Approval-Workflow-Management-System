import { useEffect, useMemo, useState } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { AnalyticsPage } from './figma-ui/AnalyticsPage.tsx'
import { ApprovalsPage } from './figma-ui/ApprovalsPage.tsx'
import { CreateRequestPage } from './figma-ui/CreateRequestPage.tsx'
import { DashboardPage } from './figma-ui/DashboardPage.tsx'
import { LoginPage } from './figma-ui/LoginPage.tsx'
import { MyRequestsPage } from './figma-ui/MyRequestsPage.tsx'
import { SettingsPage } from './figma-ui/SettingsPage.tsx'
import { Sidebar } from './figma-ui/Sidebar.tsx'
import { TopBar } from './figma-ui/TopBar.tsx'

const pageByPath = {
  '/dashboard': 'dashboard',
  '/create-request': 'create-request',
  '/my-requests': 'my-requests',
  '/approvals': 'approvals',
  '/analytics': 'analytics',
  '/settings': 'settings',
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginRoute loggedIn={loggedIn} onLogin={() => setLoggedIn(true)} />}
      />
      <Route
        path="*"
        element={
          <ProtectedApp
            dark={dark}
            loggedIn={loggedIn}
            onToggleDark={() => setDark((value) => !value)}
          />
        }
      />
    </Routes>
  )
}

function LoginRoute({ loggedIn, onLogin }) {
  const navigate = useNavigate()

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <LoginPage
      onLogin={() => {
        onLogin()
        navigate('/dashboard', { replace: true })
      }}
    />
  )
}

function ProtectedApp({ dark, loggedIn, onToggleDark }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentPage = useMemo(
    () => pageByPath[location.pathname] ?? 'dashboard',
    [location.pathname],
  )

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: 'var(--background)' }}
    >
      <Sidebar
        currentPage={currentPage}
        dark={dark}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(page) => navigate(page === 'dashboard' ? '/dashboard' : `/${page}`)}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar
          currentPage={currentPage}
          dark={dark}
          onMenuClick={() => setSidebarOpen((open) => !open)}
          onToggleDark={onToggleDark}
        />

        <main
          className="flex flex-1 flex-col overflow-hidden"
          style={{ background: 'var(--background)' }}
        >
          <Routes>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-request" element={<CreateRequestPage />} />
            <Route path="/my-requests" element={<MyRequestsPage />} />
            <Route path="/approvals" element={<ApprovalsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
