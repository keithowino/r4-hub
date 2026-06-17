import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Search,
	Bell,
	User,
	Command,
	LayoutDashboard,
	Brain,
	Server,
	Cloud,
	Wrench,
	FolderOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../lib/context/AuthContext";

const Navbar = () => {
	const { user } = useAuth();
	const location = useLocation();
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const tabs = [
		{
			id: "dashboard",
			label: "Dashboard",
			icon: LayoutDashboard,
			path: "/",
		},
		{ id: "ai-tools", label: "AI Tools", icon: Brain, path: "/ai-tools" },
		{
			id: "platforms",
			label: "Platforms",
			icon: Server,
			path: "/platforms",
		},
		{ id: "cloud", label: "Cloud", icon: Cloud, path: "/cloud" },
		{
			id: "dev-tools",
			label: "Dev Tools",
			icon: Wrench,
			path: "/dev-tools",
		},
		{
			id: "resources",
			label: "Resources",
			icon: FolderOpen,
			path: "/resources",
		},
	];

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1F]/80 backdrop-blur-xl border-b border-white/5">
			<div className="flex items-center justify-between px-6 h-16">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2">
					<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
						R
					</div>
					<span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
						R4 Hub
					</span>
				</Link>

				{/* Navigation Tabs */}
				<div className="hidden lg:flex items-center gap-1">
					{tabs.map((tab) => {
						const isActive = location.pathname === tab.path;
						return (
							<Link
								key={tab.id}
								to={tab.path}
								className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
									isActive
										? "text-white"
										: "text-gray-400 hover:text-white hover:bg-white/5"
								}`}
							>
								{isActive && (
									<motion.div
										layoutId="navbar-active"
										className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
										transition={{
											type: "spring",
											duration: 0.6,
										}}
									/>
								)}
								<span className="relative flex items-center gap-2">
									<tab.icon size={16} />
									{tab.label}
								</span>
							</Link>
						);
					})}
				</div>

				{/* Right Actions */}
				<div className="flex items-center gap-4">
					{/* Search */}
					<button
						onClick={() => setIsSearchOpen(!isSearchOpen)}
						className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-400"
					>
						<Search size={16} />
						<span className="hidden sm:inline">Search</span>
						<kbd className="px-1.5 py-0.5 rounded bg-white/10 text-xs font-mono">
							⌘K
						</kbd>
					</button>

					{/* Notifications */}
					<button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
						<Bell size={20} className="text-gray-400" />
						<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
					</button>

					{/* User Avatar */}
					<Link to="/profile" className="flex items-center gap-2">
						<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
							{user?.name ? (
								user.name[0].toUpperCase()
							) : (
								<User size={16} />
							)}
						</div>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
