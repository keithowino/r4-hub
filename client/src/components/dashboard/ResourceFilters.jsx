import React from "react";
import { LayoutGrid, List, Clock } from "lucide-react";

const ResourceFilters = ({
	selectedFilter,
	onFilterChange,
	viewMode,
	onViewModeChange,
	sortBy,
	onSortChange,
}) => {
	const filters = [
		"All",
		"AI Tools",
		"Dev Platforms",
		"Databases",
		"Cloud",
		"Code Tools",
		"More",
	];

	return (
		<div className="flex flex-wrap items-center justify-between gap-4 mb-6">
			<div className="flex flex-wrap gap-1">
				{filters.map((filter) => (
					<button
						key={filter}
						onClick={() => onFilterChange(filter)}
						className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
							selectedFilter === filter
								? "bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
								: "text-gray-400 hover:text-white hover:bg-white/5"
						}`}
					>
						{filter}
					</button>
				))}
			</div>

			<div className="flex items-center gap-2">
				<button
					onClick={() =>
						onSortChange(sortBy === "recent" ? "popular" : "recent")
					}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
				>
					<Clock size={16} />
					{sortBy === "recent" ? "Recently Used" : "Popular"}
				</button>
				<div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
					<button
						onClick={() => onViewModeChange("grid")}
						className={`p-1.5 rounded transition-all ${
							viewMode === "grid"
								? "bg-white/10 text-white"
								: "text-gray-500"
						}`}
					>
						<LayoutGrid size={16} />
					</button>
					<button
						onClick={() => onViewModeChange("list")}
						className={`p-1.5 rounded transition-all ${
							viewMode === "list"
								? "bg-white/10 text-white"
								: "text-gray-500"
						}`}
					>
						<List size={16} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ResourceFilters;
