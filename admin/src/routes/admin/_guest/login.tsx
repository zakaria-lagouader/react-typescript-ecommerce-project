import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { loginSchema, TLoginSchema } from "@/features/auth/schemas/loginSchema";
import { login } from "@/features/auth/services";
import { z } from "zod";

export const Route = createFileRoute("/admin/_guest/login")({
	component: Page,
	validateSearch: z.object({
		redirectTo: z.string().optional(),
	}),
});

function Page() {
	const navigate = useNavigate({ from: "/admin/login" });
	const { redirectTo } = Route.useSearch();

	const form = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: TLoginSchema) => {
		if (!login(values)) return;
		if (redirectTo !== undefined) return navigate({ to: redirectTo });
		navigate({ to: "/admin" });
	};
	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<div className="grid gap-2 text-center">
				<h1 className="text-3xl font-bold">Login</h1>
				<p className="text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="grid gap-2">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="mail@mail.xom"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="grid gap-2">
								<div className="flex items-center">
									<FormLabel>Password</FormLabel>
									<Link
										href="/forgot-password"
										className="ml-auto inline-block text-sm underline"
									>
										Forgot your password?
									</Link>
								</div>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full">
						Login
					</Button>
				</form>
			</Form>
			<div className="mt-4 text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="/admin/register" search={{ redirectTo }} className="underline">
					Sign up
				</Link>
			</div>
		</div>
	);
}
