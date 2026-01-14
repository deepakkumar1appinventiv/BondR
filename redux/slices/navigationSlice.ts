import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ViewType = "Home" | "Explore" | "Notification" | "Messages" | "Bookmarks" | "User" | "More";

interface NavigationState {
  activeView: ViewType;
}

const initialState: NavigationState = {
  activeView: "Home",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setActiveView: (state, action: PayloadAction<ViewType>) => {
      state.activeView = action.payload;
    },
  },
});

export const { setActiveView } = navigationSlice.actions;
export default navigationSlice.reducer;
