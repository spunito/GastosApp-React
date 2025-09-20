import { Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent, Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { useContext } from 'react';
import { GastosContext } from '@/context/gastos/GastosContext';

export const ExpenseHistory = () => {
  const mockExpenses = [
      {
        id: 1,
        title: "Supermercado Central",
        amount: 85.5,
        category: "Alimentación",
        date: "2024-01-15",
        description: "Compras semanales",
      },
      {
        id: 2,
        title: "Gasolina Shell",
        amount: 45.0,
        category: "Transporte",
        date: "2024-01-14",
        description: "Tanque lleno",
      },
      {
        id: 3,
        title: "Netflix Suscripción",
        amount: 12.99,
        category: "Entretenimiento",
        date: "2024-01-13",
        description: "Suscripción mensual",
      },
      {
        id: 4,
        title: "Farmacia San Pablo",
        amount: 28.75,
        category: "Salud",
        date: "2024-01-12",
        description: "Medicamentos",
      },
      {
        id: 5,
        title: "Restaurante La Plaza",
        amount: 65.0,
        category: "Alimentación",
        date: "2024-01-11",
        description: "Cena familiar",
      },
    ]

    const {state} = useContext(GastosContext);

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
            <div className="space-y-4">
              {mockExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{expense.title}</h3>
                        <p className="text-sm text-muted-foreground">{expense.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {expense.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{expense.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-red-600">-${expense.amount.toFixed(2)}</div>
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

