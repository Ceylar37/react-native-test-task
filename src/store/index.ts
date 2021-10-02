import {applyMiddleware, combineReducers, configureStore, createStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import createSagaMiddleware from 'redux-saga'
import {photosReducer, photosWatcher} from "./photosReducer";

const saga = createSagaMiddleware()
export const store = configureStore({
    reducer: {
        photos: photosReducer
    },
    middleware: [saga]
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
saga.run(photosWatcher)