export type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
export type ExpenseCreationProps = Omit<Expense, "id" | "createdAt" | "updatedAt">;
export type ExpenseUpdateProps = Partial<ExpenseCreationProps>;
