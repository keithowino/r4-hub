import { useCallback, useEffect, useState } from "react";
import { useCommon } from "../../lib/context/CommonContext";
import { getResources } from "../../lib/services/resourceService";
import {
	ChevronDownIcon,
	ChevronRightIcon,
	CrownIcon,
	FolderOpenIcon,
	LayoutDashboard,
	PlusIcon,
	StarIcon,
	TagsIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = ({
	openAddModal,
	setSearch,
	resources,
	favorites,
	uniqueCategories,
	allTags,
}) => {
	const { categories, styles, getCatColor } = useCommon();
	const [activeFilter, setActiveFilter] = useState("All");
	const [loading, setLoading] = useState(true);
	const [expandedFolders, setExpandedFolders] = useState([
		"AI Tools",
		"Dev Platforms",
	]);

	const location = useLocation();

	const mainNav = [
		{ icon: LayoutDashboard, label: "Dashboard", path: "/overview" },
		{ icon: StarIcon, label: "Favorites", path: "/overview/favorites" },
		{
			icon: FolderOpenIcon,
			label: "All Resources",
			path: "/overview/resources",
		},
		{ icon: TagsIcon, label: "Categories", path: "/overview/categories" },
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

	const loadResources = useCallback(async () => {
		setLoading(true);
		try {
			const res = await getResources();
			setResources(res.data || []);
		} catch {
			toast.error("Failed to load resources");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadResources();
	}, [loadResources]);

	const toggleFolder = (name) => {
		setExpandedFolders((prev) =>
			prev.includes(name)
				? prev.filter((f) => f !== name)
				: [...prev, name],
		);
	};

	return (
		// <aside style={styles.sidebar}>
		<aside className="bg-[#161920] border-r-[1px] border-solid border-[#2a3044] py-3 px-2 overflow-y-auto flex flex-col gap-0.5">
			<div style={styles.sideSection}>
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
			</div>

			<div className="mb-6">
				<div className="flex items-center justify-between px-3 mb-2">
					<span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
						Folders
					</span>
					<button className="p-1 rounded hover:bg-white/5 transition-colors">
						<PlusIcon size={14} className="text-gray-400" />
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
											<ChevronDownIcon
												size={14}
												className="text-gray-500"
											/>
										) : (
											<ChevronRightIcon
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

			{uniqueCategories.length > 0 && (
				<div style={styles.sideSection}>
					<div style={styles.sideLabel}>Categories</div>
					{uniqueCategories.map((cat) => {
						const c = getCatColor(cat);
						return (
							<div
								key={cat}
								style={{
									...styles.sideItem,
									...(activeFilter === cat
										? styles.sideItemActive
										: {}),
								}}
								onClick={() => setActiveFilter(cat)}
							>
								<span
									style={{
										...styles.catDot,
										background: c.text,
									}}
								/>
								{cat}
								<span style={styles.sideCount}>
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

			{allTags.length > 0 && (
				<div style={styles.sideSection}>
					<div style={styles.sideLabel}>Tags</div>
					<div style={styles.tagCloud}>
						{allTags.slice(0, 16).map((tag) => (
							<span
								key={tag}
								style={styles.tagPill}
								onClick={() => setSearch(tag)}
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			)}

			{/* Upgrade Card */}
			<div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5">
				<div className="flex items-center gap-2 mb-2">
					<CrownIcon size={16} className="text-yellow-500" />
					<span className="text-sm font-semibold">
						Upgrade to Pro
					</span>
				</div>
				<p className="text-xs text-gray-400 mb-3 text-center">
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
