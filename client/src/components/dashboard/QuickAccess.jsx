import React from "react";
import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";

const QuickAccess = ({ resources = [], onAdd }) => {
	const favorites = resources.filter((r) => r.favorite).slice(0, 5);

	return (
		<div className="mb-8">
			<h2 className="text-sm font-semibold text-gray-400 mb-3">
				Quick Access
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
				{favorites.map((resource) => (
					<motion.a
						key={resource.id}
						href={resource.url}
						target="_blank"
						rel="noopener noreferrer"
						whileHover={{ y: -2, scale: 1.02 }}
						className="relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all group"
					>
						<div className="flex items-center justify-between mb-2">
							<span className="text-2xl">
								{resource.icon || "🔗"}
							</span>
							<Star
								size={14}
								className="text-yellow-500 fill-yellow-500"
							/>
						</div>
						<h3 className="text-sm font-medium text-white">
							{resource.title}
						</h3>
						<p className="text-xs text-gray-500">
							{resource.category}
						</p>
					</motion.a>
				))}
				<motion.button
					whileHover={{ y: -2, scale: 1.02 }}
					onClick={onAdd}
					className="p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white"
				>
					<Plus size={24} />
					<span className="text-xs">Add New</span>
				</motion.button>
			</div>
		</div>
	);
};

export default QuickAccess;
