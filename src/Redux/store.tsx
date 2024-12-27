import { configureStore } from '@reduxjs/toolkit'
import freelancerSlice from './cardSlice'


export const store = configureStore({
    reducer: {
        card: freelancerSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch