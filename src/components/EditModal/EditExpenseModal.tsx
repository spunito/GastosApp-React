"use client"

// components/EditExpenseModal.tsx
import { useForm, Controller } from "react-hook-form"
import { useContext, useEffect, useRef } from "react"
import { GastosContext } from "@/context/gastos/GastosContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogOverlay } from "@/components/ui/dialog"

const CATEGORIES = ["Alimentación", "Transporte", "Entretenimiento", "Salud", "Vivienda", "Servicios básicos", "Otros"]

interface EditExpenseModalProps {
  expense: {
    id: string
    category: string
    description: string
    amount: number
    date: string
  }
  isOpen: boolean
  onClose: () => void
}

interface EditExpenseForm {
  category: string
  description: string
  amount: number
  date: string
}

export const EditExpenseModal = ({ expense, isOpen, onClose }: EditExpenseModalProps) => {
  const { Update_Expense } = useContext(GastosContext)
  const fechaGastos = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditExpenseForm>()

  useEffect(() => {
    if (isOpen && expense) {
      reset({
        category: expense.category,
        description: expense.description,
        amount: expense.amount,
        date: expense.date.split("T")[0],
      })
    }
  }, [isOpen, expense, reset])

  const onSubmit = async (data: EditExpenseForm) => {
    try {
      await Update_Expense(expense.id, data)
      onClose()
    } catch (error) {
      console.error("Error en el formulario:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/70 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 shadow-2xl text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-slate-100">Editar Gasto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-200">
              Descripción
            </Label>
            <Input
              id="description"
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500 focus:ring-blue-500"
              {...register("description", {
                required: "La descripción es obligatoria",
                minLength: {
                  value: 2,
                  message: "La descripción debe tener al menos 2 caracteres",
                },
              })}
            />
            {errors.description && <span className="text-red-400 text-sm">{errors.description.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-slate-200">
              Monto
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500 focus:ring-blue-500"
              {...register("amount", {
                required: "El monto es obligatorio",
                min: {
                  value: 0.01,
                  message: "El monto debe ser mayor a 0",
                },
              })}
            />
            {errors.amount && <span className="text-red-400 text-sm">{errors.amount.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-200">
              Categoría
            </Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "La categoría es obligatoria" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category} className="focus:bg-slate-700 focus:text-slate-100">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <span className="text-red-400 text-sm">{errors.category.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-slate-200">
              Fecha
            </Label>
            <Input
              id="date"
              type="date"
              {...register("date", { required: "La fecha es obligatoria" })}
              ref={(e) => {
                register("date").ref(e)  // react-hook-form
                fechaGastos.current = e   // tu ref para showPicker
              }}
              onClick={() => fechaGastos.current?.showPicker()}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.date && <span className="text-red-400 text-sm">{errors.date.message}</span>}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="bg-slate-800 border-slate-700 text-slate-100 hover:bg-slate-700"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isSubmitting ? "Actualizando..." : "Actualizar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
