import { getUser } from "@/features/auth/services";
import { User } from "@/features/auth/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

function useAuth() {
	const { data: user, ...rest } = useQuery({
		queryKey: ["auth"],
		queryFn: getUser,
		staleTime: Infinity,
	});
	return { user, ...rest };
}

export type AuthContext = {
	user: User | null;
};

const authContext = createContext({} as AuthContext);

type AuthProviderProps = {
	children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const { user } = useAuth();
	return <authContext.Provider value={{ user }}>{children}</authContext.Provider>;
}

export function useAuthContext() {
	return useContext(authContext);
}
