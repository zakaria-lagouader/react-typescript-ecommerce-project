import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, TLoginSchema } from "@/features/auth/schemas/loginSchema";
import { Link } from "@tanstack/react-router";

interface LoginFromProps {
	onSubmit: (values: TLoginSchema) => void;
	isPending?: boolean;
}

export function LoginForm({ onSubmit, isPending }: LoginFromProps) {
	const form = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "mail@mail.com",
			password: "12345678",
		},
	});

	return (
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
									placeholder="mail@mail.com"
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
				<Button type="submit" className="w-full" isLoading={isPending}>
					Login
				</Button>
			</form>
		</Form>
	);
}
