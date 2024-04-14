import { Tuple, combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import usersStore from './users/users.store';
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

export const store = configureStore({
    middleware:(getDefaultMiddleware:GetDefaultMiddleware)=>{
        const middlewareList = [...getDefaultMiddleware()];
        if (process.env.NODE_ENV !== 'production') {
            middlewareList.push(logger);
        }
        return new Tuple(...middlewareList);
    },
    reducer: combineReducers({
        usersStore
    }),
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;