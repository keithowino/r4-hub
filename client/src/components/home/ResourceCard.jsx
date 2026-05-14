import React from "react";
import { ExternalLink, Trash2, Edit2, Copy, Star } from "lucide-react";
import { toast } from "react-toastify";
import { useData } from "../../lib/context/DataContext";
import { incrementVisit } from "../../lib/services/links";

const ResourceCard = ({ link, onDelete, onEdit, onFavorite, onVisit }) => {
	const { colors } = useData();

	const copyUrl = () => {
		navigator.clipboard.writeText(link.url);
		toast.success("URL copied to clipboard!");
	};

	const getCategoryColor = (category) => {
		return colors[category] || colors["Other"];
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
			<div className="flex justify-between items-start">
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-2">
						{link.favicon && (
							<img
								src={link.favicon}
								alt=""
								className="w-5 h-5"
							/>
						)}
						<h3 className="font-semibold text-lg">{link.title}</h3>
					</div>

					<a
						href={link.url}
						onClick={() => onVisit(link.id)}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 hover:underline break-all"
					>
						{link.url}
					</a>

					<div className="text-xs text-gray-400 mt-1">
						👁️ {link.visitCount || 0} visits
						{link.lastVisited &&
							` • Last: ${new Date(link.lastVisited).toLocaleDateString()}`}
					</div>

					<div className="flex flex-wrap gap-2 mt-2">
						<span
							className={`text-xs px-2 py-1 rounded ${getCategoryColor(link.category)}`}
						>
							{link.category}
						</span>
						{link.tags?.map((tag) => (
							<span
								key={tag}
								className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
							>
								#{tag}
							</span>
						))}
					</div>

					{link.notes && (
						<p className="text-sm text-gray-600 mt-2">
							{link.notes}
						</p>
					)}
				</div>

				<div className="flex items-center gap-2 ml-4">
					<button
						onClick={() => onFavorite(link.id)}
						className="text-gray-500 hover:text-yellow-500 transition"
						title={
							link.favorite
								? "Remove from favorites"
								: "Add to favorites"
						}
					>
						<Star
							size={18}
							fill={link.favorite ? "currentColor" : "none"}
							className={link.favorite ? "text-yellow-500" : ""}
						/>
					</button>
					<button
						onClick={copyUrl}
						className="text-gray-500 hover:text-blue-600 transition"
						title="Copy URL"
					>
						<Copy size={18} />
					</button>
					<button
						onClick={() => onEdit(link)}
						className="text-gray-500 hover:text-green-600 transition"
						title="Edit"
					>
						<Edit2 size={18} />
					</button>
					<button
						onClick={() => onDelete(link.id)}
						className="text-gray-500 hover:text-red-600 transition"
						title="Delete"
					>
						<Trash2 size={18} />
					</button>
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-500 hover:text-blue-600 transition"
						title="Open"
					>
						<ExternalLink
							size={18}
							onClick={() => onVisit(link.id)}
						/>
					</a>
				</div>
			</div>
		</div>
	);
};

export default ResourceCard;
