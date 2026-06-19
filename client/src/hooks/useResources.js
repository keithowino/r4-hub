import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as resourceService from "../lib/services/resourceService";
import { toast } from "react-toastify";

// ✅ Normalize resources to ensure they always have an 'id' field
const normalizeResources = (data) => {
	if (!Array.isArray(data)) return [];
	return data.map((item) => ({
		...item,
		id: item._id || item.id, // Ensure id exists
	}));
};

export const useResources = (filters = {}) => {
	const queryClient = useQueryClient();

	const {
		data: rawResources,
		isLoading,
		isFetching,
		error,
		refetch,
	} = useQuery({
		queryKey: ["resources", filters],
		queryFn: () => resourceService.getResources(filters),
		staleTime: 5 * 60 * 1000,
		retry: 1,
	});

	// ✅ Normalize resources to ensure they have an 'id' field
	const resources = normalizeResources(rawResources);

	const createMutation = useMutation({
		mutationFn: resourceService.createResource,
		onSuccess: (data) => {
			queryClient.invalidateQueries(["resources"]);
			toast.success("Resource created successfully!");
		},
		onError: (error) => {
			toast.error(
				error.response?.data?.message || "Failed to create resource",
			);
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }) => {
			// id is now guaranteed to exist
			return resourceService.updateResource(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["resources"]);
			toast.success("Resource updated successfully!");
		},
		onError: (error) => {
			toast.error(
				error.response?.data?.message || "Failed to update resource",
			);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (id) => {
			// id is now guaranteed to exist
			return resourceService.deleteResource(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["resources"]);
			toast.success("Resource deleted successfully!");
		},
		onError: (error) => {
			toast.error(
				error.response?.data?.message || "Failed to delete resource",
			);
		},
	});

	const favoriteMutation = useMutation({
		mutationFn: (id) => resourceService.toggleFavorite(id),
		onSuccess: () => {
			queryClient.invalidateQueries(["resources"]);
		},
		onError: (error) => {
			toast.error(
				error.response?.data?.message || "Failed to toggle favorite",
			);
		},
	});

	const visitMutation = useMutation({
		mutationFn: (id) => resourceService.incrementVisit(id),
		onSuccess: () => {
			queryClient.invalidateQueries(["resources"]);
		},
		onError: (error) => {
			toast.error(
				error.response?.data?.message || "Failed to track visit",
			);
		},
	});

	return {
		resources, // ✅ Now guaranteed to have an 'id' field
		isLoading,
		isFetching,
		error,
		refetch,
		createResource: createMutation.mutate,
		updateResource: updateMutation.mutate,
		deleteResource: deleteMutation.mutate,
		toggleFavorite: favoriteMutation.mutate,
		incrementVisit: visitMutation.mutate,
		isCreating: createMutation.isPending,
		isUpdating: updateMutation.isPending,
		isDeleting: deleteMutation.isPending,
	};
};
