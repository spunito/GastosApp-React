import { useState } from "react"
import { Home, Plus, LogOut, TrendingUp, DollarSign, History, ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

interface MobileMenuProps {
  activeSection: string
  onSectionChange: (section: string) => void
  userName?: string
  onLogout: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  activeSection, 
  onSectionChange, 
  userName,
  onLogout 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openExpense, setOpenExpense] = useState(false)
  const [openIncome, setOpenIncome] = useState(false)

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

  const handleSectionChange = (section: string) => {
    onSectionChange(section)
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Header móvil con hamburguesa */}
      <div className="md:hidden sticky top-0 z-50 bg-green-800 border-b border-green-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">   
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">GastosApp</h2>
              <p className="text-xs text-green-200">{userName}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:bg-green-700"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/50" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="absolute right-0 top-[57px] w-72 h-[calc(100vh-57px)] bg-green-800 shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="p-4">
              <div className="space-y-2">
                {/* Menú General */}
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-12 text-white hover:bg-green-700 transition-all duration-200 rounded-lg",
                        activeSection === item.id && "bg-green-600 text-white shadow-md",
                      )}
                      onClick={() => handleSectionChange(item.id)}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          activeSection === item.id ? "bg-green-500" : "bg-green-700",
                        )}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span>{item.label}</span>
                    </Button>
                  )
                })}

                {/* Opción con submenu: Gastos */}
                <Button
                  variant="ghost"
                  className="w-full justify-between h-12 text-white hover:bg-green-700 transition-all duration-200 rounded-lg"
                  onClick={() => setOpenExpense(!openExpense)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                    <span>Gastos</span>
                  </div>
                  {openExpense ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
                {openExpense && (
                  <div className="ml-8 space-y-1">
                    {menuExpense.map((item) => (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-10 text-green-100 hover:bg-green-700 transition-all duration-200 rounded-lg text-sm",
                          activeSection === item.id && "bg-green-600 text-white shadow-md",
                        )}
                        onClick={() => handleSectionChange(item.id)}
                      >
                        <span>{item.label}</span>
                      </Button>
                    ))}
                  </div>
                )}

                {/* Opción con submenu: Ingresos */}
                <Button
                  variant="ghost"
                  className="w-full justify-between h-12 text-white hover:bg-green-700 transition-all duration-200 rounded-lg"
                  onClick={() => setOpenIncome(!openIncome)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <span>Ingresos</span>
                  </div>
                  {openIncome ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
                {openIncome && (
                  <div className="ml-8 space-y-1">
                    {menuIncome.map((item) => (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-10 text-green-100 hover:bg-green-700 transition-all duration-200 rounded-lg text-sm",
                          activeSection === item.id && "bg-green-600 text-white shadow-md",
                        )}
                        onClick={() => handleSectionChange(item.id)}
                      >
                        <span>{item.label}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Botón de Cerrar Sesión */}
              <div className="mt-6 pt-6 border-t border-green-700">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-12 text-white hover:bg-red-600 transition-all duration-200 rounded-lg"
                  onClick={() => {
                    onLogout()
                    setMobileMenuOpen(false)
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-white" />
                  </div>
                  <span>Cerrar Sesión</span>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}