import { useContext } from "react";
import { Button } from "../ui/button"
import { CardContent, Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GastosContext } from "@/context/gastos/GastosContext";
import { useForm } from "react-hook-form";
import type { IngresoForm } from "@/types/gastos";


export const AddIncome = () => {

  const {Add_Income} = useContext(GastosContext);
  const {handleSubmit , register} =  useForm<IngresoForm>();
  return (
      <div className="p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground mb-6">Agregar Nuevo Ingreso</h1>

          <Card>
            <CardHeader>
              <CardTitle>Registrar Ingreso</CardTitle>
              <CardDescription>Ingresa los detalles de tu nuevo ingreso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(Add_Income)}>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Título del Ingreso</label>
                <input
                {...register("title")}
                  type="text"
                  className="w-full p-3 border border-border rounded-lg bg-input text-foreground"
                  placeholder="Ej: Salario mensual, Freelance, Venta"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Monto</label>
                  <input
                    {...register("amountIngresos")}
                    type="number"
                    className="w-full p-3 border border-border rounded-lg bg-input text-foreground"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Fecha</label>
                  <input 
                  type="date" className="w-full p-3 border border-border rounded-lg bg-input text-foreground" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descripción</label>
                <textarea
                  {...register("description")}
                  className="w-full p-3 border border-border rounded-lg bg-input text-foreground h-24 resize-none"
                  placeholder="Descripción adicional del ingreso..."
                />
              </div>

              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700" type="submit">Guardar Ingreso</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
}
