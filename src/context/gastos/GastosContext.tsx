import type { GastosForm } from '@/types/gastos';
import { createContext } from 'react';

// Definición de tipos para el contexto de autenticación
export type IncomeState = {
  ingresos: number;
  gastos: {id:string, category:string ,description:string ,amount:number,date:string}[];
  presupuesto: number;
  balance: number;
}

export const initialGastosState: IncomeState = {
    ingresos: 0,
    gastos:[],
    presupuesto:0 ,
    balance:0,

}

export type GastosContextProps = {
  state: IncomeState;
  dispatch: React.Dispatch<any>;
  Add_Expense:(data:GastosForm) => void;
}

export const GastosContext = createContext<GastosContextProps>({} as GastosContextProps);