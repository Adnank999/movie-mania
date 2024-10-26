import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./apiSlice";
import searchReducer from "./movie/searchSlice"
import favouritesReducer from "./movie/favouritesSlice"
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore
} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        }
    };
};
const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    
};


const persistedFavouritesReducer = persistReducer(
    persistConfig,
    favouritesReducer
)



const createSessionStorage = () => {
    return {
        getItem: (key: string) =>
            Promise.resolve(window.sessionStorage.getItem(key)),
        setItem: (key: string, value: string) =>
            Promise.resolve(
                window.sessionStorage.setItem(key, value)
            ),
        removeItem: (key: string) =>
            Promise.resolve(window.sessionStorage.removeItem(key))
    };
};


const sessionStorage =
    typeof window !== "undefined"
        ? createSessionStorage()
        : createNoopStorage(); 

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        search: searchReducer,
        favourites: persistedFavouritesReducer,
       
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }).concat(apiSlice.middleware)
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
