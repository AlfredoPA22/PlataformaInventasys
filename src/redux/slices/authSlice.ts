import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthSliceState {
  isAuthenticated: boolean;
  token: string;
  id: string;
  fullName: string;
  email: string;
  picture: string;
  type: string;
}

const initialState: AuthSliceState = {
  isAuthenticated: false,
  token: "",
  id: "",
  fullName: "",
  email: "",
  picture: "",
  type: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<AuthSliceState>) => ({
      ...state,
      token: action.payload.token,
      id: action.payload.id,
      fullName: action.payload.fullName,
      email: action.payload.email,
      picture: action.payload.picture,
      type: action.payload.type,
      isAuthenticated: action.payload.isAuthenticated,
    }),
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isAuthenticated: action.payload,
    }),
    resetAuth: () => initialState,
  },
});

export const { setLogin, setIsAuthenticated, resetAuth } = authSlice.actions;

export default authSlice;
