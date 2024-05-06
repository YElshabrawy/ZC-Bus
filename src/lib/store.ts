import { IUser } from '@/types/user';
import { create } from 'zustand';

interface AuthState {
    tokens: {
        access: string;
        refresh: string;
    };
    user: IUser | null;
    login: ({ email, password }: { email: string; password: string }) => void;
}

const initialState = {
    user: null,
    tokens: {
        access: '',
        refresh: '',
    },
};

const authStore = create<AuthState>((set) => ({
    ...initialState,
    login: async ({ email, password }) => {
        // Make a request to the API to login the user
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        console.log('gg', response);
    },
}));

export default authStore;
