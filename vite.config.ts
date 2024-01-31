import path from "path"
import react from "@vitejs/plugin-react"
import {defineConfig} from "vite"

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/main.ts"),
            name: "react-antd-admin"
        },
        rollupOptions: {
            external: ["react", "react-router", "react-router-dom", "react-redux"],
            output: {
                globals: {
                    react: "React",
                },
            },
        }
    },
})
