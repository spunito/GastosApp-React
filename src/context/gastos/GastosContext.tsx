import type { GastosForm, IngresoForm } from '@/types/gastos';
import { createContext } from 'react';

// Definición de tipos para el contexto de autenticación
export type IncomeState = {
  ingresos: {id:string, title:string, description:string ,amount:number,date:string}[];
  gastos: {id:string, category:string ,description:string ,amount:number,date:string}[];
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
  Remove_Expense:(id:string) => void;
  Remove_Income:(id:string) => void;
  Update_Expense:(id:string,data:GastosForm ) => void;  
  Update_Income:(id:string,data:IngresoForm ) => void;
  resetGastos:() => void;
  refreshData:() => void;
}

export const GastosContext = createContext<GastosContextProps>({} as GastosContextProps);