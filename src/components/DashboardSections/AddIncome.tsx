import { useContext } from "react"
import { Button } from "../ui/button"
import { CardContent, Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GastosContext } from "@/context/gastos/GastosContext"
import { useForm } from "react-hook-form"
import type { IngresoForm } from "@/types/gastos"
import { todayDate } from "@/helpers/date"

export const AddIncome = () => {
  const { Add_Income } = useContext(GastosContext)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IngresoForm>()

  const onSubmit = (data: IngresoForm) => {
    try {
      Add_Income(data)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6 text-center sm:text-left">Agregar Nuevo Ingreso</h1>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Registrar Ingreso</CardTitle>
            <CardDescription className="text-slate-400">Ingresa los detalles de tu nuevo ingreso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Título del Ingreso *</label>
                <input
                  {...register("title", { required: "El título es obligatorio", minLength: 1 })}
                  type="text"
                  className="w-full p-3 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  placeholder="Ej: Salario mensual, Freelance, Venta"
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
              </div>

              {/* Monto y Fecha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Monto (CLP) *</label>
                  <input
                    {...register("amount", {
                      required: "El monto es obligatorio",
                      min: { value: 1, message: "El monto debe ser mayor a 0" },
                    })}
                    type="number"
                    step={1}
                    onKeyDown={(e) => {
                      if (e.key === "." || e.key === ",") e.preventDefault()
                    }}
                    className="w-full p-3 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    placeholder="0"
                  />
                  {errors.amount && <p className="text-red-400 text-sm mt-1">{errors.amount.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Fecha *</label>
                  <input
                    {...register("date", { required: "La fecha es obligatoria" })}
                    type="date"
                    defaultValue={todayDate()}
                    className="w-full p-3 border border-slate-700 rounded-lg bg-slate-900 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                  {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Descripción</label>
                <textarea
                  {...register("description")}
                  className="w-full p-3 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder:text-slate-500 h-24 resize-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  placeholder="Descripción adicional del ingreso..."
                />
              </div>

              {/* Botón */}
              <Button
                className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white border-0"
                type="submit"
              >
                Guardar Ingreso
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
