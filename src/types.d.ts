type Expense = {
  id: string
  description: string
  category: string
  createdAt: Date
  value: number
}

type Category = {
  id: string
  name: string
  color?: string
  icon?: string
}
