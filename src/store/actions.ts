import { v4 as uuid } from "uuid"

type Action<T extends string> = (
  state: AppState,
  payload: GetActionPayload<T>
) => any

export const addEntry: Action<"addEntry"> = (state, payload) => ({
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
})

export const updateEntry: Action<"updateEntry"> = (state, payload) => ({
  accounts: state.accounts.map((acc) => {
    if (acc.id !== payload.accountId) return acc

    return {
      ...acc,
      entries: acc.entries.map((entry) => {
        if (entry.id !== payload.id) return entry
        return payload
      }),
    }
  }),
})

export const removeEntry: Action<"removeEntry"> = (state, payload) => ({
  accounts: state.accounts.map((acc) => {
    if (acc.id !== payload.accountId) return acc

    return {
      ...acc,
      entries: acc.entries.filter((entry) => entry.id !== payload.entryId),
    }
  }),
})
