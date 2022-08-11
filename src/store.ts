import createStore from "zustand"
import * as data from "./data"

type AppState = {
  accounts: Account[]
}

const store = createStore<AppState>(() => ({
  accounts: data.accounts,
}))

export default store
