import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeServer: {},
}

export const activeServerSlice = createSlice({
    name: 'activeServer',
    initialState,
    reducers: {
        initializeActiveServer: (state, action) => {
            state.activeServer = action.payload
        },
    },
})

export const { initializeActiveServer } = activeServerSlice.actions
export const selectActiveServer = (state) => state.activeServer.activeServer
export default activeServerSlice.reducer
