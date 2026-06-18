import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";
import Logo from "../common/Logo";

const Navbar = ({ search, setSearch, openAddModal }) => {
	const { user, logout } = useAuth();

	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<nav style={s.topnav}>
			<div style={s.navLeft}>
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

			<div style={s.searchWrap}>
				<span style={s.searchIcon}>⌕</span>
				<input
					style={s.searchInput}
					placeholder="Search resources, tags, categories..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				{search && (
					<button style={s.clearSearch} onClick={() => setSearch("")}>
						✕
					</button>
				)}
			</div>

			<div style={s.navRight}>
				<button style={s.addBtn} onClick={openAddModal}>
					+ Add Resource
				</button>
				<div style={s.avatar} title={user?.name}>
					{user?.name?.slice(0, 2).toUpperCase() || "?"}
				</div>
				<button
					style={s.logoutBtn}
					onClick={handleLogout}
					title="Sign out"
				>
					⎋
				</button>
			</div>
		</nav>
	);
};

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

export default Navbar;
