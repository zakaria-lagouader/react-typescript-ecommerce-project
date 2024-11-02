import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useContext, useState, createContext, useCallback } from "react";

type DialogConfig = {
	title: string;
	description: string;
	actionName: string;
	actionVariant?: "default" | "destructive";
	resolve: null | ((value: boolean) => void);
};

interface AlertDialogContextType {
	confirm: (props: Omit<DialogConfig, "resolve">) => Promise<boolean>;
}

const AlertDialogContext = createContext<AlertDialogContextType>({} as AlertDialogContextType);

interface AlertDialogProviderProps {
	children: React.ReactNode;
}

export function AlertDialogProvider({ children }: AlertDialogProviderProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
		title: "",
		description: "",
		actionName: "",
		actionVariant: "default",
		resolve: null,
	});

	const handleConfirm = useCallback(() => {
		setIsOpen(false);
		dialogConfig.resolve?.(true);
	}, [dialogConfig]);

	const handleCancel = useCallback(() => {
		setIsOpen(false);
		dialogConfig.resolve?.(false);
	}, [dialogConfig]);

	const confirm: AlertDialogContextType["confirm"] = useCallback(
		({ title, description, actionName, actionVariant = "default" }) => {
			return new Promise<boolean>((resolve) => {
				setDialogConfig({
					title,
					description,
					actionName,
					actionVariant,
					resolve,
				});
				setIsOpen(true);
			});
		},
		[]
	);

	return (
		<AlertDialogContext.Provider value={{ confirm }}>
			{children}
			<AlertDialog
				open={isOpen}
				onOpenChange={(open) => {
					if (!open) handleCancel();
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{dialogConfig.title}</AlertDialogTitle>
						<AlertDialogDescription>
							{dialogConfig.description}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className={buttonVariants({
								variant: dialogConfig.actionVariant,
							})}
							onClick={handleConfirm}
						>
							{dialogConfig.actionName}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</AlertDialogContext.Provider>
	);
}

export function useAlertDialog() {
	return useContext(AlertDialogContext);
}
