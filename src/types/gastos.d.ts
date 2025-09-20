export type GastosForm = {
    category: string
    description: string
    amountGastos: number
   
}

export type IngresoForm = {
    title:string
    category: string
    description: string
    amountIngresos: number
}    

export type UserSession = {
  id: string;
  name: string;
  email: string;
  gastos: { id: string; category: string; description: string; amountGastos: number; date: string }[];
  ingresos: { id: string; title: string; category: string; description: string; amountIngresos: number; date: string }[];
};