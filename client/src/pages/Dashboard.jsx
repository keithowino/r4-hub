import { useState, useEffect } from "react";
import { useAuth } from "../lib/context/AuthContext";
import { useResources } from "../hooks/useResources";
import SearchBar from "../components/dashboard/SearchBar";
import QuickAccess from "../components/dashboard/QuickAccess";
import ResourceFilters from "../components/dashboard/ResourceFilters";
import ResourceGrid from "../components/dashboard/ResourceGrid";
import AddResourceModal from "../components/common/modals/AddResourceModal";
import MetaDataInsert from "../lib/MetaDataInsert";

const Dashboard = () => {
	const { user } = useAuth();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("All");
	const [viewMode, setViewMode] = useState("grid");
	const [sortBy, setSortBy] = useState("recent");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [debouncedSearch, setDebouncedSearch] = useState("");

	const {
		resources = [], // ✅ Ensure default empty array
		isLoading,
		toggleFavorite,
		deleteResource,
		incrementVisit,
		refetch,
	} = useResources({ search: debouncedSearch });

	// Debug: Log resources to see what's coming back
	useEffect(() => {
		console.log("Resources in Dashboard:", resources);
	}, [resources]);

	// Debounce search
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchTerm);
		}, 300);
		return () => clearTimeout(timer);
	}, [searchTerm]);

	// Ensure resources is always an array before filtering
	const safeResources = Array.isArray(resources) ? resources : [];

	// Filter resources
	const filteredResources = safeResources.filter((r) => {
		if (selectedFilter === "All") return true;
		return r.category === selectedFilter;
	});

	// Sort resources
	const sortedResources = [...filteredResources].sort((a, b) => {
		if (sortBy === "recent") {
			return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
		}
		return (b.visitCount || 0) - (a.visitCount || 0);
	});

	return (
		<>
			<MetaDataInsert
				title={`Dashboard - R4 Hub`}
				description={`Manage your developer resources, favorites, and categories. Welcome back${user?.name ? `, ${user.name}` : "Pioneer"}!`}
				noIndex={true} // Dashboard is private
			/>

			<div className="max-w-full">
				{/* Search */}
				<div className="mb-8">
					<SearchBar value={searchTerm} onChange={setSearchTerm} />
				</div>

				{/* Quick Access */}
				<QuickAccess
					resources={sortedResources}
					onVisit={incrementVisit}
				/>

				{/* Filters */}
				<ResourceFilters
					selectedFilter={selectedFilter}
					onFilterChange={setSelectedFilter}
					viewMode={viewMode}
					onViewModeChange={setViewMode}
					sortBy={sortBy}
					onSortChange={setSortBy}
				/>

				{/* Resource Grid */}
				<ResourceGrid
					resources={sortedResources}
					onFavorite={toggleFavorite}
					onDelete={deleteResource}
					onVisit={incrementVisit}
					viewMode={viewMode}
					isLoading={isLoading}
				/>
			</div>
		</>
	);
};

export default Dashboard;
