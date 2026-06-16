import { createContext, useContext, useState, useEffect } from "react";
import {
	login as loginService,
	register as registerService,
	logout as logoutService,
	updateMe as updateMeService,
	changePassword as changePasswordService,
	getMe,
	getStoredUser,
	getStoredToken,
} from "../services/authService.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(getStoredUser());
	const [token, setToken] = useState(getStoredToken());
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const isAuthenticated = !!token && !!user;

	// On mount — verify stored token is still valid against the server
	useEffect(() => {
		const verifyToken = async () => {
			if (!token) {
				setLoading(false);
				return;
			}
			try {
				const res = await getMe();
				setUser(res.data);
			} catch {
				// Token invalid or expired — clear everything
				setUser(null);
				setToken(null);
			} finally {
				setLoading(false);
			}
		};

		verifyToken();
	}, []);

	const login = async (credentials) => {
		setError(null);
		try {
			const res = await loginService(credentials);
			setUser(res.data);
			setToken(res.token);
			return res;
		} catch (err) {
			const message =
				err.response?.data?.message || "Login failed, please try again";
			setError(message);
			throw new Error(message);
		}
	};

	const register = async (credentials) => {
		setError(null);
		try {
			const res = await registerService(credentials);
			setUser(res.data);
			setToken(res.token);
			return res;
		} catch (err) {
			const message =
				err.response?.data?.message ||
				"Registration failed, please try again";
			setError(message);
			throw new Error(message);
		}
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		logoutService();
	};

	const updateMe = async (data) => {
		setError(null);
		try {
			const res = await updateMeService(data);
			setUser(res.data);
			return res;
		} catch (err) {
			const message =
				err.response?.data?.message ||
				"Update failed, please try again";
			setError(message);
			throw new Error(message);
		}
	};

	const changePassword = async (data) => {
		setError(null);
		try {
			const res = await changePasswordService(data);
			setToken(res.token);
			return res;
		} catch (err) {
			const message =
				err.response?.data?.message ||
				"Password change failed, please try again";
			setError(message);
			throw new Error(message);
		}
	};

	const clearError = () => setError(null);

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				loading,
				error,
				isAuthenticated,
				login,
				register,
				logout,
				updateMe,
				changePassword,
				clearError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within an AuthContextProvider");
	}
	return ctx;
};
