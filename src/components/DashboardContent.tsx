import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PieChart, Calendar, Plus } from "lucide-react"
import { useContext } from "react"
import { GastosContext } from "@/context/gastos/GastosContext"
import { useForm } from "react-hook-form"
import type { GastosForm } from "@/types/gastos"

interface DashboardContentProps {
  activeSection: string
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ activeSection }) => {
  const { Add_Expense } = useContext(GastosContext);
  const { handleSubmit, register } =  useForm<GastosForm>()
  if (activeSection === "add-expense") {




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
                    {...register("amount")}
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

  // General Dashboard
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard de Gastos</h1>
        <p className="text-muted-foreground">Resumen de tu actividad financiera</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos del Mes</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$2,450.00</div>
            <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">$5,200.00</div>
            <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">$2,750.00</div>
            <p className="text-xs text-muted-foreground">Disponible</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Transacciones Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { desc: "Supermercado Central", amount: "-$85.50", category: "Alimentación", date: "Hoy" },
                { desc: "Gasolina Shell", amount: "-$45.00", category: "Transporte", date: "Ayer" },
                { desc: "Netflix Suscripción", amount: "-$12.99", category: "Entretenimiento", date: "2 días" },
                { desc: "Salario Empresa", amount: "+$2,600.00", category: "Ingreso", date: "3 días" },
                { desc: "Farmacia San Pablo", amount: "-$28.75", category: "Salud", date: "4 días" },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{transaction.desc}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                  <div className={`font-bold ${transaction.amount.startsWith("+") ? "text-chart-2" : "text-primary"}`}>
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Gastos por Categoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Alimentación", amount: "$890.00", percentage: 36, color: "bg-chart-1" },
                { category: "Transporte", amount: "$650.00", percentage: 27, color: "bg-chart-2" },
                { category: "Entretenimiento", amount: "$420.00", percentage: 17, color: "bg-chart-3" },
                { category: "Salud", amount: "$290.00", percentage: 12, color: "bg-chart-4" },
                { category: "Otros", amount: "$200.00", percentage: 8, color: "bg-chart-5" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{item.category}</span>
                    <span className="font-medium text-foreground">{item.amount}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {/* <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-16 flex flex-col gap-2">
                <Plus className="h-5 w-5" />
                Agregar Gasto
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2 bg-transparent">
                <PieChart className="h-5 w-5" />
                Ver Reportes
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2 bg-transparent">
                <Calendar className="h-5 w-5" />
                Crear Presupuesto
              </Button>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
