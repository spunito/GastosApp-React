import type React from "react"
import { AddExpense, AddIncome, ExpenseHistory, GeneralDashboard } from "./DashboardSections"
import { IncomeHistory } from "./DashboardSections/IncomeHistory"

interface DashboardContentProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ 
  activeSection,

}) => {
  
  if (activeSection === "add-income") {
    return <AddIncome />
  }

  if (activeSection === "income-history") {
    return <IncomeHistory />
  }

  if (activeSection === "expense-history") {
    return <ExpenseHistory />
  }

  if (activeSection === "add-expense") {
    return <AddExpense />
  }

  return <GeneralDashboard />
}