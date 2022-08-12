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
  description: string
  value: number
  createdAt: Date
  accountId: string
  paid: boolean
}

type EntryTypes = "EXPENSE" | "INCOME"

type Account = {
  id: string
  name: string
  createdAt: Date
  entries: Entry[]
}
