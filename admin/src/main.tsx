import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Page from "@/app/dashboard/page.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Page />
	</StrictMode>
);
