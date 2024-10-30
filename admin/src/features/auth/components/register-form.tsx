import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

interface RegisterFormProps {
	onSubmit: (values: TRegisterSchema) => void;
	isPending?: boolean;
}

export function RegisterForm({ onSubmit, isPending }: RegisterFormProps) {
	const form = useForm<TRegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
		},
	});
	return (
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
				<Button type="submit" className="w-full" isLoading={isPending}>
					Register
				</Button>
			</form>
		</Form>
	);
}
