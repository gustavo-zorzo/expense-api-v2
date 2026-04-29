import z from "zod";

export const createExpenseInput = z.object({
  title: z.string(),
  amount: z.number(),
  category: z.string(),
  date: z.coerce.date(),
});
