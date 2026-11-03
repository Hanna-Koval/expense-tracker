import { configureStore } from "@reduxjs/toolkit"
import expenseReducer from "./features/expensesSlice/expense-slice"
import incomeReducer from "./features/incomeSlice/income-slice"


export const store = configureStore({
    reducer: {
        income: incomeReducer,
        expense: expenseReducer,
    },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store