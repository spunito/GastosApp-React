import { Calendar, CreditCard, DollarSign, PieChart, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { formatCLP } from "@/helpers/amountConverter"
import { formatDDMMYYYY } from "@/helpers/date"
import { useGeneralDashboard} from "@/hooks/useGeneralDashboard"

export const GeneralDashboard = () => {
  const {
    AllMovements,
    categoriasArray,
    fechaFin,
    fechaInicio,
    setFechaFin,
    setFechaInicio,
    totalGastos,
    totalIngresos,
    state,
    fechaFinRef,
    fechaInicioRef,
    userState
  } = useGeneralDashboard();

  return (

    <div className="p-8 bg-slate-950 min-h-screen">
      {userState.user?.email === "amanda.trujilloe@gmail.com" ? <p>{'Te quiero Amandaaaaaaa <3'} </p> : ''}
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard de Gastos</h1>
        <p className="text-slate-400">Resumen de tu actividad financiera</p>
      </div>

      {/* Filtro de fechas */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1" >
          <label className="block text-sm text-slate-400 mb-1">Desde</label>
          <input
            onClick={() => fechaInicioRef.current?.showPicker()}
            ref={fechaInicioRef}
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full border border-slate-700 bg-slate-900 text-white rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-slate-400 mb-1">Hasta</label>
          <input
            onClick={() => fechaFinRef.current?.showPicker()}
            ref={fechaFinRef}
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full border border-slate-700 bg-slate-900 text-white rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos</CardTitle>
            <TrendingDown className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{formatCLP(totalGastos)}</div>
            <p className="text-xs text-slate-400">En el rango seleccionado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">{formatCLP(totalIngresos)}</div>
            <p className="text-xs text-slate-400">En el rango seleccionado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{formatCLP(totalIngresos - totalGastos)}</div>
            <p className="text-xs text-slate-400">Disponible</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
            <CreditCard className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{state.gastos.length}</div>
            <p className="text-xs text-slate-400">En el rango seleccionado</p>
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
                  className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
                >
                  <div>
                    {mov.type === "ingreso" ? (
                      <p className="font-medium text-white">{mov.title}</p>
                    ) : (
                      <p className="font-medium text-white">{mov.description}</p>
                    )}

                    <p className="text-sm text-slate-400">
                      {mov.type === "gasto"
                        ? `${mov.category} • ${formatDDMMYYYY(mov.date)}`
                        : `Ingreso • ${formatDDMMYYYY(mov.date)}`}
                    </p>
                  </div>
                  <div className={`font-bold ${mov.type === "gasto" ? "text-red-400" : "text-emerald-400"}`}>
                    {mov.type === "gasto" ? `-${formatCLP(mov.amount)}` : `+${formatCLP(mov.amount)}`}
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
                    <span className="text-white">{item.category}</span>
                    <span className="font-medium text-white">{formatCLP(item.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
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
