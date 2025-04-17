"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import Cookies from "js-cookie";

import { trpc } from "@/app/_trpc/client";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const { mutate: loginWithToken } = trpc.auth.loginWithToken.useMutation({
    onSuccess: (user) => {
      const updatedUser = {
        ...user,
        created: new Date(user.created),
        Session: {
          ...user.Session,
          expires: new Date(user.Session.expires),
        },
      };
      setUser(updatedUser);
    },
    onError: () => {
      Cookies.remove("token");
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && !user) {
      loginWithToken(token);
    }
  }, [user, loginWithToken]);

  return <>{children}</>;
};

export default AuthProvider;
