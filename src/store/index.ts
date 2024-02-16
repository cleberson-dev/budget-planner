import createStore from "zustand"
import { persist } from "zustand/middleware"
import { mountStoreDevtool } from "simple-zustand-devtools"
import * as data from "../data"
import * as storeUtils from "./utils"
import * as storeActions from "./actions"

const { REACT_APP_STORAGE_NAME } = process.env

if (!REACT_APP_STORAGE_NAME) {
  throw new Error("REACT_APP_STORAGE_NAME is not declared")
}

const useStore = createStore(
  persist<AppState>(
    (set) => ({
      accounts: data.accounts,
      addEntry: (payload) =>
        set((state) => storeActions.addEntry(state, payload)),
      updateEntry: (payload) =>
        set((state) => storeActions.updateEntry(state, payload)),
      removeEntry: (payload) =>
        set((state) => storeActions.removeEntry(state, payload)),
    }),
    {
      name: REACT_APP_STORAGE_NAME,
      deserialize: storeUtils.deserialize,
    }
  )
)

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool(REACT_APP_STORAGE_NAME, useStore)
}

export default useStore
