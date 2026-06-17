import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	LayoutDashboard,
	Star,
	FolderOpen,
	Tags,
	ChevronDown,
	ChevronRight,
	Plus,
	Crown,
	Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
	const location = useLocation();
	const [expandedFolders, setExpandedFolders] = useState([
		"AI Tools",
		"Dev Platforms",
	]);

	const mainNav = [
		{ icon: LayoutDashboard, label: "Dashboard", path: "/" },
		{ icon: Star, label: "Favorites", path: "/favorites" },
		{ icon: FolderOpen, label: "All Resources", path: "/resources" },
		{ icon: Tags, label: "Categories", path: "/categories" },
	];

	const folders = [
		{ name: "AI Tools", count: 12, color: "from-purple-500 to-pink-500" },
		{ name: "Dev Platforms", count: 8, color: "from-blue-500 to-cyan-500" },
		{
			name: "Cloud Services",
			count: 6,
			color: "from-sky-500 to-indigo-500",
		},
		{ name: "Code Tools", count: 10, color: "from-orange-500 to-red-500" },
		{ name: "Learning", count: 5, color: "from-violet-500 to-purple-500" },
		{ name: "Work Projects", count: 4, color: "from-teal-500 to-cyan-500" },
	];

	const tags = [
		{ name: "AI", color: "#8B5CF6" },
		{ name: "Backend", color: "#3B82F6" },
		{ name: "Frontend", color: "#60A5FA" },
		{ name: "Cloud", color: "#38BDF8" },
		{ name: "Database", color: "#34D399" },
		{ name: "DevOps", color: "#F472B6" },
		{ name: "Security", color: "#F87171" },
		{ name: "Productivity", color: "#FBBF24" },
	];

	const toggleFolder = (name) => {
		setExpandedFolders((prev) =>
			prev.includes(name)
				? prev.filter((f) => f !== name)
				: [...prev, name],
		);
	};

	return (
		<aside className="w-64 min-h-[calc(100vh-4rem)] bg-[#0A0F1F]/50 backdrop-blur-sm border-r border-white/5 p-4 overflow-y-auto sticky top-16">
			{/* Main Navigation */}
			<nav className="space-y-1 mb-6">
				{mainNav.map((item) => {
					const isActive = location.pathname === item.path;
					return (
						<Link
							key={item.path}
							to={item.path}
							className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
								isActive
									? "bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
									: "text-gray-400 hover:text-white hover:bg-white/5"
							}`}
						>
							<item.icon size={18} />
							<span className="text-sm font-medium">
								{item.label}
							</span>
						</Link>
					);
				})}
			</nav>

			{/* Folders */}
			<div className="mb-6">
				<div className="flex items-center justify-between px-3 mb-2">
					<span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
						Folders
					</span>
					<button className="p-1 rounded hover:bg-white/5 transition-colors">
						<Plus size={14} className="text-gray-400" />
					</button>
				</div>
				<div className="space-y-1">
					{folders.map((folder) => {
						const isExpanded = expandedFolders.includes(
							folder.name,
						);
						return (
							<div key={folder.name}>
								<button
									onClick={() => toggleFolder(folder.name)}
									className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
								>
									<div className="flex items-center gap-2">
										<div
											className={`w-2 h-2 rounded-full bg-gradient-to-r ${folder.color}`}
										/>
										<span className="text-sm text-gray-300">
											{folder.name}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-xs text-gray-500">
											{folder.count}
										</span>
										{isExpanded ? (
											<ChevronDown
												size={14}
												className="text-gray-500"
											/>
										) : (
											<ChevronRight
												size={14}
												className="text-gray-500"
											/>
										)}
									</div>
								</button>
							</div>
						);
					})}
				</div>
			</div>

			{/* Tags */}
			<div className="mb-6">
				<span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
					Tags
				</span>
				<div className="mt-2 flex flex-wrap gap-1.5 px-1">
					{tags.map((tag) => (
						<button
							key={tag.name}
							className="px-2.5 py-1 rounded-full text-xs font-medium transition-all hover:scale-105"
							style={{
								backgroundColor: `${tag.color}20`,
								color: tag.color,
								border: `1px solid ${tag.color}30`,
							}}
						>
							#{tag.name}
						</button>
					))}
				</div>
			</div>

			{/* Upgrade Card */}
			<div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5">
				<div className="flex items-center gap-2 mb-2">
					<Crown size={16} className="text-yellow-500" />
					<span className="text-sm font-semibold">
						Upgrade to Pro
					</span>
				</div>
				<p className="text-xs text-gray-400 mb-3">
					Unlock custom themes, advanced analytics, and more.
				</p>
				<button className="w-full py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all">
					Upgrade Now
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
