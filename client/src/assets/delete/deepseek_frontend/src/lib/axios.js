import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor — attach JWT token to every request
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("r4hub_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Response interceptor — handle expired/invalid token globally
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Token expired or invalid — clear storage and redirect to login
			localStorage.removeItem("r4hub_token");
			localStorage.removeItem("r4hub_user");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);

export default api;
