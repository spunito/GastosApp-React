import { useContext, useEffect, useReducer } from 'react';
import { initialGastosState, GastosContext } from './GastosContext';
import { GastosReducer } from './GastosReducer';
import type { GastosForm, IngresoForm} from '@/types/gastos';
import { api } from '@/api/api';
import { AuthContext } from '../auth/AuthContext';
import { failureCreate, invalidAmount, successCreate } from '@/helpers/alertHelper';


interface Props {
  children: React.ReactNode;
}

export const GastosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(GastosReducer, initialGastosState);
  const {state : authState ,loadUserData} =useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!authState.user?.token) return;

      const data = await loadUserData(); // ← LLAMAR DIRECTAMENTE AL CALLBACK
      console.log(data.gastos , data.ingresos)
      
      dispatch({
        type: 'LOAD_DATA',
        payload: data,
      });
    };

    fetchData();
  }, [authState.user?.token, loadUserData]);

  const Add_Expense = async(data: GastosForm) => {

    const { category, description, amount , date} = data;
    if (amount <= 0) {
      invalidAmount()
      return;
    }
    try {

      await api.post(
        "/gastos",
        {
          category,
          description,
          amount:Number(amount),
          date: date,
        },
        
      );

      dispatch({
      type: "ADD_EXPENSE",
      payload: {
        id: crypto.randomUUID(),
        category,
        description,
        amount,
        date: date, 
      },
    });
    successCreate('Gasto')
    refreshData()
      
    } catch (error) {
      console.log(error)
      failureCreate('Gasto')
    }
    
  };

  
  const Add_Income = async(data: IngresoForm) => {
    const { description, amount , title , date } = data;

    if (amount <= 0) {
      invalidAmount()
      return;
    }

    try {
      
      await api.post('/ingresos',{
        id: crypto.randomUUID(),
        description,
        amount:Number(amount),
        title,
        date: date ,
      })
      successCreate('Ingreso')
      
      dispatch({type: "ADD_INCOME", 
        payload: {
          id: crypto.randomUUID(), 
          title,  
          description, 
          amount, 
          date: date}});
        refreshData()
      
    } catch (error) {
      failureCreate('Ingreso')
      throw new Error('Error loco ' + error)
    }
  };

  const refreshData = async () => {
    if (!authState.user?.token) return;
    
    const data = await loadUserData();
    dispatch({
      type: 'LOAD_DATA',
      payload: data,
    });
  };



  return (
    <GastosContext.Provider value={{
      state,
      dispatch,
      Add_Expense,
      Add_Income,
      refreshData
    }}>
      {children}
    </GastosContext.Provider>
  );
}