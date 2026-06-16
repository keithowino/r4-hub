import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// @desc    Protect routes - verify JWT token
export const protect = async (req, res, next) => {
	try {
		let token;

		// Check for token in Authorization header
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer ")
		) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Not authorized, no token provided",
			});
		}

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach user payload to request
		req.user = {
			id: decoded.id,
			email: decoded.email,
		};

		next();
	} catch (error) {
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({
				success: false,
				message: "Not authorized, invalid token",
			});
		}

		if (error.name === "TokenExpiredError") {
			return res.status(401).json({
				success: false,
				message: "Not authorized, token has expired",
			});
		}

		next(error);
	}
};

// @desc    Generate a JWT token
// @usage   Call this after a successful login / register
export const generateToken = (id, email) => {
	return jwt.sign({ id, email }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || "7d",
	});
};
