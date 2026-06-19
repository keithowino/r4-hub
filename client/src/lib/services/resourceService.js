import api from "../axios.js";

// ─── Resource Calls ───────────────────────────────────────────────────────────

// // GET /api/resources
// // Supports optional filters: { category, favorite, status, search, tag }
// export const getResources = async (filters = {}) => {
// 	try {
// 		const params = new URLSearchParams();

// 		if (filters.category) params.append("category", filters.category);
// 		if (filters.favorite) params.append("favorite", "true");
// 		if (filters.status) params.append("status", filters.status);
// 		if (filters.search) params.append("search", filters.search);
// 		if (filters.tag) params.append("tag", filters.tag);

// 		const res = await api.get(`/resources?${params.toString()}`);

// 		// Ensure we always return an array
// 		if (res.data && Array.isArray(res.data)) {
// 			return res.data;
// 		} else if (res.data && res.data.data && Array.isArray(res.data.data)) {
// 			return res.data.data;
// 		} else {
// 			return [];
// 		}
// 	} catch (error) {
// 		console.error("Error fetching resources:", error);
// 		return []; // Return empty array on error
// 	}
// };

// GET /api/resources
// Supports optional filters: { category, favorite, status, search, tag }
export const getResources = async (filters = {}) => {
	const params = new URLSearchParams();

	if (filters.category) params.append("category", filters.category);
	if (filters.favorite) params.append("favorite", "true");
	if (filters.status) params.append("status", filters.status);
	if (filters.search) params.append("search", filters.search);
	if (filters.tag) params.append("tag", filters.tag);

	const res = await api.get(`/resources?${params.toString()}`);

	// Server responds with { success, count, data: [...] }
	if (res.data && Array.isArray(res.data.data)) {
		return res.data.data;
	}
	if (Array.isArray(res.data)) {
		return res.data;
	}
	return [];
	// NOTE: no try/catch — let the error propagate so React Query
	// can set `error` and trigger any onError handlers.
};

// GET /api/resources/:id
export const getResource = async (id) => {
	const res = await api.get(`/resources/${id}`);
	return res.data;
};

// POST /api/resources
export const createResource = async (resourceData) => {
	const res = await api.post("/resources", resourceData);
	return res.data;
};

// PUT /api/resources/:id
export const updateResource = async (id, resourceData) => {
	const res = await api.put(`/resources/${id}`, resourceData);
	return res.data;
};

// DELETE /api/resources/:id
export const deleteResource = async (id) => {
	if (!id) {
		console.error("deleteResource called with undefined id");
		throw new Error("Resource ID is required");
	}
	const res = await api.delete(`/resources/${id}`);
	return res.data;
};

// PATCH /api/resources/:id/favorite
export const toggleFavorite = async (id) => {
	const res = await api.patch(`/resources/${id}/favorite`);
	return res.data;
};

// PATCH /api/resources/:id/visit
export const incrementVisit = async (id) => {
	const res = await api.patch(`/resources/${id}/visit`);
	return res.data;
};

// PATCH /api/resources/:id/archive
export const archiveResource = async (id) => {
	const res = await api.patch(`/resources/${id}/archive`);
	return res.data;
};
