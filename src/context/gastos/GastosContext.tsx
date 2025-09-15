import { createContext } from 'react';

// Definición de tipos para el contexto de autenticación
export type IncomeState = {
  ingresos: number;
  gastos: {category:string ,description:string ,amount:number,date:string}[];
  presupuesto: number;
  balance: number;
}

export const initialGastosState: IncomeState = {
    ingresos: 0,
    gastos:[],
    presupuesto:0 ,
    balance:0,

}

export type AuthContextProps = {
  state: IncomeState;
  dispatch: React.Dispatch<any>;
}

export const GastosContext = createContext<AuthContextProps>({} as AuthContextProps);