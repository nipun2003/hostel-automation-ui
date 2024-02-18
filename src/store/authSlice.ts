import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "@/utils/models.ts";

export type AuthState = {
	loggedIn: boolean;
	user: AuthUser | null;
};

const initialData: AuthState = {
	loggedIn: false,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialData,
	reducers: {
		login: (state, action: PayloadAction<AuthUser>) => {
			state.loggedIn = true;
			state.user = action.payload;
		},
		logout: (state) => {
			state.loggedIn = false;
			state.user = null;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
