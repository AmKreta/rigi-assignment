import { Tuple, combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import users from './users/users.store';
import post from './posts/posts';
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
        users,
        post
    }),
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;