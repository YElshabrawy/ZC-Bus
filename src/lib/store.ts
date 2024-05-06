import { IUser } from '@/types/user';
import { create } from 'zustand';

interface AuthState {
    user: IUser | null;
    login: (user: IUser) => void;
}

const initialState = {
    user: null,
};

const authStore = create<AuthState>((set) => ({
    ...initialState,
    login: (user) => {
        console.log(user);
        set((store) => ({ ...store, user: user }));
    },
}));

export default authStore;
