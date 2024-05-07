import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sharedReducers from "../shared/reducers";


const store = configureStore({
  reducer: sharedReducers || {},
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: [
            "payload.config",
            "payload.request",
            "error",
            "meta.arg",
          ],
        },
      })
});

const getStore = () => store;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    IRootState,
    unknown,
    Action
>;

export default getStore;
