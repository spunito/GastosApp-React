// components/EditExpenseModal.tsx
import { useForm, Controller } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { GastosContext } from '@/context/gastos/GastosContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogOverlay
} from '@/components/ui/dialog';

const CATEGORIES = ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Otros'];

interface EditExpenseModalProps {
  expense: {
    id: string;
    category: string;
    description: string;
    amount: number;
    date: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

interface EditExpenseForm {
  category: string;
  description: string;
  amount: number;
  date: string;
}

export const EditExpenseModal = ({ expense, isOpen, onClose }: EditExpenseModalProps) => {
  const { Update_Expense } = useContext(GastosContext);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<EditExpenseForm>();

  useEffect(() => {
    if (isOpen && expense) {
      reset({
        category: expense.category,
        description: expense.description,
        amount: expense.amount,
        date: expense.date.split('T')[0]
      });
    }
  }, [isOpen, expense, reset]);

  const onSubmit = async (data: EditExpenseForm) => {
    try {
      await Update_Expense(expense.id, data);
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
            <Label htmlFor="category">Categoría</Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: 'La categoría es obligatoria' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <span className="text-red-500 text-sm">{errors.category.message}</span>
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