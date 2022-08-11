import createStore from "zustand"
import { persist } from "zustand/middleware"
import * as data from "./data"

type AppState = {
  accounts: Account[]
}

type DeserializedAccount = Omit<Account, "createdAt" | "entries"> & {
  createdAt: string
  entries: (Omit<Entry, "createdAt"> & { createdAt: string })[]
}

const store = createStore(
  persist<AppState>(
    () => ({
      accounts: data.accounts,
    }),
    {
      name: "app-storage",
      deserialize: (str) => {
        const deserializedAccounts = JSON.parse(str) as DeserializedAccount[]
        return deserializedAccounts.map(
          (acc): Account => ({
            ...acc,
            createdAt: new Date(acc.createdAt),
            entries: acc.entries.map((entry) => ({
              ...entry,
              createdAt: new Date(entry.createdAt),
            })),
          })
        ) as any
      },
    }
  )
)

export default store
