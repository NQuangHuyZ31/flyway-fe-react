import axiosAuth from './axiosAuth';

const login = async (email, password, type) => {
    try {
        const response = await axiosAuth.post('/auth/login/', { email, password, type });
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        console.error('Login error:', error);
    }
};

const logout = async () => {
    try {
        await axiosAuth.post('/auth/logout/');
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Logout error:', error);
    }
};

const refreshAccessToken = async () => {
    try {
        const response = await axiosAuth.post('/auth/refresh/');
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        console.error('Refresh token error:', error);
    }
};

const getCurrentUser = async () => {
    try {
        const response = await axiosAuth.get('/me');
        return response.data;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
};

export { login, logout, refreshAccessToken, getCurrentUser };
