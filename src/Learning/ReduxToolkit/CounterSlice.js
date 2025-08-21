import { createSlice } from "@reduxjs/toolkit";

// Slice = action + reducers 

export const counterSlice = createSlice({
    name: "counter",
    initialState: {value: 1},
    reducers: {
        inc: (state) => {state.value += 1},
        dec: (state) => {state.value -= 1},
        incBy: (state, action) => {state.value = state.value + action.payload}
    }
});

export const {inc, dec, incBy} = counterSlice.actions;

