import { configureStore } from "@reduxjs/toolkit";
import ResourceReducer from "./ResourceReducer";

export const store = configureStore({
  reducer: {
    resources: ResourceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
