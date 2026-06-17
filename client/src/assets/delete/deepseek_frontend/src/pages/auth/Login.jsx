import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Eye,
	EyeOff,
	Mail,
	Lock,
	User,
	ArrowRight,
	Sparkles,
} from "lucide-react";
import { useAuth } from "../../lib/context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
	const navigate = useNavigate();
	const { login, register, isAuthenticated, loading, error, clearError } =
		useAuth();
	const [isLogin, setIsLogin] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	// Redirect if already authenticated
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	// Clear error on unmount
	useEffect(() => {
		return () => clearError();
	}, [clearError]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (error) clearError();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			if (isLogin) {
				await login({
					email: formData.email,
					password: formData.password,
				});
				toast.success("Welcome back! 🚀");
				navigate("/");
			} else {
				// Validation
				if (formData.password !== formData.confirmPassword) {
					toast.error("Passwords do not match");
					setIsSubmitting(false);
					return;
				}
				if (formData.password.length < 6) {
					toast.error("Password must be at least 6 characters");
					setIsSubmitting(false);
					return;
				}

				await register({
					name: formData.name,
					email: formData.email,
					password: formData.password,
				});
				toast.success("Account created successfully! 🎉");
				navigate("/");
			}
		} catch (err) {
			// Error is already handled in AuthContext
			console.error("Auth error:", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	const toggleMode = () => {
		setIsLogin(!isLogin);
		setFormData({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		clearError();
	};

	return (
		<div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
			</div>

			{/* Main Container */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative w-full max-w-md"
			>
				{/* Brand */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center gap-2 mb-3">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-500/25">
							R
						</div>
						<span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
							R4 Hub
						</span>
					</div>
					<p className="text-gray-400 text-sm">
						{isLogin
							? "Welcome back to your developer workspace"
							: "Start organizing your developer resources"}
					</p>
				</div>

				{/* Card */}
				<div className="bg-[#0A0F1F]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
					{/* Error Display */}
					{error && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
						>
							{error}
						</motion.div>
					)}

					<form onSubmit={handleSubmit}>
						{/* Name Field (Register only) */}
						{!isLogin && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								className="mb-4"
							>
								<label className="block text-sm font-medium text-gray-300 mb-1.5">
									Full Name
								</label>
								<div className="relative">
									<User
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
										size={18}
									/>
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										placeholder="John Doe"
										required={!isLogin}
										className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500"
									/>
								</div>
							</motion.div>
						)}

						{/* Email Field */}
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-300 mb-1.5">
								Email Address
							</label>
							<div className="relative">
								<Mail
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
									size={18}
								/>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="you@example.com"
									required
									className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500"
								/>
							</div>
						</div>

						{/* Password Field */}
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-300 mb-1.5">
								Password
							</label>
							<div className="relative">
								<Lock
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
									size={18}
								/>
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder={
										isLogin
											? "Enter your password"
											: "Create a password (min 6 chars)"
									}
									required
									minLength={6}
									className="w-full pl-10 pr-12 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500"
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
								>
									{showPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
						</div>

						{/* Confirm Password (Register only) */}
						{!isLogin && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								className="mb-4"
							>
								<label className="block text-sm font-medium text-gray-300 mb-1.5">
									Confirm Password
								</label>
								<div className="relative">
									<Lock
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
										size={18}
									/>
									<input
										type={
											showPassword ? "text" : "password"
										}
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleChange}
										placeholder="Confirm your password"
										required={!isLogin}
										minLength={6}
										className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500"
									/>
								</div>
							</motion.div>
						)}

						{/* Forgot Password (Login only) */}
						{isLogin && (
							<div className="flex justify-end mb-4">
								<button
									type="button"
									className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
								>
									Forgot password?
								</button>
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isSubmitting || loading}
							className="relative w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
						>
							<span className="relative flex items-center justify-center gap-2">
								{isSubmitting || loading ? (
									<>
										<span className="spinner" />
										{isLogin
											? "Logging in..."
											: "Creating account..."}
									</>
								) : (
									<>
										{isLogin ? "Sign In" : "Create Account"}
										<ArrowRight
											size={18}
											className="group-hover:translate-x-1 transition-transform"
										/>
									</>
								)}
							</span>
							{/* Shine effect */}
							<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
						</button>
					</form>

					{/* Divider */}
					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-white/10" />
						</div>
						<div className="relative flex justify-center text-xs">
							<span className="px-3 bg-[#0A0F1F] text-gray-500">
								{isLogin
									? "Don't have an account?"
									: "Already have an account?"}
							</span>
						</div>
					</div>

					{/* Toggle Mode */}
					<button
						onClick={toggleMode}
						className="w-full py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm text-gray-400 hover:text-white"
					>
						{isLogin ? "Create new account" : "Sign in instead"}
					</button>

					{/* Features */}
					<div className="mt-6 grid grid-cols-2 gap-3">
						<div className="flex items-center gap-2 text-xs text-gray-500">
							<div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
							Secure authentication
						</div>
						<div className="flex items-center gap-2 text-xs text-gray-500">
							<div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
							JWT protected
						</div>
						<div className="flex items-center gap-2 text-xs text-gray-500">
							<div className="w-1.5 h-1.5 rounded-full bg-green-500" />
							Session management
						</div>
						<div className="flex items-center gap-2 text-xs text-gray-500">
							<div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
							Persistent storage
						</div>
					</div>
				</div>

				{/* Footer */}
				<p className="text-center mt-6 text-xs text-gray-600">
					By continuing, you agree to our Terms of Service and Privacy
					Policy
				</p>
			</motion.div>
		</div>
	);
};

export default Login;
