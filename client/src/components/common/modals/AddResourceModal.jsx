import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	X,
	Link,
	Tag,
	FileText,
	Loader,
	Globe,
	FolderOpen,
	Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";
import { CATEGORIES, CATEGORY_COLORS } from "../../../utils/constants";

const AddResourceModal = ({
	isOpen,
	onClose,
	onSave,
	editingResource = null,
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFetchingTitle, setIsFetchingTitle] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		url: "",
		category: "AI Tools",
		tags: "",
		description: "",
		icon: "",
	});

	// Reset form when modal opens/closes
	useEffect(() => {
		if (isOpen && editingResource) {
			setFormData({
				title: editingResource.title || "",
				url: editingResource.url || "",
				category: editingResource.category || "AI Tools",
				tags: editingResource.tags?.join(", ") || "",
				description: editingResource.description || "",
				icon: editingResource.icon || "",
			});
		} else if (isOpen && !editingResource) {
			// Reset form when opening for new resource
			setFormData({
				title: "",
				url: "",
				category: "AI Tools",
				tags: "",
				description: "",
				icon: "",
			});
		}
	}, [isOpen, editingResource]);

	// Auto-fetch title from URL
	const fetchPageTitle = async (url) => {
		try {
			// Try to fetch real title using a CORS proxy
			const response = await fetch(
				`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
			);
			const data = await response.json();
			const html = data.contents;
			const titleMatch = html.match(/<title>(.*?)<\/title>/i);

			if (titleMatch && titleMatch[1]) {
				return titleMatch[1].trim();
			}

			// Fallback: extract from domain
			const domain = new URL(url).hostname;
			return domain
				.replace("www.", "")
				.split(".")[0]
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");
		} catch {
			// Fallback: extract from domain
			try {
				const domain = new URL(url).hostname;
				return domain
					.replace("www.", "")
					.split(".")[0]
					.split("-")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ");
			} catch {
				return "";
			}
		}
	};

	const handleUrlChange = async (e) => {
		const url = e.target.value;
		setFormData({ ...formData, url });

		// Auto-fetch title if URL is valid and title is empty or was auto-filled
		if (url && url.startsWith("http") && !formData.title) {
			setIsFetchingTitle(true);
			try {
				const fetchedTitle = await fetchPageTitle(url);
				if (fetchedTitle) {
					setFormData((prev) => ({ ...prev, title: fetchedTitle }));
					toast.success("Title auto-fetched! ✨");
				}
			} catch (error) {
				console.error("Failed to fetch title:", error);
			} finally {
				setIsFetchingTitle(false);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Validate URL
			if (
				!formData.url.startsWith("http://") &&
				!formData.url.startsWith("https://")
			) {
				toast.error(
					"Please enter a valid URL starting with http:// or https://",
				);
				setIsSubmitting(false);
				return;
			}

			// Parse tags
			const tagsArray = formData.tags
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag);

			const resourceData = {
				title: formData.title.trim(),
				url: formData.url.trim(),
				category: formData.category,
				tags: tagsArray,
				description: formData.description.trim(),
				icon: formData.icon || "🔗",
			};

			await onSave(resourceData);
			onClose();
		} catch (error) {
			console.error("Error saving resource:", error);
			toast.error(
				error.response?.data?.message || "Failed to save resource",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	// If modal is not open, return null
	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				{/* Backdrop */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
					className="absolute inset-0 bg-black/80 backdrop-blur-sm"
				/>

				{/* Modal */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: 20 }}
					transition={{ type: "spring", duration: 0.3 }}
					className="relative w-full max-w-lg bg-[#0A0F1F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
				>
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-white/5 flex-shrink-0">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
								<Sparkles size={20} className="text-blue-400" />
							</div>
							<div>
								<h2 className="text-xl font-bold text-white">
									{editingResource
										? "Edit Resource"
										: "Add New Resource"}
								</h2>
								<p className="text-sm text-gray-500">
									{editingResource
										? "Update your resource details"
										: "Add a new resource to your collection"}
								</p>
							</div>
						</div>
						<button
							type="button"
							onClick={onClose}
							className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
						>
							<X size={20} />
						</button>
					</div>

					{/* Form - Scrollable body */}
					<div className="overflow-y-auto flex-1 p-6">
						<form
							id="resource-form"
							onSubmit={handleSubmit}
							className="space-y-4"
						>
							{/* URL */}
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-1.5">
									URL *
								</label>
								<div className="relative">
									<Link
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
										size={18}
									/>
									<input
										type="url"
										value={formData.url}
										onChange={handleUrlChange}
										placeholder="https://example.com"
										required
										className="w-full pl-10 pr-12 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500"
									/>
									{isFetchingTitle && (
										<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
											<Loader
												size={18}
												className="animate-spin text-blue-400"
											/>
										</div>
									)}
								</div>
								<p className="text-xs text-gray-500 mt-1.5">
									💡 Title will be auto-fetched from the URL
								</p>
							</div>

							{/* Title */}
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-1.5">
									Title *
								</label>
								<div className="relative">
									<FileText
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
										size={18}
									/>
									<input
										type="text"
										value={formData.title}
										onChange={(e) =>
											setFormData({
												...formData,
												title: e.target.value,
											})
										}
										placeholder="e.g., ChatGPT, GitHub, Supabase"
										required
										className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500"
									/>
								</div>
							</div>

							{/* Icon */}
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-1.5">
									Icon (emoji)
								</label>
								<input
									type="text"
									value={formData.icon}
									onChange={(e) =>
										setFormData({
											...formData,
											icon: e.target.value,
										})
									}
									placeholder="🤖"
									maxLength={2}
									className="w-20 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500 text-center text-2xl"
								/>
							</div>

							{/* Category */}
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-1.5">
									Category *
								</label>
								<div className="relative">
									<FolderOpen
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
										size={18}
									/>
									<select
										value={formData.category}
										onChange={(e) =>
											setFormData({
												...formData,
												category: e.target.value,
											})
										}
										className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white appearance-none cursor-pointer"
									>
										{CATEGORIES.map((category) => (
											<option
												key={category}
												value={category}
												className="bg-[#0A0F1F]"
											>
												{category}
											</option>
										))}
									</select>
								</div>
								{/* Category color preview */}
								<div className="mt-1.5 flex items-center gap-2">
									<div
										className={`w-2 h-2 rounded-full bg-gradient-to-r ${CATEGORY_COLORS[formData.category] || CATEGORY_COLORS.Other}`}
									/>
									<span className="text-xs text-gray-500">
										Selected: {formData.category}
									</span>
								</div>
							</div>

							{/* Tags */}
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-1.5">
									Tags
								</label>
								<div className="relative">
									<Tag
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
										size={18}
									/>
									<input
										type="text"
										value={formData.tags}
										onChange={(e) =>
											setFormData({
												...formData,
												tags: e.target.value,
											})
										}
										placeholder="AI, LLM, API, Database, Cloud"
										className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500"
									/>
								</div>
								<p className="text-xs text-gray-500 mt-1.5">
									Separate tags with commas
								</p>
							</div>

							{/* Description */}
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-1.5">
									Description
								</label>
								<div className="relative">
									<Globe
										className="absolute left-3 top-3 text-gray-500"
										size={18}
									/>
									<textarea
										value={formData.description}
										onChange={(e) =>
											setFormData({
												...formData,
												description: e.target.value,
											})
										}
										placeholder="Brief description of the resource..."
										rows={3}
										className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500 resize-none"
									/>
								</div>
							</div>
						</form>
					</div>

					{/* Actions - Fixed at bottom */}
					<div className="flex gap-3 p-6 border-t border-white/5 flex-shrink-0 bg-[#0A0F1F]">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
						>
							Cancel
						</button>
						<button
							type="submit"
							form="resource-form"
							disabled={isSubmitting}
							className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						>
							{isSubmitting ? (
								<>
									<Loader
										size={18}
										className="animate-spin"
									/>
									{editingResource
										? "Updating..."
										: "Saving..."}
								</>
							) : (
								<>
									<Sparkles size={18} />
									{editingResource
										? "Update Resource"
										: "Save Resource"}
								</>
							)}
						</button>
					</div>
				</motion.div>
			</div>
		</AnimatePresence>
	);
};

export default AddResourceModal;
