import { createContext } from 'react';

// Definición de tipos para el contexto de autenticación
export type GastosState = {
    ingresos: number;
    gastos: number;
    presupuesto: number;
    balance: number;
    
}

export const initialGastosState: GastosState = {
    ingresos: 0,
    gastos:0 ,
    presupuesto:0 ,
    balance:0,

}

export type AuthContextProps = {
  state: GastosState;
  dispatch: React.Dispatch<any>;
}

export const GastosContext = createContext<AuthContextProps>({} as AuthContextProps);