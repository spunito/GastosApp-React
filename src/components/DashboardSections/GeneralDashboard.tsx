import { useState, useContext } from "react"
import { Calendar, CreditCard, DollarSign, PieChart, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { GastosContext } from "@/context/gastos/GastosContext"
import { formatCLP } from "@/helpers/amountConverter"
import { formatDDMMYYYY } from "@/helpers/date"
import type { Movements } from "@/types/gastos"

const categories = [
  { name: "Alimentación", color: "bg-yellow-500" },
  { name: "Transporte", color: "bg-red-500" },
  { name: "Entretenimiento", color: "bg-green-400" },
  { name: "Salud", color: "bg-blue-300" },
  { name: "Otros", color: "bg-purple-500" },
]

export const GeneralDashboard = () => {
  const { state } = useContext(GastosContext)

  // Estados para filtro por fecha
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")

  // Función para filtrar ingresos/gastos por rango
  const filtrarPorFecha = (items: any[]) => {
    if (!fechaInicio && !fechaFin) return items

    return items.filter((item) => {
      const fechaItem = new Date(item.date)
      const inicio = fechaInicio ? new Date(fechaInicio) : null
      const fin = fechaFin ? new Date(fechaFin) : null

      return (!inicio || fechaItem >= inicio) && (!fin || fechaItem <= fin)
    })
  }

  // Aplicar filtros
  const gastosFiltrados = filtrarPorFecha(state.gastos)
  const ingresosFiltrados = filtrarPorFecha(state.ingresos)

  // Totales
  const totalIngresos = ingresosFiltrados.reduce((acc, num) => acc + num.amount, 0)
  const totalGastos = gastosFiltrados.reduce((acc, num) => acc + num.amount, 0)

  // Movimientos combinados
  const AllMovements: Movements[] = [
    ...gastosFiltrados.map((g) => ({ ...g, type: "gasto" as const })),
    ...ingresosFiltrados.map((i) => ({ ...i, type: "ingreso" as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Gastos por categoría
  const gastosPorCategoria = gastosFiltrados.reduce((acc: Record<string, number>, gasto) => {
    acc[gasto.category] = (acc[gasto.category] || 0) + gasto.amount
    return acc
  }, {})

  const categoriasArray = categories.map((cat) => ({
    category: cat.name,
    amount: gastosPorCategoria[cat.name] || 0,
    percentage: totalGastos ? Math.round(((gastosPorCategoria[cat.name] || 0) / totalGastos) * 100) : 0,
    color: cat.color,
  }))

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard de Gastos</h1>
        <p className="text-muted-foreground">Resumen de tu actividad financiera</p>
      </div>

      {/* Filtro de fechas */}
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex-1">
        <label className="block text-sm text-muted-foreground mb-1">Desde</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm text-muted-foreground mb-1">Hasta</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
    </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCLP(totalGastos)}</div>
            <p className="text-xs text-muted-foreground">En el rango seleccionado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{formatCLP(totalIngresos)}</div>
            <p className="text-xs text-muted-foreground">En el rango seleccionado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{formatCLP(totalIngresos - totalGastos)}</div>
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
            <p className="text-xs text-muted-foreground">En el rango seleccionado</p>
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
                    {mov.type === "ingreso" ? <p className="font-medium text-foreground">{mov.title}</p> : 
                    <p className="font-medium text-foreground">{mov.description}</p>}
                    
                    <p className="text-sm text-muted-foreground">
                      {mov.type === "gasto"
                        ? `${mov.category} • ${formatDDMMYYYY(mov.date)}`
                        : `Ingreso • ${formatDDMMYYYY(mov.date)}`}
                    </p>
                  </div>
                  <div
                    className={`font-bold ${mov.type === "gasto" ? "text-red-500" : "text-green-700"}`}
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
            <div className="space-y-4">
              {categoriasArray.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{item.category}</span>
                    <span className="font-medium text-foreground">{formatCLP(item.amount)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
