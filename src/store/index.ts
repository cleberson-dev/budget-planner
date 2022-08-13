import createStore from "zustand"
import { persist } from "zustand/middleware"
import { mountStoreDevtool } from "simple-zustand-devtools"
import * as data from "../data"
import { v4 as uuid } from "uuid"

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
              createdAt: payload.createdAt,
              accountId: payload.accountId,
              description: payload.description,
              value: payload.value,
              paid: payload.paid,
            }

            if (payload.accountId !== account.id) {
              return account
            }

            return { ...account, entries: [newEntry, ...account.entries] }
          }),
        })),
      updateEntry: (changedEntry) =>
        set((state) => ({
          accounts: state.accounts.map((acc) => {
            if (acc.id !== changedEntry.accountId) return acc

            return {
              ...acc,
              entries: acc.entries.map((entry) => {
                if (entry.id !== changedEntry.id) return entry
                return changedEntry
              }),
            }
          }),
        })),
      removeEntry: (accountId: string, entryId: string) =>
        set((state) => ({
          accounts: state.accounts.map((acc) => {
            if (acc.id !== accountId) return acc

            return {
              ...acc,
              entries: acc.entries.filter((entry) => entry.id !== entryId),
            }
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