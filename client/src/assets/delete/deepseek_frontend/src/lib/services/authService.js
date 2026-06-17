import api from "../axios.js";

const TOKEN_KEY = "r4hub_token";
const USER_KEY = "r4hub_user";

// ─── Token Helpers ────────────────────────────────────────────────────────────

export const saveAuth = (token, user) => {
	localStorage.setItem(TOKEN_KEY, token);
	localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
};

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
	const user = localStorage.getItem(USER_KEY);
	return user ? JSON.parse(user) : null;
};

// ─── Auth Calls ───────────────────────────────────────────────────────────────

// POST /api/auth/register
export const register = async ({ name, email, password }) => {
	const res = await api.post("/auth/register", { name, email, password });
	saveAuth(res.data.token, res.data.data);
	return res.data;
};

// POST /api/auth/login
export const login = async ({ email, password }) => {
	const res = await api.post("/auth/login", { email, password });
	saveAuth(res.data.token, res.data.data);
	return res.data;
};

// GET /api/auth/me
export const getMe = async () => {
	const res = await api.get("/auth/me");
	return res.data;
};

// PUT /api/auth/me
export const updateMe = async ({ name, avatar }) => {
	const res = await api.put("/auth/me", { name, avatar });
	// Update stored user with new data
	localStorage.setItem(USER_KEY, JSON.stringify(res.data.data));
	return res.data;
};

// PUT /api/auth/password
export const changePassword = async ({ currentPassword, newPassword }) => {
	const res = await api.put("/auth/password", {
		currentPassword,
		newPassword,
	});
	// Save the new token issued after password change
	if (res.data.token) {
		localStorage.setItem(TOKEN_KEY, res.data.token);
	}
	return res.data;
};

// Logout — client side only, just clears storage
export const logout = () => {
	clearAuth();
	window.location.href = "/login";
};
