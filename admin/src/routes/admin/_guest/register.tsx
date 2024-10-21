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
import { registerSchema, TRegisterSchema } from "@/features/auth/schemas/registerSchema";
import { register } from "@/features/auth/services";
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

	const form = useForm<TRegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
		},
	});

	const onSubmit = (values: TRegisterSchema) => {
		if (!register(values)) return;
		if (redirectTo !== undefined) return navigate({ to: redirectTo });
		navigate({ to: "/admin" });
	};
	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<div className="grid gap-2 text-center">
				<h1 className="text-3xl font-bold">Register</h1>
				<p className="text-balance text-muted-foreground">
					Enter your info below to create your account
				</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="grid gap-2">
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Jhonne Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password_confirmation"
						render={({ field }) => (
							<FormItem className="grid gap-2">
								<FormLabel>Password confirmation</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full">
						Register
					</Button>
				</form>
			</Form>
			<div className="mt-4 text-center text-sm">
				Already have an account?{" "}
				<Link to="/admin/login" className="underline">
					Sign in
				</Link>
			</div>
		</div>
	);
}
