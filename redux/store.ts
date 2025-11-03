import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from './slices/projectSlice';

export const store=configureStore({
    reducer:{
        project: ProjectReducer
    }
})

export type selector = ReturnType <typeof store.getState>;
export type dispatch =  typeof store.dispatch;