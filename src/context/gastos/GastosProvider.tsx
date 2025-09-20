import { useContext, useEffect, useReducer } from 'react';
import { initialGastosState, GastosContext } from './GastosContext';
import { GastosReducer } from './GastosReducer';
import type { GastosForm, IngresoForm, UserSession } from '@/types/gastos';
import Swal from 'sweetalert2';
import { api } from '@/api/api';
import { AuthContext } from '../auth/AuthContext';


interface Props {
  children: React.ReactNode;
}

export const GastosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(GastosReducer, initialGastosState);
  const {state : authState} =useContext(AuthContext);
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!authState.user?.token) return;

        const [gastosRes, ingresosRes] = await Promise.all([
          api.get('/gastos'),
          api.get('/ingresos')
        ]);

        // Mapear datos del backend (que usan 'amount') a tu estructura frontend
        const gastosMappeados = gastosRes.data.map((gasto: any) => ({
          id: gasto.id,
          category: gasto.category,
          description: gasto.description,
          amountGastos: gasto.amount, // Mapear backend.amount -> frontend.amountGastos
          date: gasto.date
        }));

        const ingresosMappeados = ingresosRes.data.map((ingreso: any) => ({
          id: ingreso.id,
          title: ingreso.title,
          category: ingreso.category,
          description: ingreso.description,
          amountIngresos: ingreso.amount, // Mapear backend.amount -> frontend.amountIngresos
          date: ingreso.date
        }));

        dispatch({
          type: 'LOAD_DATA',
          payload: {
            gastos: gastosMappeados,
            ingresos: ingresosMappeados,
          },
        });
      } catch (err) {
        console.error('Error al cargar datos:', err);
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar los datos",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    };

    loadData();
  }, [authState.user?.token]);

  const Add_Expense = (data: GastosForm) => {

    const { category, description, amountGastos } = data;
    if (amountGastos <= 0) {
      Swal.fire({
        title: "Error",
        text: "El monto debe ser mayor a 0",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    try {

      const res = api.post('/gastos',{
        category,
        description,
        amount: Number(amountGastos),
        date: new Date().toISOString()
      });

      dispatch({
      type: "ADD_EXPENSE",
      payload: {
        id: crypto.randomUUID(),
        category,
        description,
        amountGastos: Number(amountGastos),
        date: new Date().toISOString(), // mejor que "hola"
      },
    });

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
    const { category, description, amountIngresos , title } = data;

    if (amountIngresos <= 0) {
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
        category, 
        description, 
        amountIngresos: Number(amountIngresos), 
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