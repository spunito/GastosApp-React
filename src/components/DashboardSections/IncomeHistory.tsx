"use client"

import { Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { useContext, useState } from "react"
import { GastosContext } from "@/context/gastos/GastosContext"
import { formatDDMMYYYY } from "../../helpers/date"
import { formatCLP } from "../../helpers/amountConverter"
import { EditIncomeModal } from "../EditModal/EditIncomeModal"

interface Income {
  id: string
  title: string
  description: string
  amount: number
  date: string
}

export const IncomeHistory = () => {
  const { state, Remove_Income } = useContext(GastosContext)
  const [editingIncome, setEditingIncome] = useState<Income | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEdit = (income: Income) => {
    setEditingIncome(income)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingIncome(null)
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Historial de Ingresos</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Gestiona y edita tus ingresos registrados</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-white">Todos los Ingresos</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-slate-400">
            Lista completa de ingresos con opciones de edición
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.ingresos.length === 0 ? (
            <p className="text-center text-slate-400 py-8 text-sm sm:text-base">No hay ingresos registrados</p>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {state.ingresos.map((income) => (
                <div
                  key={income.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:bg-slate-900/80 hover:border-slate-600 transition-all gap-3 sm:gap-0"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm sm:text-base truncate">{income.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 truncate">{income.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-slate-400">{formatDDMMYYYY(income.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 sm:ml-4">
                    <div className="text-lg sm:text-xl font-bold text-emerald-400">+{formatCLP(income.amount)}</div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleEdit(income)}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 bg-slate-800 border-slate-700 text-slate-300 hover:text-blue-400 hover:border-blue-500 hover:bg-slate-800"
                      >
                        <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>

                      <Button
                        onClick={() => Remove_Income(income.id)}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 bg-slate-800 border-slate-700 text-slate-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {editingIncome && <EditIncomeModal income={editingIncome} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}
