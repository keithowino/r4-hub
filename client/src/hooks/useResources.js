import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as resourceService from "../lib/services/resourceService";
import { toast } from "react-toastify";

export const useResources = (filters = {}) => {
	const queryClient = useQueryClient();

	const {
		data: resources = [], // ✅ Default to empty array
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["resources", filters],
		queryFn: () => resourceService.getResources(filters),
		staleTime: 5 * 60 * 1000, // 5 minutes
		initialData: [], // ✅ Ensure initial data is an array
	});

	const createMutation = useMutation({
		mutationFn: resourceService.createResource,
		onSuccess: () => {
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
		mutationFn: ({ id, data }) => resourceService.updateResource(id, data),
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
		mutationFn: resourceService.deleteResource,
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
		mutationFn: resourceService.toggleFavorite,
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
		mutationFn: resourceService.incrementVisit,
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
		resources: Array.isArray(resources) ? resources : [], // ✅ Safety check
		isLoading,
		error,
		refetch,
		createResource: createMutation.mutate,
		updateResource: updateMutation.mutate,
		deleteResource: deleteMutation.mutate,
		toggleFavorite: favoriteMutation.mutate,
		incrementVisit: visitMutation.mutate,
		isCreating: createMutation.isLoading,
		isUpdating: updateMutation.isLoading,
		isDeleting: deleteMutation.isLoading,
	};
};
