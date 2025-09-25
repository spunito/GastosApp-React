import Swal from "sweetalert2"



export const successCreate = (message:string) => {
    Swal.fire({
      title: `${message} creado `,
      text: `El ${message} creado ha sido creado exitosamente`,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
}

export const failureCreate = (message:string) => {
    Swal.fire({
      title: `Error en ${message} `,
      text: `El ${message} no ha podido ser creado`,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
}

export const invalidAmount = () => {
  Swal.fire({
        title: "Error",
        text: "El monto debe ser mayor a 0",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
}

