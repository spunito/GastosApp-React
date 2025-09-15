import type { IncomeState } from './GastosContext';

type AuthAction =
  | { type: 'ADD_EXPENSE'; payload: { id:string,category:string ,description:string ,amount:number,date:string}}
  | { type: 'REMOVE_EXPENSE' };


export const GastosReducer = (state: IncomeState, action: AuthAction): IncomeState => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        gastos: [...state.gastos , action.payload]
        
      };
    case 'REMOVE_EXPENSE':
      return {
        ...state
      };
    default:
      return state;
  }
};

