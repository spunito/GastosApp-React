import { Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { useContext, useState } from "react"
import { GastosContext } from "@/context/gastos/GastosContext"
import { formatDDMMYYYY } from "../../helpers/date"
import { formatCLP } from "@/helpers/amountConverter"
import { EditExpenseModal } from "../EditModal/EditExpenseModal"
import type { Expense } from "@/types/gastos"

const ITEMS_PER_PAGE = 5

export const ExpenseHistory = () => {
  const { state, Remove_Expense } = useContext(GastosContext)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingExpense(null)
  }

  // 🔹 Paginación
  const totalPages = Math.ceil(state.gastos.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentExpenses = state.gastos.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Título */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Historial de Gastos</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Gestiona y edita tus gastos registrados</p>
      </div>

      {/* Contenedor principal */}
      <Card
        className="
          bg-slate-800/50 border-slate-700 backdrop-blur-sm 
          h-[calc(100vh-200px)] min-h-[500px] 
          flex flex-col justify-between
        "
      >
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-white">Todos los Gastos</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-slate-400">
            Lista completa de gastos con opciones de edición
          </CardDescription>
        </CardHeader>

        {/* Lista de gastos con scroll */}
        <CardContent className="flex-1 overflow-y-auto pr-2">
          {state.gastos.length === 0 ? (
            <p className="text-center text-slate-400 py-8 text-sm sm:text-base">No hay gastos registrados</p>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {currentExpenses.map((expense) => (
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
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 bg-slate-800 border-slate-700 text-slate-300 hover:text-red-400 hover:border-red-500"
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

        {/* 🔹 Controles de paginación fijos abajo */}
        <div className="p-4 border-t border-slate-700 flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-blue-500"
          >
            Anterior
          </Button>

          <span className="text-slate-300 text-sm">
            Página {currentPage} de {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-blue-500"
          >
            Siguiente
          </Button>
        </div>
      </Card>

      {editingExpense && <EditExpenseModal expense={editingExpense} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}
