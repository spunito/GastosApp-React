import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Sidebar } from "@/components/Sidebar"
import { DashboardContent } from "@/components/DashboardContent"

export const DashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("general")
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    navigate("/login")
  }

  return (
    <div className="flex h-screen" style={{ background: "rgb(var(--color-background))" }}>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <DashboardContent activeSection={activeSection} />
      </div>
    </div>
  )
}
