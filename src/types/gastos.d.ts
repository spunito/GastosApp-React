export type GastosForm = {
    category: string
    description: string
    amount: number,
    date:string
   
}

export type IngresoForm = {
    title:string
    description?: string
    amount: number,
    date:string
}    

export type UserSession = {
  id: string;
  name: string;
  email: string;
  gastos: { id: string; category: string; description: string; amount: number; date: string }[];
  ingresos: { id: string; title: string; description?: string; amount: number; date: string }[];
};

export interface Movements {
  description?: string;
  amount: number;
  date: string;
  category?: string; // opcional, porque solo lo tienen los gastos
  title?:string
  type: "gasto" | "ingreso"; // para saber de dónde viene
}

export interface Expense {
  id: string
  category: string
  description: string
  amount: number
  date: string
}

export interface Income {
  id: string
  title: string
  description: string
  amount: number
  date: string
}