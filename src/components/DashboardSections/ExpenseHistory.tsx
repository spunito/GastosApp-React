import { Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent, Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { useContext } from 'react';
import { GastosContext } from '@/context/gastos/GastosContext';
import { formatDDMMYYYY } from '../../helpers/date';
import { formatCLP } from '@/helpers/amountConverter';

export const ExpenseHistory = () => {
 
    const {state} = useContext(GastosContext);
    console.log(state.gastos)

    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Historial de Gastos</h1>
          <p className="text-muted-foreground">Gestiona y edita tus gastos registrados</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Todos los Gastos</CardTitle>
            <CardDescription>Lista completa de gastos con opciones de edición</CardDescription>
          </CardHeader>
          <CardContent>
            {state.gastos.length === 0 && (
                <h1>Hola</h1>
            )
          }
            <div className="space-y-4">
              {state.gastos.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{expense.description}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {expense.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{formatDDMMYYYY(expense.date)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-red-600">-{formatCLP(expense.amount)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0 bg-transparent">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <p></p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 hover:border-red-200 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

