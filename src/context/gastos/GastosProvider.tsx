import { useReducer } from 'react';
import { initialGastosState, GastosContext } from './GastosContext';
import { GastosReducer } from './GastosReducer';


interface Props {
  children: React.ReactNode;
}

export const GastosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(GastosReducer, initialGastosState);

  return (
    <GastosContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </GastosContext.Provider>
  );
}