import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ResourceInitialState {
  resources: { id: string; name: string }[];
}
const initialState: ResourceInitialState = {
  resources: [],
};

export const resourceSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    initResources: (
      state,
      action: PayloadAction<{ id: string; name: string }[]>,
    ) => {
      state.resources = action.payload;
    },
    addResource: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      state.resources = [...state.resources, action.payload];
    },
  },
});

export const { initResources, addResource } = resourceSlice.actions;
export default resourceSlice.reducer;
