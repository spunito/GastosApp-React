import { Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent, Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { useContext, useState } from 'react';
import { GastosContext } from '@/context/gastos/GastosContext';
import { formatDDMMYYYY } from '../../helpers/date';
import { formatCLP } from '../../helpers/amountConverter';
import { EditIncomeModal } from '../EditModal/EditIncomeModal';

interface Income {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
}

export const IncomeHistory = () => {

    const {state , Remove_Income} = useContext(GastosContext);
  
    const [editingIncome, setEditingIncome] = useState<Income | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleEdit = (income: Income) => { // Tipar mejor
      setEditingIncome(income);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setEditingIncome(null);
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Historial de Ingresos</h1>
          <p className="text-muted-foreground">Gestiona y edita tus gastos registrados</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Todos los Gastos</CardTitle>
            <CardDescription>Lista completa de gastos con opciones de edición</CardDescription>
          </CardHeader>
          <CardContent>
            {state.ingresos.length === 0 && (
                <h1>Hola</h1>
            )
          }
            <div className="space-y-4">
              {state.ingresos.map((income) => (
                <div
                  key={income.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{income.title}</h3>
                        <p className="text-sm text-muted-foreground">{income.description}</p>
                        <div className="flex items-center gap-4 mt-1">

                          <span className="text-xs text-muted-foreground">{formatDDMMYYYY(income.date)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">+{formatCLP(income.amount)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                    onClick={() => handleEdit(income)}
                    variant="outline" size="sm" className="h-9 w-9 p-0 bg-transparent hover:text-blue-600 cursor-pointer">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <p></p>
                    <Button
                      onClick={() => Remove_Income(income.id)}
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 hover:border-red-200 bg-transparent cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {editingIncome && (
                <EditIncomeModal
                  income={editingIncome}
                  isOpen={isModalOpen}
                  onClose={closeModal}
                />
              )}
      </div>
    )
  }

