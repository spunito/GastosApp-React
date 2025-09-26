import { useContext, useEffect, useReducer } from 'react';
import { initialGastosState, GastosContext } from './GastosContext';
import { GastosReducer } from './GastosReducer';
import type { GastosForm, IngresoForm} from '@/types/gastos';
import { api } from '@/api/api';
import { AuthContext } from '../auth/AuthContext';
import { confirmDelete, failureCreate, failureDelete, failureUpdate, invalidAmount, successCreate, successDelete, successUpdate } from '@/helpers/alertHelper';


interface Props {
  children: React.ReactNode;
}

export const GastosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(GastosReducer, initialGastosState);
  const {state : authState ,loadUserData ,onLogout} =useContext(AuthContext);

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

  const Remove_Expense = async (id: string) => {
    try {
      const result = await confirmDelete('Gasto');

      if (result.isConfirmed) {
        await api.delete(`/gastos/${id}`);
        
        dispatch({
          type: 'REMOVE_EXPENSE',
          payload: { id }
        });

        successDelete('Gasto');
      }

      refreshData()
    } catch (error) {
      console.error('Error al eliminar gasto:', error);
      failureDelete('Gasto');
    }
  };

  const Remove_Income = async (id: string) => {
    try {
      const result = await confirmDelete('Ingreso');

      if (result.isConfirmed) {
        await api.delete(`/ingresos/${id}`);
        
        dispatch({
          type: 'REMOVE_INCOME',
          payload: { id }
        });

        successDelete('Ingreso');
      }
      refreshData()
      
    } catch (error) {
      console.error('Error al eliminar ingreso:', error);
      failureDelete('Ingreso');
    }
  };

  const Update_Income = async(id:string , data:IngresoForm) => {
    const {title , amount , description, date} = data

    if(amount <= 0){
      invalidAmount()
      return;
    }

    try {
      await api.put(`/ingresos/${id}`,{
        title,
        description,
        amount:Number(amount),
        date:date,
      });
      dispatch({
        type:"UPDATE_INCOME",
        payload:{
          id,
          title,
          description,
          amount:Number(amount),
          date:date,
          
        }
      })
      successUpdate('Ingreso')
      refreshData()
      
    } catch (error) {
      console.error('Error al actualizar el ingreso',error)
      failureUpdate('Ingreso')
      
    }

  }

 const Update_Expense = async (id: string, data: GastosForm) => {
  const { category, description, amount, date } = data;
  
  if (amount <= 0) {
    invalidAmount();
    return;
  }

  try {
    await api.put(`/gastos/${id}`, {
      category,
      description,
      amount: Number(amount),
      date: date,
    });

    dispatch({
      type: "UPDATE_EXPENSE",
      payload: {
        id,
        category,
        description,
        amount: Number(amount),
        date: date,
        
      }
    });

    successUpdate('Gasto');
    
    } catch (error) {
      console.error('Error al actualizar gasto:', error);
      failureUpdate('Gasto');
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

  const resetGastos = async () => {
    await onLogout();
    dispatch({ type: 'NULL_DATA' });
  };

  return (
    <GastosContext.Provider value={{
      state,
      dispatch,
      
      
      Add_Expense,
      Add_Income,
      Remove_Expense,
      Remove_Income, 
      Update_Income,
      Update_Expense,
      resetGastos,
      refreshData
    }}>
      {children}
    </GastosContext.Provider>
  );
}