import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from './slices/projectSlice';
import LogoutReducer from './slices/logoutSlice';

export const store=configureStore({
    reducer:{
        project: ProjectReducer,
        logout: LogoutReducer
    }
})

export type selector = ReturnType <typeof store.getState>;
export type dispatch =  typeof store.dispatch;