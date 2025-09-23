import { Calendar, CreditCard, DollarSign, PieChart, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { GastosContext } from "@/context/gastos/GastosContext"
import { useContext } from "react"

export const GeneralDashboard = () => {

  const {state} = useContext(GastosContext)
  const ingresosReduce = state.ingresos.reduce((acc,num) => acc + num.amount , 0)
  const gastosReduce = state.gastos.reduce((acc,num) => acc + num.amount , 0)

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
              <div className="text-2xl font-bold text-primary">${gastosReduce}</div>
              <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-2">${ingresosReduce}</div>
              <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">${state.balance}</div>
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
                {state.gastos.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{item.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.category} • {item.date}
                      </p>
                    </div>
                    <div className={`font-bold text-green-800`}>
                      ${item.amount}
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
