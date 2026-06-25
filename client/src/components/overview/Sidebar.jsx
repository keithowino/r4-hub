import { useState } from "react";
import {
	ChevronDownIcon,
	ChevronRightIcon,
	CrownIcon,
	FolderIcon,
	LayoutDashboard,
	PlusIcon,
	StarIcon,
	TagsIcon,
	XIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCommon } from "../../lib/context/CommonContext";

const Sidebar = ({
	setSearch,
	resources,
	favorites,
	uniqueCategories,
	allTags,
	isOpen,
	onClose,
}) => {
	const { categories, getCatColor } = useCommon();
	const [activeFilter, setActiveFilter] = useState("All");
	const [expandedFolders, setExpandedFolders] = useState([
		"AI Tools",
		"Dev Platforms",
	]);

	const location = useLocation();

	const mainNav = [
		{ icon: LayoutDashboard, label: "Dashboard", path: "/overview" },
		{ icon: StarIcon, label: "Favorites", path: "/overview/favorites" },
		{ icon: TagsIcon, label: "Categories", path: "/overview/categories" },
	];

	const folders = [
		{ name: "AI Tools", count: 12, color: "#e64799" },
		{ name: "Dev Platforms", count: 8, color: "#12acdb" },
		{ name: "Cloud Services", count: 6, color: "#2197eb" },
		{ name: "Code Tools", count: 10, color: "#f24d3a" },
	];

	const toggleFolder = (name) => {
		setExpandedFolders((prev) =>
			prev.includes(name)
				? prev.filter((f) => f !== name)
				: [...prev, name],
		);
	};

	return (
		<>
			{/* Mobile Backdrop */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/70 z-40 xl:hidden"
					onClick={onClose}
				/>
			)}

			<aside
				className={`
					fixed xl:static inset-y-0 left-0 z-50 w-72 bg-[#161920] border-r border-[#2a3044] 
					transform transition-transform duration-300 xl:translate-x-0 overflow-y-auto
					${isOpen ? "translate-x-0" : "-translate-x-full"}
				`}
			>
				<div className="p-4 xl:p-3 flex items-center justify-between xl:hidden border-b border-[#2a3044]">
					<h2 className="text-lg font-semibold">Menu</h2>
					<button onClick={onClose} className="text-gray-400">
						<XIcon size={22} />
					</button>
				</div>

				<div className="p-3 space-y-6">
					{/* Main Navigation */}
					<nav className="space-y-1">
						{mainNav.map((item) => {
							const isActive = location.pathname === item.path;
							return (
								<Link
									key={item.path}
									to={item.path}
									onClick={onClose}
									className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
										isActive
											? "bg-blue-500/10 text-blue-400"
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
					<div>
						<div className="flex items-center justify-between px-3 mb-3">
							<span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
								Folders
							</span>
							<button className="p-1 rounded hover:bg-white/5">
								<PlusIcon size={14} />
							</button>
						</div>
						<div className="space-y-1 px-2">
							{folders.map((folder) => {
								const isExpanded = expandedFolders.includes(
									folder.name,
								);
								return (
									<div key={folder.name}>
										<button
											onClick={() =>
												toggleFolder(folder.name)
											}
											className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-gray-300"
										>
											<div className="flex items-center gap-2">
												<FolderIcon
													size={16}
													fill={folder.color}
												/>
												{folder.name}
											</div>
											<div className="flex items-center gap-2 text-xs text-gray-500">
												{folder.count}
												{isExpanded ? (
													<ChevronDownIcon
														size={14}
													/>
												) : (
													<ChevronRightIcon
														size={14}
													/>
												)}
											</div>
										</button>
									</div>
								);
							})}
						</div>
					</div>

					{/* Categories */}
					{uniqueCategories.length > 0 && (
						<div>
							<div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
								Categories
							</div>
							{uniqueCategories.map((cat) => {
								const c = getCatColor(cat);
								return (
									<div
										key={cat}
										onClick={() => setActiveFilter(cat)}
										className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-white/5 text-sm"
									>
										<div
											className="w-2 h-2 rounded-full"
											style={{ background: c }}
										/>
										{cat}
										<span className="ml-auto text-xs text-gray-500">
											{
												resources.filter(
													(r) => r.category === cat,
												).length
											}
										</span>
									</div>
								);
							})}
						</div>
					)}

					{/* Upgrade Card */}
					<div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
						<div className="flex items-center gap-2 mb-3">
							<CrownIcon size={18} className="text-yellow-400" />
							<span className="font-semibold">
								Upgrade to Pro
							</span>
						</div>
						<p className="text-xs text-gray-400 mb-4">
							Unlock custom themes, analytics & more.
						</p>
						<button className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-sm font-medium">
							Upgrade Now
						</button>
					</div>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
