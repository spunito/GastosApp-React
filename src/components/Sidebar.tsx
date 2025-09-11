import { Home, Plus, LogOut,TrendingUp } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onLogout: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, onLogout }) => {
  const menuItems = [
    { id: "general", label: "General", icon: Home },
    { id: "add-expense", label: "Agregar Gastos", icon: Plus },
  ]

  return (
    <div className="w-72 h-screen bg-green-800 flex flex-col shadow-xl border-r border-green-700">
      <div className="p-8 border-b border-green-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">GastosApp</h2>
            <p className="text-sm text-green-200">Gestión Financiera</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-4 h-14 text-white hover:bg-green-700 transition-all duration-200 rounded-lg font-medium text-base",
                  activeSection === item.id && "bg-green-600 text-white shadow-md",
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    activeSection === item.id ? "bg-green-500" : "bg-green-700",
                  )}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </nav>

      <div className="p-6 border-t border-green-700">
        <Button
          variant="ghost"
          className="w-full justify-start gap-4 h-14 text-white hover:bg-red-600 transition-all duration-200 rounded-lg font-medium text-base"
          onClick={onLogout}
        >
          <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-white" />
          </div>
          <span className="text-white">Cerrar Sesión</span>
        </Button>
      </div>
    </div>
  )
}
