import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";
import Logo from "../common/Logo";
import { useCommon } from "../../lib/context/CommonContext";
import {
	BellIcon,
	BrainIcon,
	CloudIcon,
	FolderOpenIcon,
	LayoutDashboard,
	SearchIcon,
	Server,
	UserIcon,
	WrenchIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const Navbar = ({ setIsSearchOpen, handleLogout, openAddModal }) => {
	const { styles } = useCommon();
	const { user } = useAuth();

	const location = useLocation();

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
		{
			id: "cloud",
			label: "Cloud",
			icon: CloudIcon,
			path: "/overview/cloud",
		},
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

	return (
		<nav className="sticky top-0 left-0 right-0 z-50 bg-[#161920] backdrop-blur-xl border-b border-white/5">
			<div className="flex items-center justify-between px-5 h-[52px]">
				<Link to="/">
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
					<button
						onClick={() => setIsSearchOpen(!isSearchOpen)}
						className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-400"
					>
						<SearchIcon size={16} />
						<span className="hidden sm:inline">Search</span>
						<kbd className="px-1.5 py-0.5 rounded bg-white/10 text-xs font-mono">
							⌘K
						</kbd>
					</button>

					<button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
						<BellIcon size={20} className="text-gray-400" />
						<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
					</button>

					<Link to="/profile" className="flex items-center gap-2">
						<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
							{user?.name ? (
								user.name[0].toUpperCase()
							) : (
								<UserIcon size={16} />
							)}
						</div>
					</Link>
				</div>
			</div>
			{/* <div style={styles.navLeft}>
				<Link to="/">
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
			</div>

			<div style={styles.searchWrap}>
				<span style={styles.searchIcon}>⌕</span>
				<input
					style={styles.searchInput}
					placeholder="Search resources, tags, categories..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				{search && (
					<button
						style={styles.clearSearch}
						onClick={() => setSearch("")}
					>
						✕
					</button>
				)}
			</div>

			<div style={styles.navRight}>
				<button style={styles.addBtn} onClick={openAddModal}>
					+ Add Resource
				</button>
				<div style={styles.avatar} title={user?.name}>
					{user?.name?.slice(0, 2).toUpperCase() || "?"}
				</div>
				<button
					style={styles.logoutBtn}
					onClick={handleLogout}
					title="Sign out"
				>
					⎋
				</button>
			</div> */}
		</nav>
	);
};

export default Navbar;
