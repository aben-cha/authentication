import { create } from 'zustand'
import axios from 'axios'

const API_URL= 'http://localhost:5000';

// Set once globally
axios.defaults.withCredentials = true;

// Now all requests will include cookies by default

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error:null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (username, email, password) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/signup`, {username, email, password});
            set({user: response.data.user, isAuthenticated: true, isLoading: false});
        } catch (error) {
            set({error: error.response?.data?.error || "Error signing up", isLoading: false});
            throw error;
        }
    },

    login: async (email, password) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password});
            set({
                isAuthenticated: true, 
                user: response.data.user,
                error: null,
                isLoading: false
            });
        } catch (error) {
            set({error: error.response?.data?.error || "Error logging: ", isLoading: false});
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
    },

    authCheck: async () => {
        set({isCheckingAuth: true, error: null});

        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({user: response.data.user, isAuthenticated: true,isCheckingAuth: false});

        } catch (error) {
            set({error: null, isCheckingAuth: false, isAuthenticated: false});
            throw error;
        }
    }
}))