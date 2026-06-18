// import { useState } from "react";

// const Sidebar = () => {
// 	const [activeFilter, setActiveFilter] = useState("All");

// 	return (
// 		<aside style={s.sidebar}>
// 			<div style={s.sideSection}>
// 				<div
// 					style={{
// 						...s.sideItem,
// 						...(activeFilter === "All" ? s.sideItemActive : {}),
// 					}}
// 					onClick={() => setActiveFilter("All")}
// 				>
// 					<span>⊞</span> Dashboard
// 				</div>
// 				{/* <div
// 					style={{
// 						...s.sideItem,
// 						...(activeFilter === "favorites"
// 							? s.sideItemActive
// 							: {}),
// 					}}
// 					onClick={() => setActiveFilter("favorites")}
// 				>
// 					<span>★</span> Favorites
// 					{favorites.length > 0 && (
// 						<span style={s.sideBadge}>{favorites.length}</span>
// 					)}
// 				</div>
// 				<div style={s.sideItem} onClick={openAddModal}>
// 					<span>+</span> Add Resource
// 				</div> */}
// 			</div>

// 			{/* {uniqueCategories.length > 0 && (
// 				<div style={s.sideSection}>
// 					<div style={s.sideLabel}>Categories</div>
// 					{uniqueCategories.map((cat) => {
// 						const c = getCatColor(cat);
// 						return (
// 							<div
// 								key={cat}
// 								style={{
// 									...s.sideItem,
// 									...(activeFilter === cat
// 										? s.sideItemActive
// 										: {}),
// 								}}
// 								onClick={() => setActiveFilter(cat)}
// 							>
// 								<span
// 									style={{ ...s.catDot, background: c.text }}
// 								/>
// 								{cat}
// 								<span style={s.sideCount}>
// 									{
// 										resources.filter(
// 											(r) => r.category === cat,
// 										).length
// 									}
// 								</span>
// 							</div>
// 						);
// 					})}
// 				</div>
// 			)} */}

// 			{/* {allTags.length > 0 && (
// 				<div style={s.sideSection}>
// 					<div style={s.sideLabel}>Tags</div>
// 					<div style={s.tagCloud}>
// 						{allTags.slice(0, 16).map((tag) => (
// 							<span
// 								key={tag}
// 								style={s.tagPill}
// 								onClick={() => setSearch(tag)}
// 							>
// 								{tag}
// 							</span>
// 						))}
// 					</div>
// 				</div>
// 			)} */}
// 		</aside>
// 	);
// };

// ______________________________________________________________________________________

import { useCallback, useEffect, useState } from "react";
import { useCommon } from "../../lib/context/CommonContext";
import { getResources } from "../../lib/services/resourceService";
import {
	FolderOpenIcon,
	LayoutDashboard,
	StarIcon,
	TagsIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const COLORS = {
	LLM: { bg: "rgba(168,85,247,.15)", text: "#a855f7" },
	"AI Agent": { bg: "rgba(236,72,153,.15)", text: "#ec4899" },
	Backend: { bg: "rgba(34,197,94,.15)", text: "#22c55e" },
	Hosting: { bg: "rgba(59,130,246,.15)", text: "#3b82f6" },
	Frontend: { bg: "rgba(245,158,11,.15)", text: "#f59e0b" },
	Database: { bg: "rgba(239,68,68,.15)", text: "#ef4444" },
	Cloud: { bg: "rgba(20,184,166,.15)", text: "#14b8a6" },
	"Dev Tools": { bg: "rgba(108,99,255,.15)", text: "#6c63ff" },
	Learning: { bg: "rgba(249,115,22,.15)", text: "#f97316" },
	Other: { bg: "rgba(139,154,184,.15)", text: "#8b9ab8" },
};

const getCatColor = (cat) => COLORS[cat] || COLORS.Other;

const Sidebar = ({ openAddModal, setSearch }) => {
	const { categories, styles } = useCommon();
	const [activeFilter, setActiveFilter] = useState("All");
	const [resources, setResources] = useState([]);
	const [loading, setLoading] = useState(true);

	const location = useLocation();
	const favorites = resources.filter((r) => r.favorite);
	const uniqueCategories = [...new Set(resources.map((r) => r.category))];
	const allTags = [...new Set(resources.flatMap((r) => r.tags || []))];

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

	return (
		<aside style={styles.sidebar}>
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
				{/* <div
					style={{
						...styles.sideItem,
						...(activeFilter === "All"
							? styles.sideItemActive
							: {}),
					}}
					onClick={() => setActiveFilter("All")}
				>
					<span>
						<LayoutDashboard size={16} />
					</span>{" "}
					Dashboard
				</div> */}
				{/* <div
					style={{
						...styles.sideItem,
						...(activeFilter === "favorites"
							? styles.sideItemActive
							: {}),
					}}
					onClick={() => setActiveFilter("favorites")}
				>
					<span>
						<StarIcon size={16} />
					</span>{" "}
					Favorites
					{favorites.length > 0 && (
						<span style={styles.sideBadge}>{favorites.length}</span>
					)}
				</div> */}
				{/* <div
					style={{
						...styles.sideItem,
						...(activeFilter === "categories"
							? styles.sideItemActive
							: {}),
					}}
					onClick={() => setActiveFilter("categories")}
				>
					<span>
						<TagsIcon size={16} />
					</span>{" "}
					Categories
				</div> */}
				{/* <div style={styles.sideItem} onClick={openAddModal}>
					<span>+</span> Add Resource
				</div> */}
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
		</aside>
	);
};

export default Sidebar;
