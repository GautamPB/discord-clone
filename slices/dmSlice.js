import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dms: [],
}

export const dmSlice = createSlice({
    name: 'dms',
    initialState,
    reducers: {
        initializeDms: (state, action) => {
            state.dms = [...action.payload]
        },

        deactivateDms: (state, action) => {
            state.dms = []
        },
    },
})

export const { initializeDms, deactivateDms } = dmSlice.actions
export const selectDms = (state) => state.dms.dms
export default dmSlice.reducer
