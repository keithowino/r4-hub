import React from "react";
import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { useCommon } from "../../lib/context/CommonContext";
import { RIcon } from "../common/Icons";

const CAT_COLORS = {
	LLM: {
		bg: "rgba(168,85,247,0.12)",
		border: "rgba(168,85,247,0.25)",
		text: "#a855f7",
		badge: "rgba(168,85,247,0.15)",
	},
	"AI Tools": {
		bg: "rgba(59,130,246,0.12)",
		border: "rgba(59,130,246,0.25)",
		text: "#3b82f6",
		badge: "rgba(59,130,246,0.15)",
	},
	"AI Agent": {
		bg: "rgba(236,72,153,0.12)",
		border: "rgba(236,72,153,0.25)",
		text: "#ec4899",
		badge: "rgba(236,72,153,0.15)",
	},
	Backend: {
		bg: "rgba(34,197,94,0.12)",
		border: "rgba(34,197,94,0.25)",
		text: "#22c55e",
		badge: "rgba(34,197,94,0.15)",
	},
	Hosting: {
		bg: "rgba(59,130,246,0.12)",
		border: "rgba(59,130,246,0.25)",
		text: "#3b82f6",
		badge: "rgba(59,130,246,0.15)",
	},
	Frontend: {
		bg: "rgba(245,158,11,0.12)",
		border: "rgba(245,158,11,0.25)",
		text: "#f59e0b",
		badge: "rgba(245,158,11,0.15)",
	},
	Database: {
		bg: "rgba(239,68,68,0.12)",
		border: "rgba(239,68,68,0.25)",
		text: "#ef4444",
		badge: "rgba(239,68,68,0.15)",
	},
	Cloud: {
		bg: "rgba(20,184,166,0.12)",
		border: "rgba(20,184,166,0.25)",
		text: "#14b8a6",
		badge: "rgba(20,184,166,0.15)",
	},
	"Dev Tools": {
		bg: "rgba(108,99,255,0.12)",
		border: "rgba(108,99,255,0.25)",
		text: "#6c63ff",
		badge: "rgba(108,99,255,0.15)",
	},
	"Dev Platforms": {
		bg: "rgba(99,102,241,0.12)",
		border: "rgba(99,102,241,0.25)",
		text: "#6366f1",
		badge: "rgba(99,102,241,0.15)",
	},
	"Code Tools": {
		bg: "rgba(249,115,22,0.12)",
		border: "rgba(249,115,22,0.25)",
		text: "#f97316",
		badge: "rgba(249,115,22,0.15)",
	},
	Learning: {
		bg: "rgba(249,115,22,0.12)",
		border: "rgba(249,115,22,0.25)",
		text: "#f97316",
		badge: "rgba(249,115,22,0.15)",
	},
	Productivity: {
		bg: "rgba(16,185,129,0.12)",
		border: "rgba(16,185,129,0.25)",
		text: "#10b981",
		badge: "rgba(16,185,129,0.15)",
	},
	Other: {
		bg: "rgba(139,154,184,0.12)",
		border: "rgba(139,154,184,0.25)",
		text: "#8b9ab8",
		badge: "rgba(139,154,184,0.15)",
	},
};

const getCat = (cat) => CAT_COLORS[cat] || CAT_COLORS.Other;

const QuickAccess = ({ resources = [] }) => {
	const { setIsAddResModalOpen } = useCommon();

	const favorites = resources.filter((r) => r.favorite).slice(0, 5);

	return (
		<div className="mb-8">
			<h2 className="text-sm font-semibold text-gray-400 mb-3">
				Quick Access
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
				{favorites.map((resource) => {
					const c = getCat(resource.category);

					return (
						<motion.a
							key={resource._id || resource.id}
							href={resource.url}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ y: -2, scale: 1.02 }}
							className="relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all group"
						>
							<div className="flex items-center justify-between mb-2">
								<span className="text-2xl">
									<RIcon c={c} resource={resource} />
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
					);
				})}
				<motion.button
					whileHover={{ y: -2, scale: 1.02 }}
					onClick={() => setIsAddResModalOpen((prev) => !prev)}
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
