import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import path from "path";
import resourceRoutes from "./routes/resourceRoutes.js";
import authRoutes from "./routes/authRoutes.js";

/*
// recommended for use only during development.
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
*/

const envFile =
	process.env.NODE_ENV === "production"
		? ".env.production"
		: ".env.development";
dotenv.config({ path: envFile });

const requiredEnvVars = [
	"MONGODB_URI",
	"JWT_SECRET",
	"PORT",
	"NODE_ENV",
	"JWT_EXPIRES_IN",
	"CLIENT_URL",
];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
	console.error("❌ Missing required environment variables:");
	missingEnvVars.forEach((envVar) => console.error(`   - ${envVar}`));
	console.error("\nPlease check your .env file");
	process.exit(1);
}

console.log(`Loading environment from: ${envFile}`);

const app = express();

// Middleware
// // ✅ Add compression middleware (BEFORE routes)
// app.use(compression());
app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:3000",
		credentials: true,
	}),
);
// ✅ Static file caching (for production)
// This tells browsers to cache static files for 1 year
// Files with different names (hash in filename) will be downloaded fresh
// app.use(
// 	express.static("public", {
// 		maxAge: "1y",
// 		immutable: true,
// 	}),
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// // ✅ API response caching (optional)
// // Cache resource list for 5 minutes
// app.use("/api/resources", (req, res, next) => {
// 	// Only cache GET requests
// 	if (req.method === "GET") {
// 		res.set("Cache-Control", "public, max-age=300"); // 5 minutes
// 	}
// 	next();
// });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);

// Health check
app.get("/api/health", (req, res) => {
	res.json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		message: err.message || "Something went wrong!",
		error: process.env.NODE_ENV === "development" ? err : {},
	});
});

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("✅ Connected to MongoDB");
		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => {
			console.log(`🚀 Server running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("❌ MongoDB connection error:", error);
		process.exit(1);
	});
