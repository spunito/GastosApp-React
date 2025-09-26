import { Calendar, CreditCard, DollarSign, PieChart, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { GastosContext } from "@/context/gastos/GastosContext"
import { useContext } from "react"
import { formatCLP } from "@/helpers/amountConverter"
import { formatDDMMYYYY } from "@/helpers/date"
import type { Movements } from "@/types/gastos"

const categories = [
  { name: "Alimentación", color: "bg-red-500" },       // rojo para comida
  { name: "Transporte", color: "bg-blue-500" },        // azul para transporte
  { name: "Entretenimiento", color: "bg-yellow-400" }, // amarillo para ocio
  { name: "Salud", color: "bg-green-500" },           // verde para salud
  { name: "Otros", color: "bg-purple-500" },          // morado para otros
];

export const GeneralDashboard = () => {

  const {state} = useContext(GastosContext)
  const totalIngresos = state.ingresos.reduce((acc,num) => acc + num.amount , 0)
  const totalGastos = state.gastos.reduce((acc,num) => acc + num.amount , 0)
  const AllMovements : Movements[] = [
        ...state.gastos.map(g => ({ ...g, type: "gasto" as const  })),
        ...state.ingresos.map(i => ({ ...i, type: "ingreso" as const }))
          ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const gastosPorCategoria = state.gastos.reduce((acc: Record<string, number>, gasto) => {
        acc[gasto.category] = (acc[gasto.category] || 0) + gasto.amount;
        return acc;
      }, {});      
  const categoriasArray = categories.map(cat => ({
      category: cat.name,
      amount: gastosPorCategoria[cat.name] || 0, // Si no hay gasto, ponemos 0
      percentage: totalGastos ? Math.round(((gastosPorCategoria[cat.name] || 0) / totalGastos) * 100) : 0,
      color: cat.color,
    }));



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
              <div className="text-2xl font-bold text-primary">{formatCLP(totalGastos)}</div>
              <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-2">{formatCLP(totalIngresos)}</div>
              <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">{ formatCLP(state.balance)}</div>
              <p className="text-xs text-muted-foreground">Disponible</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{state.gastos.length}</div>
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
               {AllMovements.slice(0, 5).map((mov, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">{mov.description}</p>

                      <p className="text-sm text-muted-foreground">
                        {mov.type === "gasto"
                          ? `${mov.category} • ${formatDDMMYYYY(mov.date)}`
                          : `Ingreso • ${formatDDMMYYYY(mov.date)}`}
                      </p>
                    </div>

                    <div
                      className={`font-bold ${
                        mov.type === "gasto" ? "text-red-500" : "text-green-700"
                      }`}
                    >
                      {mov.type === "gasto"
                        ? `-${formatCLP(mov.amount)}`
                        : `+${formatCLP(mov.amount)}`}
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
              <div className="space-y-4 ">
                {categoriasArray.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{item.category}</span>
                      <span className="font-medium text-foreground">{formatCLP(item.amount)}</span>
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
