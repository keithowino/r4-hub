import React from "react";
import ResourceCard from "./ResourceCard";

const ResourceGrid = ({
	resources = [],
	onFavorite,
	onDelete,
	onVisit,
	viewMode = "grid",
	isLoading = false,
}) => {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{[...Array(8)].map((_, i) => (
					<div
						key={`skeleton-${i}`} // ← Add key to skeleton items
						className="h-48 rounded-xl bg-white/5 animate-pulse"
					/>
				))}
			</div>
		);
	}

	if (resources.length === 0) {
		return (
			<div className="text-center py-12">
				<div className="text-4xl mb-4">🔍</div>
				<h3 className="text-lg font-medium text-white">
					No resources found
				</h3>
				<p className="text-gray-400 mt-1">
					Try adjusting your filters or add a new resource.
				</p>
			</div>
		);
	}

	// console.log(resources);

	return (
		<div
			className={
				viewMode === "grid"
					? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
					: "space-y-2"
			}
		>
			{resources.map((resource) => (
				<ResourceCard
					key={resource._id || resource.id}
					resource={resource}
					onFavorite={onFavorite}
					onDelete={onDelete}
					onVisit={onVisit}
					viewMode={viewMode}
				/>
			))}
		</div>
	);
};

export default ResourceGrid;
