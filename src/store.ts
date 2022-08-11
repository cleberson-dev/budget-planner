import createStore from "zustand"
import { persist } from "zustand/middleware"
import { mountStoreDevtool } from "simple-zustand-devtools"
import * as data from "./data"
import { v4 as uuid } from "uuid"

type AppState = {
  accounts: Account[]
  addEntry: (payload: Omit<Entry, "id">) => void
}

type DeserializedAccount = Omit<Account, "createdAt" | "entries"> & {
  createdAt: string
  entries: (Omit<Entry, "createdAt"> & { createdAt: string })[]
}

const useStore = createStore(
  persist<AppState>(
    (set) => ({
      accounts: data.accounts,
      addEntry: (payload) =>
        set((state) => ({
          accounts: state.accounts.map((account) => {
            const newEntry: Entry = {
              id: uuid(),
              createdAt: new Date(),
              accountId: payload.accountId,
              description: payload.description,
              type: payload.type,
              value: payload.value,
            }

            if (payload.accountId !== account.id) {
              return account
            }

            return { ...account, entries: [newEntry, ...account.entries] }
          }),
        })),
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

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useStore)
}

export default useStore
