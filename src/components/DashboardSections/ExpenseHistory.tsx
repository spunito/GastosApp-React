"use client"

// ExpenseHistory.tsx - Versión responsive
import { Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { useContext, useState } from "react"
import { GastosContext } from "@/context/gastos/GastosContext"
import { formatDDMMYYYY } from "../../helpers/date"
import { formatCLP } from "@/helpers/amountConverter"
import { EditExpenseModal } from "../EditModal/EditExpenseModal"

interface Expense {
  id: string
  category: string
  description: string
  amount: number
  date: string
}

export const ExpenseHistory = () => {
  const { state, Remove_Expense } = useContext(GastosContext)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingExpense(null)
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Historial de Gastos</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Gestiona y edita tus gastos registrados</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-white">Todos los Gastos</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-slate-400">
            Lista completa de gastos con opciones de edición
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.gastos.length === 0 ? (
            <p className="text-center text-slate-400 py-8 text-sm sm:text-base">No hay gastos registrados</p>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {state.gastos.map((expense) => (
                <div
                  key={expense.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:bg-slate-900/80 hover:border-slate-600 transition-all gap-3 sm:gap-0"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm sm:text-base truncate">{expense.description}</h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full border border-red-500/30">
                        {expense.category}
                      </span>
                      <span className="text-xs text-slate-400">{formatDDMMYYYY(expense.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 sm:ml-4">
                    <div className="text-lg sm:text-xl font-bold text-red-400">-{formatCLP(expense.amount)}</div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleEdit(expense)}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 bg-slate-800 border-slate-700 text-slate-300 hover:text-blue-400 hover:border-blue-500 hover:bg-slate-800"
                      >
                        <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>

                      <Button
                        onClick={() => Remove_Expense(expense.id)}
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

      {editingExpense && <EditExpenseModal expense={editingExpense} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}
