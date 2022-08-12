export const entriesSelector = (state: AppState) =>
  state.accounts
    .map((acc) => acc.entries)
    .flat()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

export const currentBalanceSelector = (state: AppState) => {
  const today = Date.now()

  return state.accounts.reduce(
    (prevTotalBalance, currentAccount) =>
      prevTotalBalance +
      currentAccount.entries
        .filter((entry) => entry.paid && entry.createdAt.getTime() <= today)
        .reduce(
          (prevAccountBalance, entry) => prevAccountBalance + entry.value,
          0
        ),
    0
  )
}

// Future Balance
export const futureBalanceSelector = (state: AppState) => {
  const currentMonth = new Date().getMonth()

  return state.accounts.reduce(
    (prevFutureBalance, currentAccount) =>
      prevFutureBalance +
      currentAccount.entries
        .filter((entry) => entry.createdAt.getMonth() === currentMonth)
        .reduce(
          (prevAccountBalance, entry) => prevAccountBalance + entry.value,
          0
        ),
    0
  )
}

// Month Incomes
export const monthIncomesSelector = (state: AppState) => {
  const currentMonth = new Date().getMonth()

  return state.accounts.reduce(
    (prevFutureBalance, currentAccount) =>
      prevFutureBalance +
      currentAccount.entries
        .filter(
          (entry) =>
            entry.value >= 0 && entry.createdAt.getMonth() === currentMonth
        )
        .reduce(
          (prevAccountBalance, entry) => prevAccountBalance + entry.value,
          0
        ),
    0
  )
}

// Month Expenses
export const monthExpensesSelector = (state: AppState) => {
  const currentMonth = new Date().getMonth()

  return state.accounts.reduce(
    (prevFutureBalance, currentAccount) =>
      prevFutureBalance +
      currentAccount.entries
        .filter(
          (entry) =>
            entry.value < 0 && entry.createdAt.getMonth() === currentMonth
        )
        .reduce(
          (prevAccountBalance, entry) =>
            prevAccountBalance + Math.abs(entry.value),
          0
        ),
    0
  )
}
