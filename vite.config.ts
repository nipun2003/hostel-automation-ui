import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	rollupOptions: {
		external: ["react", "react-router", "react-router-dom", "react-redux"],
		output: {
			globals: {
				react: "React",
			},
		},
	},
	build: {
		rollupOptions: {
			external: ["react", "react-router", "react-router-dom", "react-redux"],
			output: {
				globals: {
					react: "React",
				},
			},
		},
	},
});
