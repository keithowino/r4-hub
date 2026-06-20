import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";
import Logo from "../common/Logo";
import {
	BellIcon,
	BrainIcon,
	CloudIcon,
	FolderOpenIcon,
	LayoutDashboard,
	SearchIcon,
	Server,
	WrenchIcon,
	UserIcon,
	LogOutIcon,
	SettingsIcon,
	ChevronDownIcon,
	ShieldIcon,
	KeyIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommon } from "../../lib/context/CommonContext";

const tabs = [
	{
		id: "dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
		path: "/overview",
	},
	{
		id: "ai-tools",
		label: "AI Tools",
		icon: BrainIcon,
		path: "/overview/ai-tools",
	},
	{
		id: "platforms",
		label: "Platforms",
		icon: Server,
		path: "/overview/platforms",
	},
	{ id: "cloud", label: "Cloud", icon: CloudIcon, path: "/overview/cloud" },
	{
		id: "dev-tools",
		label: "Dev Tools",
		icon: WrenchIcon,
		path: "/overview/dev-tools",
	},
	{
		id: "resources",
		label: "Resources",
		icon: FolderOpenIcon,
		path: "/overview/resources",
	},
];

// ─── Profile Dropdown ─────────────────────────────────────────────────────────

const ProfileDropdown = ({ user, handleLogout }) => {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	// Close on outside click
	useEffect(() => {
		const handler = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	// Close on Escape
	useEffect(() => {
		const handler = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, []);

	const initials = user?.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.slice(0, 2)
				.join("")
				.toUpperCase()
		: "?";

	const menuItems = [
		{
			group: "Account",
			items: [
				{
					icon: UserIcon,
					label: "My Profile",
					action: null,
					href: "/profile",
				},
				{
					icon: SettingsIcon,
					label: "Settings",
					action: null,
					href: "/settings",
				},
				{
					icon: KeyIcon,
					label: "Change Password",
					action: null,
					href: "/settings/password",
				},
			],
		},
		{
			group: "Security",
			items: [
				{
					icon: ShieldIcon,
					label: "Privacy",
					action: null,
					href: "/settings/privacy",
				},
			],
		},
	];

	return (
		<div ref={ref} className="relative">
			{/* Trigger */}
			<button
				onClick={() => setOpen((prev) => !prev)}
				className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/5 transition-colors group"
			>
				<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
					{initials}
				</div>
				<ChevronDownIcon
					size={14}
					className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
				/>
			</button>

			{/* Dropdown */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.15, ease: "easeOut" }}
						className="absolute right-0 top-full mt-2 w-56 bg-[#1a1f2e] border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50"
					>
						{/* User info header */}
						<div className="px-4 py-3 border-b border-white/5">
							<div className="flex items-center gap-3">
								<div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
									{initials}
								</div>
								<div className="min-w-0">
									<p className="text-sm font-semibold text-white truncate">
										{user?.name || "User"}
									</p>
									<p className="text-xs text-gray-400 truncate">
										{user?.email || ""}
									</p>
								</div>
							</div>
						</div>

						{/* Menu groups */}
						{menuItems.map((group) => (
							<div
								key={group.group}
								className="py-1 border-b border-white/5 last:border-none"
							>
								<p className="px-4 pt-2 pb-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
									{group.group}
								</p>
								{group.items.map((item) => (
									<Link
										key={item.label}
										to={item.href}
										onClick={() => setOpen(false)}
										className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
									>
										<item.icon
											size={15}
											className="text-gray-400 flex-shrink-0"
										/>
										{item.label}
									</Link>
								))}
							</div>
						))}

						{/* Logout */}
						<div className="py-1">
							<button
								onClick={() => {
									setOpen(false);
									handleLogout();
								}}
								className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
							>
								<LogOutIcon
									size={15}
									className="flex-shrink-0"
								/>
								Sign out
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = ({ setIsSearchOpen, handleLogout, openAddModal }) => {
	const { user } = useAuth();
	const { setIsAddResModalOpen } = useCommon();
	const location = useLocation();

	return (
		<nav className="sticky top-0 left-0 right-0 z-50 bg-[#161920] backdrop-blur-xl border-b border-white/5">
			<div className="flex items-center justify-between px-5 h-[52px] gap-4">
				{/* Logo */}
				<Link to="/" className="flex-shrink-0">
					<Logo
						gap="1"
						fontsize="lg"
						logoIcon={{
							width: "25px",
							height: "25px",
							fontSize: "11px",
						}}
					/>
				</Link>

				{/* Nav Tabs */}
				<div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
					{tabs.map((tab) => {
						const isActive = location.pathname === tab.path;
						return (
							<Link
								key={tab.id}
								to={tab.path}
								className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
									isActive
										? "text-white"
										: "text-gray-400 hover:text-white hover:bg-white/5"
								}`}
							>
								{isActive && (
									<motion.div
										layoutId="navbar-active"
										className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10"
										transition={{
											type: "spring",
											duration: 0.5,
											bounce: 0.2,
										}}
									/>
								)}
								<tab.icon
									size={15}
									className="relative z-10 flex-shrink-0"
								/>
								<span className="relative z-10">
									{tab.label}
								</span>
							</Link>
						);
					})}
				</div>

				{/* Right Actions */}
				<div className="flex items-center gap-2 flex-shrink-0">
					{/* Search */}
					<button
						onClick={() => setIsSearchOpen((prev) => !prev)}
						className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-400 hover:text-white"
					>
						<SearchIcon size={15} />
						<span className="hidden sm:inline">Search</span>
						<kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white/10 text-xs font-mono">
							⌘K
						</kbd>
					</button>

					{/* Notifications */}
					<button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
						<BellIcon size={18} />
						<span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
					</button>

					{/* Add Resource shortcut */}
					<button
						// onClick={openAddModal}
						onClick={() => setIsAddResModalOpen((prev) => !prev)}
						className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
					>
						<span className="text-base leading-none">+</span>
						<span>Add</span>
					</button>

					{/* Profile Dropdown */}
					<ProfileDropdown user={user} handleLogout={handleLogout} />
				</div>
			</div>

			{/* Mobile tab strip */}
			<div className="lg:hidden flex items-center gap-0.5 px-3 pb-2 overflow-x-auto scrollbar-hide">
				{tabs.map((tab) => {
					const isActive = location.pathname === tab.path;
					return (
						<Link
							key={tab.id}
							to={tab.path}
							className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
								isActive
									? "bg-blue-500/20 text-blue-400"
									: "text-gray-400 hover:text-white hover:bg-white/5"
							}`}
						>
							<tab.icon size={13} />
							{tab.label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default Navbar;
