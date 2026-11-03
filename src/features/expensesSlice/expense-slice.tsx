import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface CounterState {
  value: number
}

const initialState: CounterState = {
    value:0
}

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        add: state => { state },
        remove: state => { state },

    }
})

export const {add, remove} = expenseSlice.actions


export default expenseSlice.reducer