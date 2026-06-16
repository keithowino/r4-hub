import User from "../models/User.js";
import { generateToken } from "../middleware/auth.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "An account with that email already exists",
			});
		}

		// Create user — password hashing handled by User model pre-save hook
		const user = await User.create({ name, email, password });

		const token = generateToken(user._id, user.email);

		res.status(201).json({
			success: true,
			token,
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				createdAt: user.createdAt,
			},
		});
	} catch (error) {
		next(error);
	}
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Validate fields present
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please provide an email and password",
			});
		}

		// Find user and explicitly include password for comparison
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		// Compare password
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		const token = generateToken(user._id, user.email);

		res.status(200).json({
			success: true,
			token,
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				createdAt: user.createdAt,
			},
		});
	} catch (error) {
		next(error);
	}
};

// @desc    Get currently logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				createdAt: user.createdAt,
			},
		});
	} catch (error) {
		next(error);
	}
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
export const updateMe = async (req, res, next) => {
	try {
		// Only allow safe fields to be updated this way
		const { name, avatar } = req.body;

		const user = await User.findByIdAndUpdate(
			req.user.id,
			{ name, avatar },
			{ new: true, runValidators: true },
		);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				createdAt: user.createdAt,
			},
		});
	} catch (error) {
		next(error);
	}
};

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
export const changePassword = async (req, res, next) => {
	try {
		const { currentPassword, newPassword } = req.body;

		if (!currentPassword || !newPassword) {
			return res.status(400).json({
				success: false,
				message: "Please provide current and new password",
			});
		}

		const user = await User.findById(req.user.id).select("+password");

		const isMatch = await user.matchPassword(currentPassword);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Current password is incorrect",
			});
		}

		user.password = newPassword;
		await user.save(); // triggers pre-save hook to re-hash

		const token = generateToken(user._id, user.email);

		res.status(200).json({
			success: true,
			message: "Password updated successfully",
			token, // issue a fresh token
		});
	} catch (error) {
		next(error);
	}
};
