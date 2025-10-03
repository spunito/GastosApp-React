"use client"

// components/EditIncomeModal.tsx
import { useForm } from "react-hook-form"
import { useContext, useEffect } from "react"
import { GastosContext } from "@/context/gastos/GastosContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogOverlay } from "@/components/ui/dialog"

interface EditIncomeModalProps {
  income: {
    id: string
    title: string
    description?: string
    amount: number
    date: string
  }
  isOpen: boolean
  onClose: () => void
}

interface EditIncomeForm {
  title: string
  description?: string
  amount: number
  date: string
}

export const EditIncomeModal = ({ income, isOpen, onClose }: EditIncomeModalProps) => {
  const { Update_Income } = useContext(GastosContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditIncomeForm>()

  useEffect(() => {
    if (isOpen && income) {
      reset({
        title: income.title,
        description: income.description || "",
        amount: income.amount,
        date: income.date.split("T")[0],
      })
    }
  }, [isOpen, income, reset])

  const onSubmit = async (data: EditIncomeForm) => {
    try {
      await Update_Income(income.id, data)
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
          <DialogTitle className="text-slate-100">Editar Ingreso</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-200">
              Título
            </Label>
            <Input
              id="title"
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500 focus:ring-blue-500"
              {...register("title", {
                required: "El título es obligatorio",
                minLength: {
                  value: 2,
                  message: "El título debe tener al menos 2 caracteres",
                },
              })}
            />
            {errors.title && <span className="text-red-400 text-sm">{errors.title.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-200">
              Descripción
            </Label>
            <Input
              id="description"
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500 focus:ring-blue-500"
              {...register("description")}
            />
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
            <Label htmlFor="date" className="text-slate-200">
              Fecha
            </Label>
            <Input
              id="date"
              type="date"
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500 focus:ring-blue-500"
              {...register("date", {
                required: "La fecha es obligatoria",
              })}
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
