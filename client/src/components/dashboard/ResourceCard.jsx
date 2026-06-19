import React from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink, Copy, Trash2, Eye } from "lucide-react";
import { toast } from "react-toastify";

const ResourceCard = ({
	resource,
	onFavorite,
	onDelete,
	onVisit,
	viewMode = "grid",
}) => {
	const resourceId = resource._id || resource.id;

	const copyUrl = () => {
		navigator.clipboard.writeText(resource.url);
		toast.success("URL copied to clipboard!");
	};

	const handleVisit = () => {
		if (resourceId) {
			onVisit(resourceId);
			window.open(resource.url, "_blank");
		}
	};

	// ✅ Safely get tags array
	const tags = Array.isArray(resource.tags) ? resource.tags : [];

	if (viewMode === "list") {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all group"
			>
				<span className="text-2xl">{resource.icon || "🔗"}</span>
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2">
						<h3 className="font-medium text-white truncate">
							{resource.title}
						</h3>
						<span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
							{resource.category}
						</span>
					</div>
					<p className="text-sm text-gray-500 truncate">
						{resource.description}
					</p>
				</div>
				<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
					<button
						onClick={handleVisit}
						className="p-1.5 rounded hover:bg-white/5 transition-colors"
					>
						<ExternalLink size={16} className="text-gray-400" />
					</button>
					<button
						onClick={copyUrl}
						className="p-1.5 rounded hover:bg-white/5 transition-colors"
					>
						<Copy size={16} className="text-gray-400" />
					</button>
					<button
						onClick={() => onFavorite(resourceId)}
						className="p-1.5 rounded hover:bg-white/5 transition-colors"
					>
						<Star
							size={16}
							className={
								resource.favorite
									? "text-yellow-500 fill-yellow-500"
									: "text-gray-400"
							}
						/>
					</button>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ y: -4, scale: 1.02 }}
			className="group p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.05)]"
		>
			<div className="flex items-start justify-between mb-2">
				<div className="flex items-center gap-2">
					<span className="text-2xl">{resource.icon || "🔗"}</span>
					<h3 className="font-medium text-white truncate">
						{resource.title}
					</h3>
				</div>
				<button
					onClick={() => onFavorite(resourceId)}
					className="p-1 rounded hover:bg-white/5 transition-colors"
				>
					<Star
						size={16}
						className={
							resource.favorite
								? "text-yellow-500 fill-yellow-500"
								: "text-gray-500 group-hover:text-yellow-500"
						}
					/>
				</button>
			</div>

			<p className="text-sm text-gray-400 mb-2 line-clamp-2">
				{resource.description}
			</p>

			<div className="flex flex-wrap gap-1.5 mb-3">
				<span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
					{resource.category}
				</span>
				{/* ✅ FIX: Only render tags if they exist and are an array */}
				{tags.length > 0 &&
					tags.slice(0, 3).map((tag, index) => (
						<span
							key={`${resourceId}-tag-${index}`}
							className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400"
						>
							#{tag}
						</span>
					))}
			</div>

			<div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
				<div className="flex items-center gap-1">
					<button
						onClick={handleVisit}
						className="p-1.5 rounded hover:bg-white/5 transition-colors"
					>
						<ExternalLink size={14} className="text-gray-400" />
					</button>
					<button
						onClick={copyUrl}
						className="p-1.5 rounded hover:bg-white/5 transition-colors"
					>
						<Copy size={14} className="text-gray-400" />
					</button>
					<button
						onClick={() => onDelete(resourceId)}
						className="p-1.5 rounded hover:bg-red-500/10 transition-colors"
					>
						<Trash2
							size={14}
							className="text-gray-400 hover:text-red-400"
						/>
					</button>
				</div>
				<div className="flex items-center gap-1 text-xs text-gray-500">
					<Eye size={12} />
					<span>{resource.visitCount || 0}</span>
				</div>
			</div>
		</motion.div>
	);
};

export default ResourceCard;
