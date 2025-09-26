// components/EditExpenseModal.tsx
import { useForm, Controller } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { GastosContext } from '@/context/gastos/GastosContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogOverlay
} from '@/components/ui/dialog';



interface EditIncomeModalProps {
  income: {
    id: string;
    title: string;
    description: string;
    amount: number;
    date: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

interface EditIncomeForm {
  title: string;
  description: string;
  amount: number;
  date: string;
}

export const EditIncomeModal = ({ income: income, isOpen, onClose }: EditIncomeModalProps) => {
  const { Update_Income } = useContext(GastosContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<EditIncomeForm>();

  useEffect(() => {
    if (isOpen && income) {
      reset({
        title: income.title,
        description: income.description,
        amount: income.amount,
        date: income.date.split('T')[0]
      });
    } 
  }, [isOpen, income, reset]);

  const onSubmit = async (data: EditIncomeForm) => {
    try {
      await Update_Income(income.id, data);
      onClose();
    } catch (error) {
      console.error('Error en el formulario:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      
      <DialogOverlay className="bg-black/50" /> 
      <DialogContent className="sm:max-w-[425px] bg-white border shadow-lg">
        <DialogHeader>
          <DialogTitle>Editar Gasto</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
            <Label htmlFor="title">Descripción</Label>
            <Input
              id="title"
              {...register('title', {
                required: 'El titulo es obligatorio',
                minLength: {
                  value: 2,
                  message: 'La descripción debe tener al menos 2 caracteres'
                }
              })}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              {...register('description', {
                required: 'La descripción es obligatoria',
                minLength: {
                  value: 2,
                  message: 'La descripción debe tener al menos 2 caracteres'
                }
              })}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...register('amount', {
                required: 'El monto es obligatorio',
                min: {
                  value: 0.01,
                  message: 'El monto debe ser mayor a 0'
                }
              })}
            />
            {errors.amount && (
              <span className="text-red-500 text-sm">{errors.amount.message}</span>
            )}
          </div>


          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              {...register('date', {
                required: 'La fecha es obligatoria'
              })}
            />
            {errors.date && (
              <span className="text-red-500 text-sm">{errors.date.message}</span>
            )}
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Actualizando...' : 'Actualizar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};