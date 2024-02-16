type DeserializedAccount = Omit<Account, "createdAt" | "entries"> & {
  createdAt: string
  entries: (Omit<Entry, "createdAt"> & { createdAt: string })[]
}

export const deserialize = (str: string) => {
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
}
