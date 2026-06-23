import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

// https://vite.dev/config/
export default defineConfig(() => {
	return {
		server: {
			port: 3000,
			host: "0.0.0.0",
		},
		build: {
			// Increase chunk size warning limit
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				output: {
					// manualChunks should be a function in Vite 8/Rolldown
					manualChunks(id) {
						// React core
						if (
							id.includes("node_modules/react") ||
							id.includes("node_modules/react-dom") ||
							id.includes("node_modules/react-router-dom")
						) {
							return "react-vendor";
						}
						// Lucide icons
						if (id.includes("node_modules/lucide-react")) {
							return "icons";
						}
						// date-fns
						if (id.includes("node_modules/date-fns")) {
							return "date-fns";
						}
						// Axios
						if (id.includes("node_modules/axios")) {
							return "axios";
						}
						// Cloudinary
						if (id.includes("node_modules/cloudinary")) {
							return "cloudinary";
						}
						// Everything else goes to vendor
						if (id.includes("node_modules")) {
							return "vendor";
						}
					},
				},
			},
		},
		plugins: [
			react(),
			sitemap({
				hostname: "https://r4-hub.vercel.app/",
				dynamicRoutes: [
					"/",
					"/login",
					"/register",
					"/overview",
					"/overview/favorites",
					"/overview/categories",
					"/overview/resources",
					"/overview/ai-tools",
					"/overview/platforms",
					"/overview/cloud",
					"/overview/dev-tools",
				],
				exclude: ["/overview/*"], // Will handle dynamic routes differently
				outDir: "dist",
				changefreq: "weekly",
				priority: 0.8,
			}),
		],
	};
});
