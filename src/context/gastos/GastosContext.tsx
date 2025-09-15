import type { GastosForm, IngresoForm } from '@/types/gastos';
import { createContext } from 'react';

// Definición de tipos para el contexto de autenticación
export type IncomeState = {
  ingresos: {title:string, id:string, category:string ,description:string ,amountIngresos:number,date:string}[];
  gastos: {id:string, category:string ,description:string ,amountGastos:number,date:string}[];
  presupuesto: number;
  balance: number;
}

export const initialGastosState: IncomeState = {
    ingresos:[],
    gastos:[],
    presupuesto:0 ,
    balance:0,

}

export type GastosContextProps = {
  state: IncomeState;
  dispatch: React.Dispatch<any>;
  Add_Expense:(data:GastosForm) => void;
  Add_Income:(data:IngresoForm) => void;
}

export const GastosContext = createContext<GastosContextProps>({} as GastosContextProps);