import { useContext, useEffect, useReducer } from 'react';
import { initialGastosState, GastosContext } from './GastosContext';
import { GastosReducer } from './GastosReducer';
import type { GastosForm, IngresoForm} from '@/types/gastos';
import Swal from 'sweetalert2';
import { api } from '@/api/api';
import { AuthContext } from '../auth/AuthContext';
import { failureCreate, successCreate } from '@/helpers/alertHelper';


interface Props {
  children: React.ReactNode;
}

export const GastosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(GastosReducer, initialGastosState);
  const {state : authState ,loadUserData} =useContext(AuthContext);
  const token = authState.user?.token
 

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
      Swal.fire({
        title: "Error",
        text: "El monto debe ser mayor a 0",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    try {

      const res = await api.post(
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
        date: date, // mejor que "hola"
      },
    });
    console.log(res)

    successCreate('Gasto')
      
    } catch (error) {
      console.log(error)
      failureCreate('Gasto')
    }
    
  };

  
  const Add_Income = async(data: IngresoForm) => {
    const { description, amount , title , date } = data;

    if (amount <= 0) {
      Swal.fire({
        title: "Error",
        text: "El monto debe ser mayor a 0",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      
      const res = await api.post('/ingresos',{
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
      
    } catch (error) {
      failureCreate('Ingreso')
      throw new Error('Error loco ' + error)
    }
  };



  return (
    <GastosContext.Provider value={{
      state,
      dispatch,
      Add_Expense,
      Add_Income
    }}>
      {children}
    </GastosContext.Provider>
  );
}