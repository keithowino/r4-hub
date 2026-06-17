import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../lib/context/AuthContext.jsx";
import { useCommon } from "../lib/context/CommonContext.jsx";
import MetaDataInsert from "../lib/MetaDataInsert.jsx";
import {
	getResources,
	createResource,
	updateResource,
	deleteResource,
	toggleFavorite,
	incrementVisit,
	archiveResource,
} from "../lib/services/resourceService.js";

// ─── Sub-components ───────────────────────────────────────────────────────────

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

const ResourceCard = ({
	resource,
	onDelete,
	onEdit,
	onFavorite,
	onVisit,
	onArchive,
}) => {
	const c = getCatColor(resource.category);

	return (
		<div style={s.card}>
			<div style={s.cardTop}>
				<div style={{ ...s.cardIcon, background: c.bg }}>
					{resource.favicon ? (
						<img
							src={resource.favicon}
							alt=""
							style={{ width: "18px", height: "18px" }}
							onError={(e) => (e.target.style.display = "none")}
						/>
					) : (
						<span
							style={{
								fontSize: "13px",
								fontWeight: "700",
								color: c.text,
							}}
						>
							{resource.title?.slice(0, 2).toUpperCase()}
						</span>
					)}
				</div>
				<button
					onClick={() => onFavorite(resource._id)}
					style={{
						...s.iconBtn,
						color: resource.favorite ? "#f59e0b" : "#3a4260",
					}}
					title={
						resource.favorite
							? "Remove from favorites"
							: "Add to favorites"
					}
				>
					{resource.favorite ? "★" : "☆"}
				</button>
			</div>

			<div style={s.cardName}>{resource.title}</div>
			<div style={s.cardType}>
				{resource.category}
				{resource.subcategory ? ` · ${resource.subcategory}` : ""}
			</div>

			{resource.notes && <p style={s.cardNotes}>{resource.notes}</p>}

			<div style={s.cardTags}>
				{(resource.tags || []).slice(0, 3).map((tag) => (
					<span
						key={tag}
						style={{ ...s.tag, background: c.bg, color: c.text }}
					>
						{tag}
					</span>
				))}
			</div>

			<div style={s.cardFooter}>
				<span style={s.visits}>👁 {resource.visitCount || 0}</span>
				<div style={s.cardActions}>
					<a
						href={resource.url}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => onVisit(resource._id)}
						style={s.iconBtn}
						title="Open"
					>
						↗
					</a>
					<button
						onClick={() =>
							navigator.clipboard
								.writeText(resource.url)
								.then(() => toast.success("URL copied!"))
						}
						style={s.iconBtn}
						title="Copy URL"
					>
						⎘
					</button>
					<button
						onClick={() => onEdit(resource)}
						style={s.iconBtn}
						title="Edit"
					>
						✎
					</button>
					<button
						onClick={() => onArchive(resource._id)}
						style={{ ...s.iconBtn, color: "#f59e0b" }}
						title="Archive"
					>
						⊖
					</button>
					<button
						onClick={() => onDelete(resource._id)}
						style={{ ...s.iconBtn, color: "#ef4444" }}
						title="Delete"
					>
						✕
					</button>
				</div>
			</div>
		</div>
	);
};

const ResourceModal = ({
	isOpen,
	onClose,
	onSave,
	editingResource,
	categories,
}) => {
	const [formData, setFormData] = useState({
		title: "",
		url: "",
		category: "Other",
		subcategory: "",
		tags: "",
		notes: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (editingResource) {
			setFormData({
				title: editingResource.title || "",
				url: editingResource.url || "",
				category: editingResource.category || "Other",
				subcategory: editingResource.subcategory || "",
				tags: (editingResource.tags || []).join(", "),
				notes: editingResource.notes || "",
			});
		} else {
			setFormData({
				title: "",
				url: "",
				category: "Other",
				subcategory: "",
				tags: "",
				notes: "",
			});
		}
	}, [editingResource, isOpen]);

	const handleUrlBlur = () => {
		if (
			formData.url &&
			formData.url.startsWith("http") &&
			!formData.title
		) {
			try {
				const domain = new URL(formData.url).hostname
					.replace("www.", "")
					.split(".")[0];
				setFormData((prev) => ({
					...prev,
					title: domain.charAt(0).toUpperCase() + domain.slice(1),
				}));
			} catch {}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const payload = {
				...formData,
				tags: formData.tags
					.split(",")
					.map((t) => t.trim())
					.filter(Boolean),
			};
			await onSave(payload);
			onClose();
		} catch {
			// error handled in parent
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div
			style={s.overlay}
			onClick={(e) => e.target === e.currentTarget && onClose()}
		>
			<div style={s.modal}>
				<div style={s.modalHeader}>
					<h2 style={s.modalTitle}>
						{editingResource ? "Edit Resource" : "Add New Resource"}
					</h2>
					<button onClick={onClose} style={s.closeBtn}>
						✕
					</button>
				</div>

				<form onSubmit={handleSubmit} style={s.form}>
					<div style={s.field}>
						<label style={s.label}>URL *</label>
						<input
							type="url"
							required
							placeholder="https://example.com"
							style={s.input}
							value={formData.url}
							onChange={(e) =>
								setFormData({
									...formData,
									url: e.target.value,
								})
							}
							onBlur={handleUrlBlur}
							onFocus={(e) =>
								(e.target.style.borderColor = "#6c63ff")
							}
						/>
						<p style={s.hint}>
							💡 Title will be suggested from the URL
						</p>
					</div>

					<div style={s.field}>
						<label style={s.label}>Title *</label>
						<input
							type="text"
							required
							placeholder="e.g., Google AI Studio"
							style={s.input}
							value={formData.title}
							onChange={(e) =>
								setFormData({
									...formData,
									title: e.target.value,
								})
							}
							onFocus={(e) =>
								(e.target.style.borderColor = "#6c63ff")
							}
						/>
					</div>

					<div style={s.fieldRow}>
						<div style={{ ...s.field, flex: 1 }}>
							<label style={s.label}>Category</label>
							<select
								style={{ ...s.input, cursor: "pointer" }}
								value={formData.category}
								onChange={(e) =>
									setFormData({
										...formData,
										category: e.target.value,
									})
								}
							>
								{categories.map((cat) => (
									<option key={cat} value={cat}>
										{cat}
									</option>
								))}
							</select>
						</div>
						<div style={{ ...s.field, flex: 1 }}>
							<label style={s.label}>Subcategory</label>
							<input
								type="text"
								placeholder="e.g., Chat, API"
								style={s.input}
								value={formData.subcategory}
								onChange={(e) =>
									setFormData({
										...formData,
										subcategory: e.target.value,
									})
								}
								onFocus={(e) =>
									(e.target.style.borderColor = "#6c63ff")
								}
							/>
						</div>
					</div>

					<div style={s.field}>
						<label style={s.label}>Tags (comma-separated)</label>
						<input
							type="text"
							placeholder="llm, free, api"
							style={s.input}
							value={formData.tags}
							onChange={(e) =>
								setFormData({
									...formData,
									tags: e.target.value,
								})
							}
							onFocus={(e) =>
								(e.target.style.borderColor = "#6c63ff")
							}
						/>
					</div>

					<div style={s.field}>
						<label style={s.label}>Notes</label>
						<textarea
							rows={3}
							placeholder="Why did you save this?"
							style={{ ...s.input, resize: "vertical" }}
							value={formData.notes}
							onChange={(e) =>
								setFormData({
									...formData,
									notes: e.target.value,
								})
							}
							onFocus={(e) =>
								(e.target.style.borderColor = "#6c63ff")
							}
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						style={{
							...s.submitBtn,
							opacity: isSubmitting ? 0.7 : 1,
						}}
					>
						{isSubmitting
							? editingResource
								? "Saving..."
								: "Adding..."
							: editingResource
								? "Save Changes"
								: "Add Resource"}
					</button>
				</form>
			</div>
		</div>
	);
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

const Dashboard = () => {
	const { user, logout } = useAuth();
	const { categories } = useCommon();
	const navigate = useNavigate();

	const [resources, setResources] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [activeFilter, setActiveFilter] = useState("All");
	const [modalOpen, setModalOpen] = useState(false);
	const [editingResource, setEditingResource] = useState(null);

	// ── Derived data ──
	const favorites = resources.filter((r) => r.favorite);
	const recent = [...resources]
		.filter((r) => r.lastVisited)
		.sort((a, b) => new Date(b.lastVisited) - new Date(a.lastVisited))
		.slice(0, 4);
	const allTags = [...new Set(resources.flatMap((r) => r.tags || []))];
	const uniqueCategories = [...new Set(resources.map((r) => r.category))];

	const filtered = resources.filter((r) => {
		const matchesFilter =
			activeFilter === "All" || r.category === activeFilter;
		const q = search.toLowerCase();
		const matchesSearch =
			!q ||
			r.title?.toLowerCase().includes(q) ||
			r.url?.toLowerCase().includes(q) ||
			r.category?.toLowerCase().includes(q) ||
			(r.notes || "").toLowerCase().includes(q) ||
			(r.tags || []).some((t) => t.toLowerCase().includes(q));
		return matchesFilter && matchesSearch;
	});

	const grouped = filtered.reduce((acc, r) => {
		if (!acc[r.category]) acc[r.category] = [];
		acc[r.category].push(r);
		return acc;
	}, {});

	const stats = {
		total: resources.length,
		favorites: favorites.length,
		categories: uniqueCategories.length,
		tags: allTags.length,
	};

	// ── Load ──
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

	// ── Handlers ──
	const handleSave = async (formData) => {
		try {
			if (editingResource) {
				const res = await updateResource(editingResource._id, formData);
				setResources((prev) =>
					prev.map((r) =>
						r._id === editingResource._id ? res.data : r,
					),
				);
				toast.success("Resource updated");
			} else {
				const res = await createResource(formData);
				setResources((prev) => [res.data, ...prev]);
				toast.success("Resource added");
			}
			setEditingResource(null);
		} catch {
			toast.error("Failed to save resource");
			throw new Error("save failed");
		}
	};

	const handleEdit = (resource) => {
		setEditingResource(resource);
		setModalOpen(true);
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Delete this resource?")) return;
		try {
			await deleteResource(id);
			setResources((prev) => prev.filter((r) => r._id !== id));
			toast.success("Resource deleted");
		} catch {
			toast.error("Failed to delete resource");
		}
	};

	const handleFavorite = async (id) => {
		try {
			const res = await toggleFavorite(id);
			setResources((prev) =>
				prev.map((r) => (r._id === id ? res.data : r)),
			);
		} catch {
			toast.error("Failed to update favorite");
		}
	};

	const handleVisit = async (id) => {
		try {
			const res = await incrementVisit(id);
			setResources((prev) =>
				prev.map((r) => (r._id === id ? res.data : r)),
			);
		} catch {}
	};

	const handleArchive = async (id) => {
		try {
			await archiveResource(id);
			setResources((prev) => prev.filter((r) => r._id !== id));
			toast.success("Resource archived");
		} catch {
			toast.error("Failed to archive resource");
		}
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const openAddModal = () => {
		setEditingResource(null);
		setModalOpen(true);
	};

	// ─────────────────────────────────────────────────────────────────────────

	return (
		<>
			<MetaDataInsert title="Dashboard" />

			<div style={s.page}>
				{/* ── TOP NAV ── */}
				<nav style={s.topnav}>
					<div style={s.navLeft}>
						<div style={s.logoHex}>R4</div>
						<span style={s.logoText}>
							R4 <span style={s.accent}>Hub</span>
						</span>
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
							<button
								style={s.clearSearch}
								onClick={() => setSearch("")}
							>
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

				<div style={s.body}>
					{/* ── SIDEBAR ── */}
					<aside style={s.sidebar}>
						<div style={s.sideSection}>
							<div
								style={{
									...s.sideItem,
									...(activeFilter === "All"
										? s.sideItemActive
										: {}),
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
									<span style={s.sideBadge}>
										{favorites.length}
									</span>
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
												style={{
													...s.catDot,
													background: c.text,
												}}
											/>
											{cat}
											<span style={s.sideCount}>
												{
													resources.filter(
														(r) =>
															r.category === cat,
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

					{/* ── MAIN ── */}
					<main style={s.main}>
						{loading ? (
							<div style={s.loadingState}>
								<div style={s.spinner} />
								<p style={s.loadingText}>
									Loading your resources...
								</p>
							</div>
						) : (
							<>
								{/* Quick Access */}
								{favorites.length > 0 &&
									!search &&
									activeFilter === "All" && (
										<div style={s.sectionBlock}>
											<div style={s.sectionHeader}>
												<h2 style={s.sectionTitle}>
													<span
														style={{
															color: "#f59e0b",
														}}
													>
														⚡
													</span>{" "}
													Quick Access
												</h2>
											</div>
											<div style={s.quickGrid}>
												{favorites
													.slice(0, 5)
													.map((r) => {
														const c = getCatColor(
															r.category,
														);
														return (
															<a
																key={r._id}
																href={r.url}
																target="_blank"
																rel="noopener noreferrer"
																onClick={() =>
																	handleVisit(
																		r._id,
																	)
																}
																style={
																	s.quickCard
																}
															>
																<div
																	style={{
																		...s.quickIcon,
																		background:
																			c.bg,
																	}}
																>
																	{r.favicon ? (
																		<img
																			src={
																				r.favicon
																			}
																			alt=""
																			style={{
																				width: "20px",
																				height: "20px",
																			}}
																			onError={(
																				e,
																			) =>
																				(e.target.style.display =
																					"none")
																			}
																		/>
																	) : (
																		<span
																			style={{
																				fontWeight:
																					"700",
																				color: c.text,
																				fontSize:
																					"14px",
																			}}
																		>
																			{r.title
																				?.slice(
																					0,
																					2,
																				)
																				.toUpperCase()}
																		</span>
																	)}
																</div>
																<div
																	style={
																		s.quickName
																	}
																>
																	{r.title}
																</div>
																<div
																	style={
																		s.quickCat
																	}
																>
																	{r.category}
																</div>
															</a>
														);
													})}
												<div
													style={s.quickCardAdd}
													onClick={openAddModal}
												>
													<span
														style={s.quickAddIcon}
													>
														+
													</span>
													<span style={s.quickName}>
														Add New
													</span>
												</div>
											</div>
										</div>
									)}

								{/* Recent */}
								{recent.length > 0 &&
									!search &&
									activeFilter === "All" && (
										<div style={s.sectionBlock}>
											<div style={s.sectionHeader}>
												<h2 style={s.sectionTitle}>
													Recently Visited
												</h2>
											</div>
											<div style={s.resourceGrid}>
												{recent.map((r) => (
													<ResourceCard
														key={r._id}
														resource={r}
														onDelete={handleDelete}
														onEdit={handleEdit}
														onFavorite={
															handleFavorite
														}
														onVisit={handleVisit}
														onArchive={
															handleArchive
														}
													/>
												))}
											</div>
										</div>
									)}

								{/* Filter chips */}
								<div style={s.filterRow}>
									{["All", ...uniqueCategories].map((f) => (
										<button
											key={f}
											style={{
												...s.filterChip,
												...(activeFilter === f
													? s.filterChipActive
													: {}),
											}}
											onClick={() => setActiveFilter(f)}
										>
											{f}
										</button>
									))}
								</div>

								{/* Grouped resources */}
								{filtered.length === 0 ? (
									<div style={s.emptyState}>
										<div style={s.emptyIcon}>◫</div>
										<p style={s.emptyTitle}>
											No resources found
										</p>
										<p style={s.emptyDesc}>
											{search
												? `No results for "${search}"`
												: "Add your first resource to get started"}
										</p>
										{!search && (
											<button
												style={s.emptyBtn}
												onClick={openAddModal}
											>
												+ Add Resource
											</button>
										)}
									</div>
								) : (
									Object.entries(grouped).map(
										([cat, items]) => (
											<div
												key={cat}
												style={s.sectionBlock}
											>
												<div style={s.sectionHeader}>
													<h2 style={s.sectionTitle}>
														<span
															style={{
																...s.catDot,
																background:
																	getCatColor(
																		cat,
																	).text,
																display:
																	"inline-block",
																marginRight:
																	"8px",
															}}
														/>
														{cat}
														<span
															style={s.catCount}
														>
															{items.length}
														</span>
													</h2>
												</div>
												<div style={s.resourceGrid}>
													{items.map((r) => (
														<ResourceCard
															key={r._id}
															resource={r}
															onDelete={
																handleDelete
															}
															onEdit={handleEdit}
															onFavorite={
																handleFavorite
															}
															onVisit={
																handleVisit
															}
															onArchive={
																handleArchive
															}
														/>
													))}
												</div>
											</div>
										),
									)
								)}
							</>
						)}
					</main>

					{/* ── RIGHT PANEL ── */}
					<aside style={s.rightPanel}>
						{/* Stats */}
						<div style={s.panelSection}>
							<div style={s.panelTitle}>Summary</div>
							<div style={s.statGrid}>
								<div style={s.statCard}>
									<div style={s.statNum}>{stats.total}</div>
									<div style={s.statLabel}>Resources</div>
								</div>
								<div style={s.statCard}>
									<div
										style={{
											...s.statNum,
											color: "#f59e0b",
										}}
									>
										{stats.favorites}
									</div>
									<div style={s.statLabel}>Favorites</div>
								</div>
								<div style={s.statCard}>
									<div
										style={{
											...s.statNum,
											color: "#a855f7",
										}}
									>
										{stats.categories}
									</div>
									<div style={s.statLabel}>Categories</div>
								</div>
								<div style={s.statCard}>
									<div
										style={{
											...s.statNum,
											color: "#14b8a6",
										}}
									>
										{stats.tags}
									</div>
									<div style={s.statLabel}>Tags</div>
								</div>
							</div>
						</div>

						{/* Most visited */}
						{resources.length > 0 && (
							<div style={s.panelSection}>
								<div style={s.panelTitle}>Most Visited</div>
								{[...resources]
									.sort(
										(a, b) =>
											(b.visitCount || 0) -
											(a.visitCount || 0),
									)
									.slice(0, 5)
									.map((r) => {
										const c = getCatColor(r.category);
										return (
											<div key={r._id} style={s.visitRow}>
												<div
													style={{
														...s.visitDot,
														background: c.bg,
														color: c.text,
													}}
												>
													{r.title
														?.slice(0, 2)
														.toUpperCase()}
												</div>
												<div style={s.visitName}>
													{r.title}
												</div>
												<div style={s.visitCount}>
													{r.visitCount || 0}
												</div>
											</div>
										);
									})}
							</div>
						)}

						{/* User */}
						<div style={s.panelSection}>
							<div style={s.panelTitle}>Account</div>
							<div style={s.userCard}>
								<div style={s.userAvatar}>
									{user?.name?.slice(0, 2).toUpperCase() ||
										"?"}
								</div>
								<div>
									<div style={s.userName}>{user?.name}</div>
									<div style={s.userEmail}>{user?.email}</div>
								</div>
							</div>
							<button
								style={s.logoutFullBtn}
								onClick={handleLogout}
							>
								Sign out
							</button>
						</div>

						{/* Dev widget */}
						<div style={s.panelSection}>
							<div style={s.panelTitle}>Dev Widget</div>
							<div style={s.codeBlock}>
								<span style={{ color: "#c792ea" }}>const</span>
								{" hub = "}
								<span style={{ color: "#c792ea" }}>new</span>
								{" R4Hub();\n"}
								{"hub."}
								<span style={{ color: "#82aaff" }}>search</span>
								{"("}
								<span style={{ color: "#c3e88d" }}>
									'database'
								</span>
								{")\n"}
								{"   ."}
								<span style={{ color: "#82aaff" }}>filter</span>
								{"(r => r.favorite)\n"}
								{"   ."}
								<span style={{ color: "#82aaff" }}>get</span>
								{"();"}
							</div>
						</div>
					</aside>
				</div>
			</div>

			{/* Modal */}
			<ResourceModal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setEditingResource(null);
				}}
				onSave={handleSave}
				editingResource={editingResource}
				categories={categories}
			/>

			<style>{`
				@keyframes spin { to { transform: rotate(360deg); } }
				* { box-sizing: border-box; }
			`}</style>
		</>
	);
};

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

export default Dashboard;
