import type { IncomeState } from './GastosContext';

type AuthAction =
  | { type: 'ADD_EXPENSE'; payload: { id:string,category:string ,description:string ,amount:number,date:string}}
  | { type: 'ADD_INCOME'; payload: {id:string, title:string , description:string ,amount:number,date:string}}
  | { type: 'REMOVE_EXPENSE' ; payload : { id: string } }
  | { type: 'REMOVE_INCOME' ; payload : { id: string } }
  | { type: 'UPDATE_EXPENSE'; payload: { id:string,category:string ,description:string ,amount:number,date:string}} 
  | { type: 'UPDATE_INCOME'; payload: {id:string, title:string , description:string ,amount:number,date:string}}   
  | { type: 'NULL_DATA'; }
  | { type: 'LOAD_DATA'; payload: { gastos: IncomeState['gastos'], ingresos: IncomeState['ingresos'] } };



export const GastosReducer = (state: IncomeState, action: AuthAction): IncomeState => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const newGastos = [...state.gastos, action.payload];
      const totalGastosAfterAdd = newGastos.reduce((acc, gasto) => acc + gasto.amount, 0);
      const totalIngresosAfterAdd = state.ingresos.reduce((acc, ingreso) => acc + ingreso.amount, 0);
      
      return {
        ...state,
        gastos: newGastos,
        balance: totalIngresosAfterAdd - totalGastosAfterAdd
      };

    case 'ADD_INCOME':
        const newIngresos = [...state.ingresos, action.payload];
        const totalIngresosAfterIncomeAdd = newIngresos.reduce((acc, ingreso) => acc + ingreso.amount, 0);
        const totalGastosCurrent = state.gastos.reduce((acc, gasto) => acc + gasto.amount, 0);
        return {
          ...state,
          ingresos: newIngresos,
          balance: totalIngresosAfterIncomeAdd - totalGastosCurrent  // Actualizar el balance  
        }
    case 'REMOVE_EXPENSE':
          const updatedGastos = state.gastos.filter(gasto => gasto.id !== action.payload.id);
          const totalGastosAfterRemoval = updatedGastos.reduce((acc, gasto) => acc + gasto.amount, 0);
          const totalIngresosAfterRemoval = state.ingresos.reduce((acc, ingreso) => acc + ingreso.amount, 0);
          return {
            ...state,
            gastos: updatedGastos,
            balance: totalIngresosAfterRemoval - totalGastosAfterRemoval // Actualizar el balance
          };
    case 'REMOVE_INCOME':
      const updatedIngresos = state.ingresos.filter(ingreso => ingreso.id !== action.payload.id);
      const totalIngresosAfterIncomeRemoval = updatedIngresos.reduce((acc, ingreso) => acc + ingreso.amount, 0);
      const totalGastosAfterIncomeRemoval = state.gastos.reduce((acc, gasto) => acc + gasto.amount, 0);
      return {
        ...state,
        ingresos: updatedIngresos,
        balance: totalIngresosAfterIncomeRemoval - totalGastosAfterIncomeRemoval
      };

    case 'UPDATE_EXPENSE':
      const updatedGastosArray = state.gastos.map(gasto => 
        gasto.id === action.payload.id ? action.payload : gasto
      );
      const totalGastosAfterUpdate = updatedGastosArray.reduce((acc, gasto) => acc + gasto.amount, 0);
      const totalIngresosForExpenseUpdate = state.ingresos.reduce((acc, ingreso) => acc + ingreso.amount, 0);
      
      return {
        ...state,
        gastos: updatedGastosArray,
        balance: totalIngresosForExpenseUpdate - totalGastosAfterUpdate
      };

    case 'UPDATE_INCOME':
      const updatedIngresosArray = state.ingresos.map(ingreso => 
        ingreso.id === action.payload.id ? action.payload : ingreso
      );
      const totalIngresosAfterUpdate = updatedIngresosArray.reduce((acc, ingreso) => acc + ingreso.amount, 0);
      const totalGastosForIncomeUpdate = state.gastos.reduce((acc, gasto) => acc + gasto.amount, 0);
      
      return {
        ...state,
        ingresos: updatedIngresosArray,
        balance: totalIngresosAfterUpdate - totalGastosForIncomeUpdate
      };
    case 'NULL_DATA':
      return{
        ...state,
        ingresos:[],
        gastos:[],
        balance:0
      }

    case 'LOAD_DATA':
      const totalIngresos = action.payload.ingresos.reduce((acc:any, ingreso:any) => acc + ingreso.amount, 0);
      const totalGastos = action.payload.gastos.reduce((acc:any, gasto:any) => acc + gasto.amount, 0);
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

