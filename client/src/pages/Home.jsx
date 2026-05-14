import React, { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import MetaDataInsert from "../lib/MetaDataInsert";
import data from "../lib/data";
import {
	getLinks,
	addLink,
	deleteLink,
	toggleFavorite,
	incrementVisit,
} from "../lib/services/links";
import ResourceCard from "../components/home/ResourceCard";
import { toast } from "react-toastify";
import AddLinkModal from "../components/modals/AddLinkModal";

const Home = () => {
	const [links, setLinks] = useState([]);
	const [filteredLinks, setFilteredLinks] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [categories, setCategories] = useState(["All"]);

	useEffect(() => {
		loadLinks();
	}, []);

	useEffect(() => {
		filterLinks();
	}, [searchTerm, selectedCategory, links]);

	const favoriteLinks = links.filter((link) => link.favorite);
	const recentLinks = [...links]
		.sort(
			(a, b) =>
				new Date(b.lastVisited || 0) - new Date(a.lastVisited || 0),
		)
		.slice(0, 5);

	const loadLinks = () => {
		const allLinks = getLinks();
		setLinks(allLinks);

		// Extract unique categories
		const uniqueCategories = [
			"All",
			...new Set(allLinks.map((link) => link.category)),
		];
		setCategories(uniqueCategories);
	};

	const filterLinks = () => {
		let filtered = links;

		// Filter by category
		if (selectedCategory !== "All") {
			filtered = filtered.filter(
				(link) => link.category === selectedCategory,
			);
		}

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(link) =>
					link.title
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
					link.tags?.some((tag) =>
						tag.toLowerCase().includes(searchTerm.toLowerCase()),
					) ||
					link.notes
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					link.category
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					link.subcategory
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()),
			);
		}

		setFilteredLinks(filtered);
	};

	const handleAddLink = (newLink) => {
		const added = addLink(newLink);
		setLinks([...links, added]);
		toast.success("Resource added successfully!");
	};

	const handleDeleteLink = (id) => {
		if (window.confirm("Are you sure you want to delete this resource?")) {
			const remainingLinks = deleteLink(id);
			setLinks(remainingLinks);
			toast.success("Resource deleted!");
		}
	};

	const handleToggleFavorite = (id) => {
		const updatedLinks = toggleFavorite(id);
		setLinks(updatedLinks);
		toast.success("Favorite status updated!");
	};

	const handleVisit = (id) => {
		const updatedLinks = incrementVisit(id);
		setLinks(updatedLinks);
	};

	// Group links by category for display
	const groupedLinks = filteredLinks.reduce((groups, link) => {
		if (!groups[link.category]) {
			groups[link.category] = [];
		}
		groups[link.category].push(link);
		return groups;
	}, {});

	return (
		<>
			<MetaDataInsert title={data.metadata.name} />
			<section>
				{/* Header */}
				<div className="bg-white shadow-sm border-b">
					<div className="max-w-7xl mx-auto px-4 py-6">
						<div className="flex justify-between items-center mb-6">
							<div>
								<h1 className="text-3xl font-bold text-gray-900">
									{data.metadata.name}
								</h1>
								<p className="text-gray-600 mt-1">
									Your Dev Resource Hub
								</p>
							</div>
							<button
								onClick={() => setIsModalOpen(true)}
								className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
							>
								<Plus size={20} />
								Add Resource
							</button>
						</div>

						{/* Search and Filter */}
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="flex-1 relative">
								<Search
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={20}
								/>
								<input
									type="text"
									placeholder="Search by title, URL, tags, or notes..."
									className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
								/>
							</div>

							<select
								className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={selectedCategory}
								onChange={(e) =>
									setSelectedCategory(e.target.value)
								}
							>
								{categories.map((cat) => (
									<option key={cat} value={cat}>
										{cat}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Resource List */}
				<div className="max-w-7xl mx-auto px-4 py-8">
					{filteredLinks.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-gray-500">No resources found.</p>
						</div>
					) : (
						<>
							{/* Favorites Section */}
							{favoriteLinks.length > 0 && (
								<div className="mb-8">
									<h2 className="text-xl font-semibold text-yellow-600 mb-4 pb-2 border-b">
										⭐ Favorites
									</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{favoriteLinks.map((link) => (
											<ResourceCard
												key={link.id}
												link={link}
												onDelete={handleDeleteLink}
												onEdit={() =>
													toast.info(
														"Edit coming soon",
													)
												}
												onFavorite={
													handleToggleFavorite
												}
												onVisit={handleVisit}
											/>
										))}
									</div>
								</div>
							)}

							{/* Resent Section */}
							{recentLinks.length > 0 && (
								<div className="mb-8">
									<h2 className="text-xl font-semibold text-yellow-600 mb-4 pb-2 border-b">
										⭐ Recent
									</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{recentLinks.map((link) => (
											<ResourceCard
												key={link.id}
												link={link}
												onDelete={handleDeleteLink}
												onEdit={() =>
													toast.info(
														"Edit coming soon",
													)
												}
												onFavorite={
													handleToggleFavorite
												}
												onVisit={handleVisit}
											/>
										))}
									</div>
								</div>
							)}

							{/* Normal Categories */}
							{Object.entries(groupedLinks).map(
								([category, categoryLinks]) => (
									<div key={category} className="mb-8">
										<h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
											{category}
										</h2>
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
											{categoryLinks.map((link) => (
												<ResourceCard
													key={link.id}
													link={link}
													onDelete={handleDeleteLink}
													onEdit={() =>
														toast.info(
															"Edit coming soon",
														)
													}
													onFavorite={
														handleToggleFavorite
													}
													onVisit={handleVisit}
												/>
											))}
										</div>
									</div>
								),
							)}
						</>
					)}
				</div>
			</section>

			<AddLinkModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleAddLink}
			/>
		</>
	);
};

export default Home;
