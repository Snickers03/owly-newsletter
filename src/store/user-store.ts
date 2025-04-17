import { Session, User } from "@prisma/client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface ExtendedUser extends User {
  Session: Session;
}

interface InitialUserStateProps {
  user: ExtendedUser | null;
}

export const initialUserState: InitialUserStateProps = {
  user: null,
};

interface UserProps {
  user: ExtendedUser | null;
  setUser: (user: ExtendedUser) => void;
  updateUser: (user: Partial<ExtendedUser>) => void;
  logout: () => void;
}

export const useUserStore = create<UserProps>()(
  devtools(
    (set, get) => ({
      ...initialUserState,
      setUser: (user: ExtendedUser) => set({ user }),
      updateUser: (user: Partial<ExtendedUser>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...user } });
        }
      },
      logout: () => {
        set({ user: null });
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      },
    }),
    { name: "user-store" },
  ),
);
