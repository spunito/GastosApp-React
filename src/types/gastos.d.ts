export type GastosForm = {
    category: string
    description: string
    amount: number,
    date:string
   
}

export type IngresoForm = {
    title:string
    category: string
    description: string
    amount: number,
    date:string
}    

export type UserSession = {
  id: string;
  name: string;
  email: string;
  gastos: { id: string; category: string; description: string; amount: number; date: string }[];
  ingresos: { id: string; title: string; category: string; description: string; amount: number; date: string }[];
};