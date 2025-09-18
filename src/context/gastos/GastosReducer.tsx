import type { IncomeState } from './GastosContext';

type AuthAction =
  | { type: 'ADD_EXPENSE'; payload: { id:string,category:string ,description:string ,amountGastos:number,date:string}}
  | { type: 'ADD_INCOME'; payload: {id:string, title:string , category:string ,description:string ,amountIngresos:number,date:string}}
  | { type: 'REMOVE_EXPENSE' ; payload : { id: string } }
  | { type: 'ALL_EXPENSES'};


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
        const totalIngresos = newIngresos.reduce((acc, ingreso) => acc + ingreso.amountIngresos, 0);
        const totalGastos = state.gastos.reduce((acc, gasto) => acc + gasto.amountGastos, 0);
        return {
          ...state,
          ingresos: newIngresos,
          balance: totalIngresos - totalGastos  // Actualizar el balance  
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
        case 'ALL_EXPENSES':
    default:
      return state;
  }
};

