import type { IncomeState } from './GastosContext';

type AuthAction =
  | { type: 'ADD_EXPENSE'; payload: { id:string,category:string ,description:string ,amountGastos:number,date:string}}
  | { type: 'ADD_INCOME'; payload: {id:string, title:string , category:string ,description:string ,amountIngresos:number,date:string}}
  | { type: 'REMOVE_EXPENSE' ; payload : { id: string } }
  | { type: 'LOAD_DATA'; payload: { gastos: IncomeState['gastos'], ingresos: IncomeState['ingresos'] } };



export const GastosReducer = (state: IncomeState, action: AuthAction): IncomeState => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const newGastos = [...state.gastos, action.payload];
      
      return {
        ...state,
        gastos: newGastos
      };

    case 'ADD_INCOME':
        const newIngresos = [...state.ingresos, action.payload];
        const totalIngresosAfterAdd = newIngresos.reduce((acc, ingreso) => acc + ingreso.amountIngresos, 0);
        const totalGastosCurrent = state.gastos.reduce((acc, gasto) => acc + gasto.amountGastos, 0);
        return {
          ...state,
          ingresos: newIngresos,
          balance: totalIngresosAfterAdd - totalGastosCurrent  // Actualizar el balance  
        }
    case 'REMOVE_EXPENSE':
          const updatedGastos = state.gastos.filter(gasto => gasto.id !== action.payload.id);
          
          const totalGastosAfterRemoval = updatedGastos.reduce((acc, gasto) => acc + gasto.amountGastos, 0);
          const totalIngresosAfterRemoval = state.ingresos.reduce((acc, ingreso) => acc + ingreso.amountIngresos, 0);
          return {
            ...state,
            gastos: updatedGastos,
            balance: totalIngresosAfterRemoval - totalGastosAfterRemoval // Actualizar el balance
          };

    case 'LOAD_DATA':
      const totalIngresos = action.payload.ingresos.reduce((acc:any, ingreso:any) => acc + ingreso.amountIngresos, 0);
      const totalGastos = action.payload.gastos.reduce((acc:any, gasto:any) => acc + gasto.amountGastos, 0);
      return {
        ...state,
        gastos: action.payload.gastos,
        ingresos: action.payload.ingresos,
        balance: totalIngresos - totalGastos,
      };
    default:
      return state;
  }
};

