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

type AppState = {
  accounts: Account[]
  addEntry: (payload: Omit<Entry, "id">) => void
  updateEntry: (changedEntry: Entry) => void
  removeEntry: (payload: { accountId: string; entryId: string }) => void
}

type GetActionPayload<T extends string> = Parameters<AppState[T]>[0]
