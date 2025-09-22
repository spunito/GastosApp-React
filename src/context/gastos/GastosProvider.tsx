import { useContext, useEffect, useReducer } from 'react';
import { initialGastosState, GastosContext } from './GastosContext';
import { GastosReducer } from './GastosReducer';
import type { GastosForm, IngresoForm} from '@/types/gastos';
import Swal from 'sweetalert2';
import { api } from '@/api/api';
import { AuthContext } from '../auth/AuthContext';


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

    const { category, description, amount } = data;
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
          amount,
          date: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
      type: "ADD_EXPENSE",
      payload: {
        id: crypto.randomUUID(),
        category,
        description,
        amount,
        date: new Date().toISOString(), // mejor que "hola"
      },
    });
    console.log(res)

    Swal.fire({
      title: "Gasto creado",
      text: "El gasto ha sido creado exitosamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
      
    } catch (error) {
      console.log(error)
    }
    
  };

  const Add_Income = (data: IngresoForm) => {
    const { description, amount , title } = data;

    if (amount <= 0) {
      Swal.fire({
        title: "Error",
        text: "El monto debe ser mayor a 0",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    dispatch({type: "ADD_INCOME", 
      payload: {
        id: crypto.randomUUID(), 
        title,  
        description, 
        amount, 
        date: new Date().toISOString()}});
    console.log(state)
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