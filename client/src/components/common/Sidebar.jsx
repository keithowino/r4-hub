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

import React, { useCallback, useEffect, useState } from "react";
import { useCommon } from "../../lib/context/CommonContext";
import { getResources } from "../../lib/services/resourceService";

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
	const { categories } = useCommon();
	const [activeFilter, setActiveFilter] = useState("All");
	const [resources, setResources] = useState([]);
	const [loading, setLoading] = useState(true);

	const favorites = resources.filter((r) => r.favorite);
	const uniqueCategories = [...new Set(resources.map((r) => r.category))];
	const allTags = [...new Set(resources.flatMap((r) => r.tags || []))];

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
		<aside style={s.sidebar}>
			<div style={s.sideSection}>
				<div
					style={{
						...s.sideItem,
						...(activeFilter === "All" ? s.sideItemActive : {}),
					}}
					onClick={() => setActiveFilter("All")}
				>
					<span>⊞</span> Dashboard
				</div>
				<div
					style={{
						...s.sideItem,
						...(activeFilter === "favorites"
							? s.sideItemActive
							: {}),
					}}
					onClick={() => setActiveFilter("favorites")}
				>
					<span>★</span> Favorites
					{favorites.length > 0 && (
						<span style={s.sideBadge}>{favorites.length}</span>
					)}
				</div>
				<div style={s.sideItem} onClick={openAddModal}>
					<span>+</span> Add Resource
				</div>
			</div>

			{uniqueCategories.length > 0 && (
				<div style={s.sideSection}>
					<div style={s.sideLabel}>Categories</div>
					{uniqueCategories.map((cat) => {
						const c = getCatColor(cat);
						return (
							<div
								key={cat}
								style={{
									...s.sideItem,
									...(activeFilter === cat
										? s.sideItemActive
										: {}),
								}}
								onClick={() => setActiveFilter(cat)}
							>
								<span
									style={{ ...s.catDot, background: c.text }}
								/>
								{cat}
								<span style={s.sideCount}>
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
				<div style={s.sideSection}>
					<div style={s.sideLabel}>Tags</div>
					<div style={s.tagCloud}>
						{allTags.slice(0, 16).map((tag) => (
							<span
								key={tag}
								style={s.tagPill}
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

// ... (rest of the styles remain the same)

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
	page: {
		minHeight: "100vh",
		background: "#0d0f14",
		color: "#e8eaf0",
		fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
		display: "flex",
		flexDirection: "column",
	},
	topnav: {
		display: "flex",
		alignItems: "center",
		gap: "16px",
		background: "#161920",
		borderBottom: "1px solid #2a3044",
		padding: "0 20px",
		height: "52px",
		flexShrink: 0,
		position: "sticky",
		top: 0,
		zIndex: 20,
	},
	navLeft: {
		display: "flex",
		alignItems: "center",
		gap: "8px",
		minWidth: "120px",
	},
	logoHex: {
		width: "28px",
		height: "28px",
		background: "linear-gradient(135deg,#6c63ff,#3b82f6)",
		borderRadius: "6px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: "900",
		fontSize: "10px",
		color: "#fff",
		flexShrink: 0,
	},
	logoText: { fontWeight: "700", fontSize: "15px", color: "#e8eaf0" },
	accent: { color: "#6c63ff" },
	searchWrap: {
		flex: 1,
		maxWidth: "480px",
		display: "flex",
		alignItems: "center",
		gap: "8px",
		background: "#1e2330",
		border: "1px solid #2a3044",
		borderRadius: "8px",
		padding: "0 12px",
		height: "34px",
	},
	searchIcon: { color: "#3a4260", fontSize: "16px" },
	searchInput: {
		flex: 1,
		background: "none",
		border: "none",
		outline: "none",
		color: "#e8eaf0",
		fontSize: "13px",
	},
	clearSearch: {
		background: "none",
		border: "none",
		color: "#3a4260",
		cursor: "pointer",
		fontSize: "12px",
		padding: "2px",
	},
	navRight: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
		marginLeft: "auto",
	},
	addBtn: {
		padding: "6px 14px",
		background: "linear-gradient(135deg,#6c63ff,#4f46e5)",
		border: "none",
		borderRadius: "6px",
		color: "#fff",
		fontSize: "12px",
		fontWeight: "600",
		cursor: "pointer",
		whiteSpace: "nowrap",
	},
	avatar: {
		width: "30px",
		height: "30px",
		borderRadius: "50%",
		background: "linear-gradient(135deg,#6c63ff,#3b82f6)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "11px",
		fontWeight: "700",
		cursor: "pointer",
		flexShrink: 0,
	},
	logoutBtn: {
		background: "none",
		border: "1px solid #2a3044",
		borderRadius: "6px",
		color: "#5a6a8a",
		cursor: "pointer",
		padding: "4px 8px",
		fontSize: "14px",
	},
	body: {
		display: "grid",
		gridTemplateColumns: "196px 1fr 220px",
		flex: 1,
		overflow: "hidden",
	},
	sidebar: {
		background: "#161920",
		borderRight: "1px solid #2a3044",
		padding: "12px 8px",
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
		gap: "4px",
	},
	sideSection: { marginBottom: "16px" },
	sideLabel: {
		fontSize: "10px",
		fontWeight: "600",
		color: "#3a4260",
		textTransform: "uppercase",
		letterSpacing: ".08em",
		padding: "0 8px 6px",
	},
	sideItem: {
		display: "flex",
		alignItems: "center",
		gap: "8px",
		padding: "6px 8px",
		borderRadius: "6px",
		cursor: "pointer",
		color: "#5a6a8a",
		fontSize: "12px",
		fontWeight: "500",
		transition: "all .15s",
		marginBottom: "1px",
	},
	sideItemActive: { background: "#1e2330", color: "#e8eaf0" },
	sideBadge: {
		marginLeft: "auto",
		background: "#f59e0b",
		color: "#0d0f14",
		borderRadius: "10px",
		padding: "1px 6px",
		fontSize: "10px",
		fontWeight: "700",
	},
	sideCount: { marginLeft: "auto", color: "#3a4260", fontSize: "11px" },
	catDot: { width: "7px", height: "7px", borderRadius: "2px", flexShrink: 0 },
	tagCloud: {
		display: "flex",
		flexWrap: "wrap",
		gap: "4px",
		padding: "0 4px",
	},
	tagPill: {
		padding: "3px 8px",
		borderRadius: "10px",
		background: "#1e2330",
		border: "1px solid #2a3044",
		fontSize: "10px",
		color: "#5a6a8a",
		cursor: "pointer",
	},
	main: { overflowY: "auto", padding: "20px" },
	filterRow: {
		display: "flex",
		gap: "6px",
		flexWrap: "wrap",
		marginBottom: "16px",
	},
	filterChip: {
		padding: "4px 12px",
		borderRadius: "16px",
		border: "1px solid #2a3044",
		background: "#161920",
		color: "#5a6a8a",
		fontSize: "11px",
		fontWeight: "500",
		cursor: "pointer",
	},
	filterChipActive: {
		background: "#4f46e5",
		borderColor: "#6c63ff",
		color: "#fff",
	},
	sectionBlock: { marginBottom: "28px" },
	sectionHeader: { marginBottom: "12px" },
	sectionTitle: {
		fontSize: "13px",
		fontWeight: "600",
		color: "#8b9ab8",
		display: "flex",
		alignItems: "center",
		gap: "6px",
	},
	catCount: {
		marginLeft: "6px",
		fontSize: "11px",
		color: "#3a4260",
		fontWeight: "400",
	},
	quickGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))",
		gap: "10px",
	},
	quickCard: {
		background: "#161920",
		border: "1px solid #2a3044",
		borderRadius: "10px",
		padding: "14px 10px",
		textAlign: "center",
		cursor: "pointer",
		textDecoration: "none",
		display: "block",
		transition: "all .15s",
	},
	quickCardAdd: {
		background: "#161920",
		border: "1px dashed #2a3044",
		borderRadius: "10px",
		padding: "14px 10px",
		textAlign: "center",
		cursor: "pointer",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "8px",
	},
	quickIcon: {
		width: "38px",
		height: "38px",
		borderRadius: "9px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		margin: "0 auto 8px",
	},
	quickAddIcon: { fontSize: "20px", color: "#3a4260" },
	quickName: {
		fontSize: "11px",
		fontWeight: "600",
		color: "#8b9ab8",
		display: "block",
	},
	quickCat: {
		fontSize: "10px",
		color: "#3a4260",
		marginTop: "2px",
		display: "block",
	},
	resourceGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))",
		gap: "10px",
	},
	card: {
		background: "#161920",
		border: "1px solid #2a3044",
		borderRadius: "10px",
		padding: "14px",
		transition: "border-color .15s",
	},
	cardTop: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginBottom: "10px",
	},
	cardIcon: {
		width: "34px",
		height: "34px",
		borderRadius: "8px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	cardName: {
		fontSize: "13px",
		fontWeight: "600",
		color: "#e8eaf0",
		marginBottom: "2px",
	},
	cardType: { fontSize: "10px", color: "#3a4260", marginBottom: "6px" },
	cardNotes: {
		fontSize: "11px",
		color: "#5a6a8a",
		lineHeight: "1.4",
		marginBottom: "8px",
		display: "-webkit-box",
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	},
	cardTags: {
		display: "flex",
		gap: "4px",
		flexWrap: "wrap",
		marginBottom: "8px",
	},
	tag: {
		padding: "2px 6px",
		borderRadius: "4px",
		fontSize: "10px",
		fontWeight: "500",
	},
	cardFooter: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	visits: { fontSize: "10px", color: "#3a4260" },
	cardActions: { display: "flex", gap: "2px" },
	iconBtn: {
		background: "none",
		border: "none",
		color: "#3a4260",
		cursor: "pointer",
		fontSize: "14px",
		padding: "3px 5px",
		borderRadius: "4px",
		textDecoration: "none",
		lineHeight: 1,
	},
	emptyState: { textAlign: "center", padding: "60px 20px" },
	emptyIcon: { fontSize: "40px", color: "#2a3044", marginBottom: "12px" },
	emptyTitle: {
		fontSize: "16px",
		fontWeight: "600",
		color: "#5a6a8a",
		marginBottom: "6px",
	},
	emptyDesc: { fontSize: "13px", color: "#3a4260", marginBottom: "20px" },
	emptyBtn: {
		padding: "8px 20px",
		background: "linear-gradient(135deg,#6c63ff,#4f46e5)",
		border: "none",
		borderRadius: "8px",
		color: "#fff",
		fontSize: "13px",
		fontWeight: "600",
		cursor: "pointer",
	},
	loadingState: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "300px",
		gap: "16px",
	},
	spinner: {
		width: "28px",
		height: "28px",
		border: "2px solid #2a3044",
		borderTopColor: "#6c63ff",
		borderRadius: "50%",
		animation: "spin 0.7s linear infinite",
	},
	loadingText: { fontSize: "13px", color: "#3a4260" },
	rightPanel: {
		background: "#161920",
		borderLeft: "1px solid #2a3044",
		padding: "16px 12px",
		overflowY: "auto",
	},
	panelSection: { marginBottom: "20px" },
	panelTitle: {
		fontSize: "11px",
		fontWeight: "600",
		color: "#5a6a8a",
		textTransform: "uppercase",
		letterSpacing: ".06em",
		marginBottom: "10px",
	},
	statGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" },
	statCard: {
		background: "#1e2330",
		border: "1px solid #2a3044",
		borderRadius: "8px",
		padding: "10px",
		textAlign: "center",
	},
	statNum: { fontSize: "20px", fontWeight: "700", color: "#e8eaf0" },
	statLabel: { fontSize: "10px", color: "#3a4260", marginTop: "2px" },
	visitRow: {
		display: "flex",
		alignItems: "center",
		gap: "8px",
		padding: "5px 0",
		borderBottom: "1px solid #1e2330",
	},
	visitDot: {
		width: "24px",
		height: "24px",
		borderRadius: "6px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "9px",
		fontWeight: "700",
		flexShrink: 0,
	},
	visitName: {
		flex: 1,
		fontSize: "11px",
		color: "#8b9ab8",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	visitCount: { fontSize: "11px", color: "#3a4260", flexShrink: 0 },
	userCard: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
		marginBottom: "10px",
	},
	userAvatar: {
		width: "32px",
		height: "32px",
		borderRadius: "50%",
		background: "linear-gradient(135deg,#6c63ff,#3b82f6)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "11px",
		fontWeight: "700",
		flexShrink: 0,
	},
	userName: { fontSize: "12px", fontWeight: "600", color: "#e8eaf0" },
	userEmail: { fontSize: "10px", color: "#3a4260" },
	logoutFullBtn: {
		width: "100%",
		padding: "7px",
		background: "#1e2330",
		border: "1px solid #2a3044",
		borderRadius: "6px",
		color: "#5a6a8a",
		fontSize: "12px",
		cursor: "pointer",
	},
	codeBlock: {
		background: "#0a0c10",
		border: "1px solid #2a3044",
		borderRadius: "8px",
		padding: "12px",
		fontFamily: "monospace",
		fontSize: "11px",
		color: "#8b9ab8",
		lineHeight: "1.6",
		whiteSpace: "pre",
	},
	overlay: {
		position: "fixed",
		inset: 0,
		background: "rgba(0,0,0,.7)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 100,
		backdropFilter: "blur(2px)",
	},
	modal: {
		background: "#161920",
		border: "1px solid #2a3044",
		borderRadius: "14px",
		padding: "24px",
		width: "480px",
		maxWidth: "90vw",
		maxHeight: "85vh",
		overflowY: "auto",
	},
	modalHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "20px",
	},
	modalTitle: { fontSize: "16px", fontWeight: "700", color: "#e8eaf0" },
	closeBtn: {
		background: "none",
		border: "1px solid #2a3044",
		borderRadius: "6px",
		color: "#5a6a8a",
		cursor: "pointer",
		padding: "4px 8px",
		fontSize: "14px",
	},
	form: { display: "flex", flexDirection: "column", gap: "14px" },
	field: { display: "flex", flexDirection: "column", gap: "5px" },
	fieldRow: { display: "flex", gap: "12px" },
	label: { fontSize: "11px", fontWeight: "600", color: "#8b9ab8" },
	input: {
		background: "#1e2330",
		border: "1px solid #2a3044",
		borderRadius: "7px",
		padding: "9px 12px",
		color: "#e8eaf0",
		fontSize: "13px",
		outline: "none",
		width: "100%",
		transition: "border-color .15s",
	},
	hint: { fontSize: "10px", color: "#3a4260", margin: "2px 0 0" },
	submitBtn: {
		padding: "11px",
		background: "linear-gradient(135deg,#6c63ff,#4f46e5)",
		border: "none",
		borderRadius: "8px",
		color: "#fff",
		fontSize: "13px",
		fontWeight: "600",
		cursor: "pointer",
		marginTop: "4px",
	},
};

export default Sidebar;
