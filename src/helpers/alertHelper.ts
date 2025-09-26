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

export const confirmDelete = async (type: 'Gasto' | 'Ingreso') => {
  return await Swal.fire({
    title: '¿Estás seguro?',
    text: `¡No podrás revertir la eliminación de este ${type.toLowerCase()}!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar!',
    cancelButtonText: 'Cancelar'
  });
};

export const successDelete = (type: 'Gasto' | 'Ingreso') => {
  Swal.fire({
    title: '¡Eliminado!',
    text: `El ${type.toLowerCase()} ha sido eliminado correctamente.`,
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
};

export const failureDelete = (type: 'Gasto' | 'Ingreso') => {
  Swal.fire({
    title: 'Error',
    text: `No se pudo eliminar el ${type.toLowerCase()}. Inténtalo de nuevo.`,
    icon: 'error',
    confirmButtonText: 'Aceptar'
  });
};

export const successUpdate = (type: 'Gasto' | 'Ingreso') => {
  Swal.fire({
    title: 'Actualizado!',
    text: `El ${type.toLowerCase()} ha sido actualizado correctamente.`,
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
};

export const failureUpdate = (type: 'Gasto' | 'Ingreso') => {
  Swal.fire({
    title: 'Error',
    text: `No se pudo actualizar el ${type.toLowerCase()}. Inténtalo de nuevo.`,
    icon: 'error',
    confirmButtonText: 'Aceptar'
  });
};

