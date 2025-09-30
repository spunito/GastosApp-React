import type React from "react"
import { useState, useContext } from "react"
import { Sidebar } from "@/components/Sidebar"
import { MobileMenu } from "@/components/MobileMenu"
import { DashboardContent } from "@/components/DashboardContent"
import { AuthContext } from "@/context/auth/AuthContext"
import { GastosContext } from "@/context/gastos/GastosContext"

export const DashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("general")
  const { state } = useContext(AuthContext)
  const { resetGastos } = useContext(GastosContext)

  return (
    <div className="flex h-screen" style={{ background: "rgb(var(--color-background))" }}>
      {/* Sidebar desktop */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* MobileMenu - aparecerá en todas las secciones */}
        <MobileMenu 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userName={state.user?.name}
          onLogout={resetGastos}
        />

        <DashboardContent 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>
    </div>
  )
}