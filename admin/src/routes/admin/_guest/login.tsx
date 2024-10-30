import { z } from "zod";
import { login } from "@/features/auth/services";
import { LoginForm } from "@/features/auth/components/login-form";
import { TLoginSchema } from "@/features/auth/schemas/loginSchema";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuthState } from "@/features/auth/components/auth-provider";
import { Alert } from "@/components/alert";

export const Route = createFileRoute("/admin/_guest/login")({
	component: Page,
	validateSearch: z.object({
		redirectTo: z.string().optional(),
	}),
});

function Page() {
	const navigate = useNavigate({ from: "/admin/login" });
	const { redirectTo } = Route.useSearch();
	const { updateUser } = useAuthState();
	const { mutate, isPending, error } = useMutation({
		mutationFn: login,
		onSuccess: () => {
			updateUser();
			navigate({ to: redirectTo ?? "/admin", replace: true });
		},
	});

	const onSubmit = (values: TLoginSchema) => mutate(values);

	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<div className="grid gap-2 text-center">
				<h1 className="text-3xl font-bold">Login</h1>
				<p className="text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			{error && <Alert message={error.message} variant="error" />}
			<LoginForm onSubmit={onSubmit} isPending={isPending} />

			<div className="mt-4 text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="/admin/register" search={{ redirectTo }} className="underline">
					Sign up
				</Link>
			</div>
		</div>
	);
}
