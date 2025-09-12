import type React from "react"
import { useState } from "react"

import { Sidebar } from "@/components/Sidebar"
import { DashboardContent } from "@/components/DashboardContent"

export const DashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("general")


  return (
    <div className="flex h-screen" style={{ background: "rgb(var(--color-background))" }}>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection}  />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <DashboardContent activeSection={activeSection} />
      </div>
    </div>
  )
}
