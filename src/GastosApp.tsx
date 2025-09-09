import { RouterProvider } from 'react-router';
import { appRouter } from './router/app.router';

export const GastosApp = () => {
  return (
    <>
        <RouterProvider router={appRouter}/>
    </>
  )
}
