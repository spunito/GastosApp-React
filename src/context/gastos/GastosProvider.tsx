import { useReducer } from 'react';
import { initialGastosState, GastosContext } from './GastosContext';
import { GastosReducer } from './GastosReducer';
import type { GastosForm, IngresoForm } from '@/types/gastos';
import Swal from 'sweetalert2';


interface Props {
  children: React.ReactNode;
}

export const GastosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(GastosReducer, initialGastosState);

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