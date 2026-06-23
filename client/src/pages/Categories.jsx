import React, { useState } from "react";
import { Tags, Plus } from "lucide-react";
import { useResources } from "../hooks/useResources";
import ResourceGrid from "../components/dashboard/ResourceGrid";
import { useCommon } from "../lib/context/CommonContext";
import MetaDataInsert from "../lib/MetaDataInsert";

const Categories = () => {
	const { categories, categoryColors } = useCommon();
	const [selectedCategory, setSelectedCategory] = useState(null);
	const {
		resources,
		isLoading,
		toggleFavorite,
		deleteResource,
		incrementVisit,
	} = useResources({
		category: selectedCategory,
	});

	return (
		<>
			<MetaDataInsert
				title="Categories - R4 Hub"
				description="Browse and organize your developer resources by category. From AI Tools to Databases, find what you need instantly."
				noIndex={true}
			/>

			<div className="max-w-full">
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-2">
						<div className="p-2 rounded-xl bg-purple-500/10">
							<Tags size={24} className="text-purple-400" />
						</div>
						<div>
							<h1 className="text-3xl font-bold">Categories</h1>
							<p className="text-gray-400">
								Browse resources by category
							</p>
						</div>
					</div>
				</div>

				{/* Category Pills */}
				<div className="flex flex-wrap gap-2 mb-6">
					<button
						onClick={() => setSelectedCategory(null)}
						className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
							!selectedCategory
								? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
								: "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
						}`}
					>
						All
					</button>
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
								selectedCategory === category
									? "text-white border border-white/20"
									: "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
							}`}
							style={
								selectedCategory === category
									? {
											background: `linear-gradient(to right, ${category === "AI Tools" ? "#8B5CF6" : category === "Dev Platforms" ? "#3B82F6" : category === "Databases" ? "#34D399" : category === "Cloud" ? "#38BDF8" : category === "Code Tools" ? "#F59E0B" : category === "Learning" ? "#8B5CF6" : "#6B7280"}20`,
											borderColor:
												category === "AI Tools"
													? "#8B5CF6"
													: category ===
														  "Dev Platforms"
														? "#3B82F6"
														: category ===
															  "Databases"
															? "#34D399"
															: category ===
																  "Cloud"
																? "#38BDF8"
																: category ===
																	  "Code Tools"
																	? "#F59E0B"
																	: category ===
																		  "Learning"
																		? "#8B5CF6"
																		: "#6B7280",
										}
									: {}
							}
						>
							<span className="flex items-center gap-2">
								<span
									className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryColors[category] || categoryColors.Other}`}
								/>
								{category}
							</span>
						</button>
					))}
					<button className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-dashed border-white/10">
						<Plus size={16} className="inline mr-1" />
						New
					</button>
				</div>

				{/* Resources */}
				<ResourceGrid
					resources={resources}
					onFavorite={toggleFavorite}
					onDelete={deleteResource}
					onVisit={incrementVisit}
					isLoading={isLoading}
				/>

				{!isLoading && resources.length === 0 && (
					<div className="text-center py-12">
						<Tags
							size={48}
							className="text-gray-600 mx-auto mb-4"
						/>
						<h3 className="text-lg font-medium text-white">
							No resources in{" "}
							{selectedCategory || "this category"}
						</h3>
						<p className="text-gray-400 mt-1">
							Add resources to this category to see them here
						</p>
					</div>
				)}
			</div>
		</>
	);
};

export default Categories;
