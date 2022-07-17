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

type Entry = {
  id: string
  type: EntryTypes
  description: string
  value: number
  createdAt: Date
  accountId: string
}

type EntryTypes = "EXPENSE" | "INCOME"
