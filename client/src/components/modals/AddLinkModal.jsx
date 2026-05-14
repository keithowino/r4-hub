// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { useData } from "../../lib/context/DataContext";

// const AddLinkModal = ({ isOpen, onClose, onSave }) => {
// 	const { categories } = useData();

// 	const [isFetchingTitle, setIsFetchingTitle] = useState(false);
// 	const [formData, setFormData] = useState({
// 		title: "",
// 		url: "",
// 		category: "Other",
// 		subcategory: "",
// 		tags: "",
// 		notes: "",
// 	});

// 	if (!isOpen) return null;

// 	// const fetchPageTitle = async (url) => {
// 	// 	try {
// 	// 		// You'll need a CORS proxy or backend for this
// 	// 		// For now, just extract from URL domain
// 	// 		const domain = new URL(url).hostname;
// 	// 		return domain.replace("www.", "").split(".")[0];
// 	// 	} catch {
// 	// 		return "";
// 	// 	}
// 	// };

// 	// Handle URL input change with auto-fetch

// 	// Auto-fetch title function
// 	const fetchPageTitle = async (url) => {
// 		try {
// 			// Option 1: Simple domain extraction (works offline, no CORS)
// 			const domain = new URL(url).hostname;
// 			return (
// 				domain
// 					.replace("www.", "")
// 					.split(".")[0]
// 					.charAt(0)
// 					.toUpperCase() +
// 				domain.replace("www.", "").split(".")[0].slice(1)
// 			);

// 			// Option 2: Try to fetch real title (requires CORS solution - see below)
// 			// const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
// 			// const data = await response.json();
// 			// const html = data.contents;
// 			// const titleMatch = html.match(/<title>(.*?)<\/title>/i);
// 			// return titleMatch ? titleMatch[1] : domain;
// 		} catch {
// 			return "";
// 		}
// 	};

// 	const handleUrlChange = async (e) => {
// 		const url = e.target.value;
// 		setFormData({ ...formData, url });

// 		// Auto-fetch title if URL is valid and title is empty
// 		if (url && url.startsWith("http") && !formData.title) {
// 			setIsFetchingTitle(true);
// 			try {
// 				const fetchedTitle = await fetchPageTitle(url);
// 				if (fetchedTitle) {
// 					setFormData((prev) => ({ ...prev, title: fetchedTitle }));
// 				}
// 			} catch (error) {
// 				console.error("Failed to fetch title:", error);
// 			} finally {
// 				setIsFetchingTitle(false);
// 			}
// 		}
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const tagsArray = formData.tags
// 			.split(",")
// 			.map((tag) => tag.trim())
// 			.filter((tag) => tag);
// 		onSave({
// 			...formData,
// 			tags: tagsArray,
// 		});
// 		setFormData({
// 			title: "",
// 			url: "",
// 			category: "Other",
// 			subcategory: "",
// 			tags: "",
// 			notes: "",
// 		});
// 		onClose();
// 	};

// 	return (
// 		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// 			<div className="bg-white rounded-lg p-6 w-full max-w-md">
// 				<div className="flex justify-between items-center mb-4">
// 					<h2 className="text-xl font-bold">Add New Resource</h2>
// 					<button
// 						onClick={onClose}
// 						className="text-gray-500 hover:text-gray-700"
// 					>
// 						<X size={24} />
// 					</button>
// 				</div>

// 				<form onSubmit={handleSubmit}>
// 					<div className="mb-3">
// 						<label className="block text-sm font-medium mb-1">
// 							Title *
// 						</label>
// 						<input
// 							type="text"
// 							required
// 							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// 							value={formData.title}
// 							onChange={(e) =>
// 								setFormData({
// 									...formData,
// 									title: e.target.value,
// 								})
// 							}
// 						/>
// 					</div>

// 					<div className="mb-3">
// 						<label className="block text-sm font-medium mb-1">
// 							URL *
// 						</label>
// 						<input
// 							type="url"
// 							required
// 							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// 							value={formData.url}
// 							onChange={(e) =>
// 								setFormData({
// 									...formData,
// 									url: e.target.value,
// 								})
// 							}
// 						/>
// 					</div>

// 					<div className="mb-3">
// 						<label className="block text-sm font-medium mb-1">
// 							Category
// 						</label>
// 						<select
// 							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// 							value={formData.category}
// 							onChange={(e) =>
// 								setFormData({
// 									...formData,
// 									category: e.target.value,
// 								})
// 							}
// 						>
// 							{categories.map((cat) => (
// 								<option key={cat} value={cat}>
// 									{cat}
// 								</option>
// 							))}
// 						</select>
// 					</div>

// 					<div className="mb-3">
// 						<label className="block text-sm font-medium mb-1">
// 							Subcategory
// 						</label>

// 						<input
// 							type="text"
// 							placeholder="e.g. Chat, Database, Deployment"
// 							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// 							value={formData.subcategory}
// 							onChange={(e) =>
// 								setFormData({
// 									...formData,
// 									subcategory: e.target.value,
// 								})
// 							}
// 						/>
// 					</div>

// 					<div className="mb-3">
// 						<label className="block text-sm font-medium mb-1">
// 							Tags (comma-separated)
// 						</label>
// 						<input
// 							type="text"
// 							placeholder="e.g., llm, free, api"
// 							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// 							value={formData.tags}
// 							onChange={(e) =>
// 								setFormData({
// 									...formData,
// 									tags: e.target.value,
// 								})
// 							}
// 						/>
// 					</div>

// 					<div className="mb-4">
// 						<label className="block text-sm font-medium mb-1">
// 							Notes
// 						</label>
// 						<textarea
// 							rows="3"
// 							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// 							value={formData.notes}
// 							onChange={(e) =>
// 								setFormData({
// 									...formData,
// 									notes: e.target.value,
// 								})
// 							}
// 						/>
// 					</div>

// 					<button
// 						type="submit"
// 						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
// 					>
// 						Save Resource
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default AddLinkModal;

import React, { useState } from "react";
import { X, Loader } from "lucide-react";
import { useData } from "../../lib/context/DataContext";

const AddLinkModal = ({ isOpen, onClose, onSave }) => {
	const { categories } = useData();
	const [isFetchingTitle, setIsFetchingTitle] = useState(false);

	const [formData, setFormData] = useState({
		title: "",
		url: "",
		category: "Other",
		subcategory: "",
		tags: "",
		notes: "",
	});

	// Auto-fetch title function
	const fetchPageTitle = async (url) => {
		try {
			// Option 1: Simple domain extraction (works offline, no CORS)
			const domain = new URL(url).hostname;
			return (
				domain
					.replace("www.", "")
					.split(".")[0]
					.charAt(0)
					.toUpperCase() +
				domain.replace("www.", "").split(".")[0].slice(1)
			);

			// Option 2: Try to fetch real title (requires CORS solution - see below)
			// const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
			// const data = await response.json();
			// const html = data.contents;
			// const titleMatch = html.match(/<title>(.*?)<\/title>/i);
			// return titleMatch ? titleMatch[1] : domain;
		} catch {
			return "";
		}
	};

	// Handle URL input change with auto-fetch
	const handleUrlChange = async (e) => {
		const url = e.target.value;
		setFormData({ ...formData, url });

		// Auto-fetch title if URL is valid and title is empty
		if (url && url.startsWith("http") && !formData.title) {
			setIsFetchingTitle(true);
			try {
				const fetchedTitle = await fetchPageTitle(url);
				if (fetchedTitle) {
					setFormData((prev) => ({ ...prev, title: fetchedTitle }));
				}
			} catch (error) {
				console.error("Failed to fetch title:", error);
			} finally {
				setIsFetchingTitle(false);
			}
		}
	};

	if (!isOpen) return null;

	const handleSubmit = (e) => {
		e.preventDefault();
		const tagsArray = formData.tags
			.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag);
		onSave({
			...formData,
			tags: tagsArray,
		});
		setFormData({
			title: "",
			url: "",
			category: "Other",
			subcategory: "",
			tags: "",
			notes: "",
		});
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Add New Resource</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X size={24} />
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label className="block text-sm font-medium mb-1">
							URL *
						</label>
						<div className="relative">
							<input
								type="url"
								required
								placeholder="https://example.com"
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={formData.url}
								onChange={handleUrlChange}
							/>
							{isFetchingTitle && (
								<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
									<Loader
										size={18}
										className="animate-spin text-gray-400"
									/>
								</div>
							)}
						</div>
						<p className="text-xs text-gray-500 mt-1">
							💡 Title will be auto-suggested from URL
						</p>
					</div>

					<div className="mb-3">
						<label className="block text-sm font-medium mb-1">
							Title *
						</label>
						<input
							type="text"
							required
							placeholder="e.g., Google AI Studio"
							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={formData.title}
							onChange={(e) =>
								setFormData({
									...formData,
									title: e.target.value,
								})
							}
						/>
					</div>

					<div className="mb-3">
						<label className="block text-sm font-medium mb-1">
							Category
						</label>
						<select
							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={formData.category}
							onChange={(e) =>
								setFormData({
									...formData,
									category: e.target.value,
								})
							}
						>
							{categories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>

					<div className="mb-3">
						<label className="block text-sm font-medium mb-1">
							Subcategory
						</label>
						<input
							type="text"
							placeholder="e.g. Chat, Database, Deployment"
							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={formData.subcategory}
							onChange={(e) =>
								setFormData({
									...formData,
									subcategory: e.target.value,
								})
							}
						/>
					</div>

					<div className="mb-3">
						<label className="block text-sm font-medium mb-1">
							Tags (comma-separated)
						</label>
						<input
							type="text"
							placeholder="e.g., llm, free, api"
							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={formData.tags}
							onChange={(e) =>
								setFormData({
									...formData,
									tags: e.target.value,
								})
							}
						/>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium mb-1">
							Notes
						</label>
						<textarea
							rows="3"
							placeholder="Optional notes about this resource..."
							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={formData.notes}
							onChange={(e) =>
								setFormData({
									...formData,
									notes: e.target.value,
								})
							}
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
					>
						Save Resource
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddLinkModal;
