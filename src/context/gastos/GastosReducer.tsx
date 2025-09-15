import type { IncomeState } from './GastosContext';

type AuthAction =
  | { type: 'ADD_EXPENSE'; payload: { name: string; token: string , id: string; email: string;} }
  | { type: 'REMOVE_EXPENSE' };


export const GastosReducer = (state: IncomeState, action: AuthAction): IncomeState => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        
      };
    case 'REMOVE_EXPENSE':
      return {
        ...state
      };
    default:
      return state;
  }
};

