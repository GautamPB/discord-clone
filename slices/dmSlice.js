import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dms: [],
}

export const dmSlice = createSlice({
    name: 'dms',
    initialState,
    reducers: {
        setDms: (state, action) => {
            state.dms = [...state.dms, action.payload]
        },
    },
})

export const { initializeDms } = dmSlice.actions
export const selectDms = (state) => state.dms.dms
export default dmSlice.reducer
