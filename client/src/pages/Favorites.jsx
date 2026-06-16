import React, { useState } from "react";
import { Star, Heart } from "lucide-react";
import { useResources } from "../hooks/useResources";
import ResourceGrid from "../components/dashboard/ResourceGrid";
import SearchBar from "../components/dashboard/SearchBar";

const Favorites = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const {
		resources,
		isLoading,
		toggleFavorite,
		deleteResource,
		incrementVisit,
	} = useResources({ favorite: true, search: searchTerm });

	return (
		<div className="max-w-full">
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-2">
					<div className="p-2 rounded-xl bg-yellow-500/10">
						<Star
							size={24}
							className="text-yellow-500 fill-yellow-500"
						/>
					</div>
					<div>
						<h1 className="text-3xl font-bold">Favorites</h1>
						<p className="text-gray-400">
							Your most important resources, always accessible
						</p>
					</div>
				</div>
			</div>

			<div className="mb-6">
				<SearchBar
					value={searchTerm}
					onChange={setSearchTerm}
					placeholder="Search favorites..."
				/>
			</div>

			<ResourceGrid
				resources={resources}
				onFavorite={toggleFavorite}
				onDelete={deleteResource}
				onVisit={incrementVisit}
				isLoading={isLoading}
			/>

			{!isLoading && resources.length === 0 && (
				<div className="text-center py-12">
					<Heart size={48} className="text-gray-600 mx-auto mb-4" />
					<h3 className="text-lg font-medium text-white">
						No favorites yet
					</h3>
					<p className="text-gray-400 mt-1">
						Star resources to add them to your favorites
					</p>
				</div>
			)}
		</div>
	);
};

export default Favorites;
