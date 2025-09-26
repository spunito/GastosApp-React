import { Home, Plus, LogOut, TrendingUp, DollarSign, History, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import { useContext, useState } from "react"
import { AuthContext } from "@/context/auth/AuthContext"
import { GastosContext } from "@/context/gastos/GastosContext"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: "general", label: "General", icon: Home },
  ]

  const menuExpense = [
    { id: "add-expense", label: "Agregar Gastos", icon: Plus },
    { id: "expense-history", label: "Historial de Gastos", icon: History },
  ]

  const menuIncome = [
    { id: "add-income", label: "Agregar Ingresos", icon: DollarSign },
    { id: "income-history", label: "Historial de Ingresos", icon: History },
  ]

  const [openExpense, setOpenExpense] = useState(false)
  const [openIncome, setOpenIncome] = useState(false)
  const { resetGastos } = useContext(GastosContext);
  const { onLogout, state } = useContext(AuthContext)

  return (
    <div className="w-72 h-screen bg-green-800 flex flex-col shadow-xl border-r border-green-700">
      {/* Header */}
      <div className="p-8 border-b border-green-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">GastosApp</h2>
            <p className="text-sm text-green-200">Gestión Financiera {state.user?.name}</p>
          </div>
        </div>
      </div>

      {/* Menú principal */}
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

          {/* Opción con submenu: Gastos */}
          <Button
            variant="ghost"
            className="w-full justify-between h-14 text-white hover:bg-green-700 transition-all duration-200 rounded-lg font-medium text-base"
            onClick={() => setOpenExpense(!openExpense)}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-700 flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span>Gastos</span>
            </div>
            {openExpense ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
          {openExpense && (
            <div className="ml-12 space-y-1">
              {menuExpense.map((item) => {
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-12 text-green-100 hover:bg-green-700 transition-all duration-200 rounded-lg text-sm",
                      activeSection === item.id && "bg-green-600 text-white shadow-md",
                    )}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <span>{item.label}</span>
                  </Button>
                )
              })}
            </div>
          )}

          {/* Opción con submenu: Ingresos */}
          <Button
            variant="ghost"
            className="w-full justify-between h-14 text-white hover:bg-green-700 transition-all duration-200 rounded-lg font-medium text-base"
            onClick={() => setOpenIncome(!openIncome)}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-700 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span>Ingresos</span>
            </div>
            {openIncome ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
          {openIncome && (
            <div className="ml-12 space-y-1">
              {menuIncome.map((item) => {
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-12 text-green-100 hover:bg-green-700 transition-all duration-200 rounded-lg text-sm",
                      activeSection === item.id && "bg-green-600 text-white shadow-md",
                    )}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <span>{item.label}</span>
                  </Button>
                )
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-green-700">
        <Button
          variant="ghost"
          className="w-full justify-start gap-4 h-14 text-white hover:bg-red-600 transition-all duration-200 rounded-lg font-medium text-base"
          onClick={resetGastos}
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
