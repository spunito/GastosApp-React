

export const formatCLP = (value:number):string => {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0, // CLP no usa decimales
  }).format(value);
}