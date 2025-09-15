import type React from "react"
import { AddExpense, AddIncome, ExpenseHistory, GeneralDashboard } from "./DashboardSections"


interface DashboardContentProps {
  activeSection: string
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ activeSection }) => {
  
  // New section for adding income
  if (activeSection === "add-income") {
    return (
      <AddIncome />
    )
  }

  // New section for expense history with edit/delete functionality
  if (activeSection === "expense-history") {
    return (
      <ExpenseHistory />
    )
  }
  // New section for adding expenses
  if (activeSection === "add-expense") {
    return (
      <AddExpense />
    )
  }

  // General Dashboard
  return(
    <GeneralDashboard />
  )
  
}
