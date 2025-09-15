import { useContext } from "react";
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { GastosContext } from "@/context/gastos/GastosContext";
import type { GastosForm } from "@/types/gastos";
import { useForm } from "react-hook-form";

export const AddExpense = () => {

  const { Add_Expense } = useContext(GastosContext);
  const { handleSubmit, register } =  useForm<GastosForm>()
  
  return (
      <div className="p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground mb-6">Agregar Nuevo Gasto</h1>

          <Card>
            <CardHeader>
              <CardTitle>Registrar Gasto</CardTitle>
              <CardDescription>Ingresa los detalles de tu nuevo gasto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

              <form onSubmit={handleSubmit(Add_Expense)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descripción</label>
                
                <input
                  {...register("description")}
                  type="text"
                  className="w-full p-3 border border-border rounded-lg bg-input text-foreground"
                  placeholder="Ej: Almuerzo en restaurante"
                  
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Monto</label>
                  <input
                    {...register("amountGastos")}
                    type="number"
                    className="w-full p-3 border border-border rounded-lg bg-input text-foreground"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Categoría</label>
                  <select 
                  {...register("category")}
                  className="w-full p-3 border border-border rounded-lg bg-input text-foreground">
                    <option value=''>Selecciona una categoría</option>
                    <option value='Alimentación'>Alimentación</option>
                    <option value='Transporte'>Transporte</option>
                    <option value='Entretenimiento'>Entretenimiento</option>
                    <option value='Salud'>Salud</option>
                    <option value='Otros'>Otros</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Fecha</label>
                <input type="date" className="w-full p-3 border border-border rounded-lg bg-input text-foreground" />
              </div>

              <Button className="w-full mt-6 cursor-pointer" type="submit">Guardar Gasto</Button>
              </form>
            </CardContent>
          </Card>
          
        </div>
      </div>
    )
  }

