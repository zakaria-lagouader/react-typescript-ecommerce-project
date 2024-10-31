import { PageLoadingIndicator } from "@/components/page-loading";
import { getUser } from "@/features/auth/services";
import { User } from "@/features/auth/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

function useAuth() {
	const { data: user, ...rest } = useQuery({
		queryKey: ["auth"],
		queryFn: getUser,
	});
	return { user, ...rest };
}

export type AuthContext = {
	user: User | undefined;
	updateUser: () => void;
};

const authContext = createContext({} as AuthContext);

type AuthProviderProps = {
	children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const { user, isLoading, refetch } = useAuth();
	if (isLoading) {
		return <PageLoadingIndicator />;
	}
	return (
		<authContext.Provider value={{ user, updateUser: refetch }}>
			{children}
		</authContext.Provider>
	);
}

export function useAuthState() {
	return useContext(authContext);
}
