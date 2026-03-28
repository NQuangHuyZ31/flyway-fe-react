import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        },

        setToken(state, action) {
            localStorage.setItem('token', action.payload);
        },

        logout(state) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
