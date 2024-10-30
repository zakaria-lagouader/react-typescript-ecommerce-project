import { Alert } from "@/components/alert";
import { useAuthState } from "@/features/auth/components/auth-provider";
import { RegisterForm } from "@/features/auth/components/register-form";
import { TRegisterSchema } from "@/features/auth/schemas/registerSchema";
import { register } from "@/features/auth/services";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { z } from "zod";

export const Route = createFileRoute("/admin/_guest/register")({
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
		mutationFn: register,
		onSuccess: () => {
			updateUser();
			navigate({ to: redirectTo ?? "/admin", replace: true });
		},
	});

	const onSubmit = (values: TRegisterSchema) => mutate(values);
	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<div className="grid gap-2 text-center">
				<h1 className="text-3xl font-bold">Register</h1>
				<p className="text-balance text-muted-foreground">
					Enter your info below to create your account
				</p>
			</div>

			{error && <Alert message={error.message} variant="error" />}
			<RegisterForm onSubmit={onSubmit} isPending={isPending} />

			<div className="mt-4 text-center text-sm">
				Already have an account?{" "}
				<Link to="/admin/login" className="underline">
					Sign in
				</Link>
			</div>
		</div>
	);
}
