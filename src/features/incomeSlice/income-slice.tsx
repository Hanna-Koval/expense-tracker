import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  totalBalance: number
}

const initialState: CounterState = {
    totalBalance: 0
}

export const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
        add: (state, actions: PayloadAction<number>) => {state.totalBalance+= actions.payload},
        remove: (state, actions: PayloadAction<number>) => {state.totalBalance+= actions.payload},
    }
})

export const { add, remove } = incomeSlice.actions;

export default incomeSlice.reducer