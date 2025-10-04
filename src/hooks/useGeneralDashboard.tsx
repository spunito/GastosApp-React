import { GastosContext } from "@/context/gastos/GastosContext"
import { pastDate, todayDate } from "@/helpers/date"
import type { Movements } from "@/types/gastos"
import { useContext, useRef, useState } from "react"

const categories = [
  { name: "Alimentación", color: "bg-amber-500" },
  { name: "Transporte", color: "bg-rose-500" },
  { name: "Entretenimiento", color: "bg-violet-500" },
  { name: "Vivienda", color: "bg-emerald-500" },
  { name: "Servicios básicos", color: "bg-sky-500" },
  { name: "Salud", color: "bg-cyan-500" },
  { name: "Otros", color: "bg-indigo-500" },

]

export const useGeneralDashboard = () => {
  const { state } = useContext(GastosContext)

  // Estados para filtro por fecha
  const [fechaInicio, setFechaInicio] = useState(pastDate())
  const [fechaFin, setFechaFin] = useState(todayDate())

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
  const fechaInicioRef = useRef<HTMLInputElement>(null);
  const fechaFinRef = useRef<HTMLInputElement>(null);

  return {
    fechaFin,
    fechaInicio,
    totalIngresos,
    filtrarPorFecha,
    AllMovements,
    categoriasArray,
    setFechaInicio,
    setFechaFin,
    gastosFiltrados,
    ingresosFiltrados,
    totalGastos,
    state,
    fechaInicioRef,
    fechaFinRef
  }
}
