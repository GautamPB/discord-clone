import { configureStore } from '@reduxjs/toolkit'
import serverSlice from '../slices/serverSlice'
import userSlice from '../slices/userSlice'
import dmSlice from '../slices/dmSlice'
import activeServerSlice from '../slices/activeServerSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        servers: serverSlice,
        dms: dmSlice,
        activeServer: activeServerSlice,
    },
})
