import { motion } from "framer-motion";
import {
	Star,
	ExternalLink,
	Copy,
	Trash2,
	Eye,
	Edit2,
	Archive,
} from "lucide-react";
import { toast } from "react-toastify";
import { RIcon } from "../common/Icons";
import {
	trackFavoriteToggle,
	trackResourceDeleted,
	trackResourceVisit,
} from "../../lib/services/analyticsService";

// Category color map — matches the mockup palette
const CAT_COLORS = {
	LLM: {
		bg: "rgba(168,85,247,0.12)",
		border: "rgba(168,85,247,0.25)",
		text: "#a855f7",
		badge: "rgba(168,85,247,0.15)",
	},
	"AI Tools": {
		bg: "rgba(59,130,246,0.12)",
		border: "rgba(59,130,246,0.25)",
		text: "#3b82f6",
		badge: "rgba(59,130,246,0.15)",
	},
	"AI Agent": {
		bg: "rgba(236,72,153,0.12)",
		border: "rgba(236,72,153,0.25)",
		text: "#ec4899",
		badge: "rgba(236,72,153,0.15)",
	},
	Backend: {
		bg: "rgba(34,197,94,0.12)",
		border: "rgba(34,197,94,0.25)",
		text: "#22c55e",
		badge: "rgba(34,197,94,0.15)",
	},
	Hosting: {
		bg: "rgba(59,130,246,0.12)",
		border: "rgba(59,130,246,0.25)",
		text: "#3b82f6",
		badge: "rgba(59,130,246,0.15)",
	},
	Frontend: {
		bg: "rgba(245,158,11,0.12)",
		border: "rgba(245,158,11,0.25)",
		text: "#f59e0b",
		badge: "rgba(245,158,11,0.15)",
	},
	Database: {
		bg: "rgba(239,68,68,0.12)",
		border: "rgba(239,68,68,0.25)",
		text: "#ef4444",
		badge: "rgba(239,68,68,0.15)",
	},
	Cloud: {
		bg: "rgba(20,184,166,0.12)",
		border: "rgba(20,184,166,0.25)",
		text: "#14b8a6",
		badge: "rgba(20,184,166,0.15)",
	},
	"Dev Tools": {
		bg: "rgba(108,99,255,0.12)",
		border: "rgba(108,99,255,0.25)",
		text: "#6c63ff",
		badge: "rgba(108,99,255,0.15)",
	},
	"Dev Platforms": {
		bg: "rgba(99,102,241,0.12)",
		border: "rgba(99,102,241,0.25)",
		text: "#6366f1",
		badge: "rgba(99,102,241,0.15)",
	},
	"Code Tools": {
		bg: "rgba(249,115,22,0.12)",
		border: "rgba(249,115,22,0.25)",
		text: "#f97316",
		badge: "rgba(249,115,22,0.15)",
	},
	Learning: {
		bg: "rgba(249,115,22,0.12)",
		border: "rgba(249,115,22,0.25)",
		text: "#f97316",
		badge: "rgba(249,115,22,0.15)",
	},
	Productivity: {
		bg: "rgba(16,185,129,0.12)",
		border: "rgba(16,185,129,0.25)",
		text: "#10b981",
		badge: "rgba(16,185,129,0.15)",
	},
	Other: {
		bg: "rgba(139,154,184,0.12)",
		border: "rgba(139,154,184,0.25)",
		text: "#8b9ab8",
		badge: "rgba(139,154,184,0.15)",
	},
};

const getCat = (cat) => CAT_COLORS[cat] || CAT_COLORS.Other;

const handleCopy = (url) => {
	navigator.clipboard.writeText(url);
	toast.success("URL copied!");
};

const Description = ({ view, r, c }) => {
	const list = view === "list";

	return (
		<div className={`${list ? "flex-1 min-w-0" : ""}`}>
			<div className={`${list ? "flex items-center gap-2 mb-0.5" : ""}`}>
				<h3 className="text-sm font-semibold text-white truncate">
					{r.title}
				</h3>
				<span
					className={`${list ? "text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0" : "text-xs mb-2"}`}
					style={{ background: `${list && c.badge}`, color: c.text }}
				>
					{r.category}
				</span>
			</div>
			{list && (
				<p
					className="text-xs truncate"
					style={{ color: "rgba(255,255,255,0.3)" }}
				>
					{r.url}
				</p>
			)}
		</div>
	);
};

const Tags = ({ tags, c }) => {
	return (
		<div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
			{tags.slice(0, 3).map((tag) => (
				<span
					key={tag}
					className="text-[10px] px-2 py-0.5 rounded-sm"
					style={{
						background: c.badge,
						color: c.text,
						border: `1px solid ${c.border}`,
					}}
				>
					{tag}
				</span>
			))}
		</div>
	);
};

const VisitCount = ({ r }) => {
	return (
		<div
			className="hidden sm:flex items-center gap-1 flex-shrink-0"
			style={{ color: "rgba(255,255,255,0.25)" }}
		>
			<Eye size={11} />
			<span className="text-[10px]">{r.visitCount || 0}</span>
		</div>
	);
};

const Actions = ({
	view,
	// onFavorite,
	handleFavorite,
	id,
	resource,
	// onVisit,
	handleVisit,
	onEdit,
	onArchive,
	// onDelete,
	handleDelete,
}) => {
	return (
		<div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
			{view === "list" && (
				<button
					// onClick={() => onFavorite?.(id)}
					onClick={handleFavorite}
					className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
					style={{
						color: resource.favorite
							? "#f59e0b"
							: "rgba(255,255,255,0.3)",
					}}
				>
					<Star
						size={13}
						fill={resource.favorite ? "#f59e0b" : "none"}
					/>
				</button>
			)}
			<a
				href={resource.url}
				target="_blank"
				rel="noopener noreferrer"
				// onClick={() => onVisit?.(id)}
				onClick={handleVisit}
				className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
				style={{ color: "rgba(255,255,255,0.4)" }}
				title="Open"
			>
				<ExternalLink size={13} />
			</a>
			<button
				onClick={() => handleCopy(resource.url)}
				className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
				style={{ color: "rgba(255,255,255,0.4)" }}
				title="Copy URL"
			>
				<Copy size={13} />
			</button>
			{onEdit && (
				<button
					onClick={() => onEdit(resource)}
					className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
					style={{ color: "rgba(255,255,255,0.4)" }}
					title="Edit"
				>
					<Edit2 size={13} />
				</button>
			)}
			{onArchive && (
				<button
					onClick={() => onArchive(id)}
					className="p-1.5 rounded-lg transition-colors"
					style={{ color: "rgba(255,255,255,0.4)" }}
					title="Archive"
				>
					<Archive size={13} />
				</button>
			)}
			<button
				// onClick={() => onDelete?.(id)}
				onClick={handleDelete}
				className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
				style={{ color: "rgba(255,255,255,0.4)" }}
				title="Delete"
			>
				<Trash2 size={13} className="hover:text-red-400" />
			</button>
		</div>
	);
};

// ─── Grid Card (default) ──────────────────────────────────────────────────────

const GridCard = ({
	resource,
	onFavorite,
	onDelete,
	onVisit,
	viewMode,
	onEdit,
	onArchive,
}) => {
	const id = resource._id || resource.id;
	const c = getCat(resource.category);
	const tags = Array.isArray(resource.tags) ? resource.tags : [];

	const handleVisit = () => {
		trackResourceVisit(resource.title, resource.category);
		onVisit(id);
		window.open(resource.url, "_blank");
		console.log("It's a drill");
	};

	const handleFavorite = () => {
		const newState = !resource.favorite;
		trackFavoriteToggle(resource.category, newState);
		onFavorite(id);
	};

	const handleDelete = () => {
		trackResourceDeleted(resource.category);
		onDelete(resource.id);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ y: -3, transition: { duration: 0.15 } }}
			className="group relative flex flex-col rounded-2xl border transition-all duration-200"
			style={{
				background: "rgba(22,25,32,0.9)",
				borderColor: "rgba(255,255,255,0.06)",
				backdropFilter: "blur(12px)",
				boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.borderColor = c.border;
				e.currentTarget.style.boxShadow = `0 0 0 1px ${c.border}, 0 8px 32px rgba(0,0,0,0.4)`;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
				e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";
			}}
		>
			<div className="p-4 flex flex-col flex-1">
				{/* Top row: icon + star */}
				<div className="flex items-start justify-between mb-3">
					<RIcon c={c} md={"9"} imgd={"3"} resource={resource} />

					{/* Star */}
					<button
						// onClick={() => onFavorite?.(id)}
						onClick={handleFavorite}
						className="p-1 rounded-lg transition-colors"
						style={{
							color: resource.favorite
								? "#f59e0b"
								: "rgba(255,255,255,0.2)",
						}}
						title={
							resource.favorite
								? "Remove from favorites"
								: "Add to favorites"
						}
					>
						<Star
							size={16}
							fill={resource.favorite ? "#f59e0b" : "none"}
							stroke={
								resource.favorite ? "#f59e0b" : "currentColor"
							}
						/>
					</button>
				</div>

				{/* Title + type */}
				<Description view={viewMode} r={resource} c={c} />

				{/* notes */}
				{resource.notes && (
					<p
						className="text-xs leading-relaxed mb-3 line-clamp-2"
						style={{ color: "rgba(255,255,255,0.45)" }}
					>
						{resource.notes}
					</p>
				)}

				{tags.length > 0 && <Tags tags={tags} c={c} />}

				{/* Footer: visits + actions */}
				<div
					className="flex items-center justify-between mt-auto pt-2 border-t"
					style={{ borderColor: "rgba(255,255,255,0.05)" }}
				>
					<VisitCount r={resource} />

					<Actions
						view={viewMode}
						onFavorite={onFavorite}
						id={id}
						resource={resource}
						// onVisit={onVisit}
						handleVisit={handleVisit}
						onEdit={onEdit}
						onArchive={onArchive}
						// onDelete={onDelete}
						handleDelete={handleDelete}
					/>
				</div>
			</div>
		</motion.div>
	);
};

// ─── List Card ────────────────────────────────────────────────────────────────

const ListCard = ({
	resource,
	onFavorite,
	onDelete,
	onVisit,
	viewMode,
	onEdit,
	onArchive,
}) => {
	const id = resource._id || resource.id;
	const c = getCat(resource.category);
	const tags = Array.isArray(resource.tags) ? resource.tags : [];

	const handleVisit = () => {
		trackResourceVisit(resource.title, resource.category);
		onVisit(id);
		window.open(resource.url, "_blank");
	};

	const handleFavorite = () => {
		const newState = !resource.favorite;
		trackFavoriteToggle(resource.category, newState);
		onFavorite(id);
		console.log("List fav drill");
	};

	const handleDelete = () => {
		trackResourceDeleted(resource.category);
		onDelete(id);
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -8 }}
			animate={{ opacity: 1, x: 0 }}
			whileHover={{ x: 3, transition: { duration: 0.15 } }}
			className="group flex items-center gap-4 px-4 py-3 rounded-xl border transition-all duration-150"
			style={{
				background: "rgba(22,25,32,0.9)",
				borderColor: "rgba(255,255,255,0.06)",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.borderColor = c.border;
				e.currentTarget.style.background = "rgba(30,35,48,0.95)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
				e.currentTarget.style.background = "rgba(22,25,32,0.9)";
			}}
		>
			<RIcon c={c} md={"9"} imgd={"4"} resource={resource} />

			{/* Title + URL */}
			<Description view={viewMode} r={resource} c={c} />

			{tags.length > 0 && <Tags tags={tags} c={c} />}

			<VisitCount r={resource} />

			<Actions
				view={viewMode}
				// onFavorite={onFavorite}
				handleFavorite={handleFavorite}
				id={id}
				resource={resource}
				// onVisit={onVisit}
				handleVisit={handleVisit}
				onEdit={onEdit}
				onArchive={onArchive}
				// onDelete={onDelete}
				handleDelete={handleDelete}
			/>
		</motion.div>
	);
};

// ─── Exported component ───────────────────────────────────────────────────────

const ResourceCard = (props) => {
	if (props.viewMode === "list") return <ListCard {...props} />;
	return <GridCard {...props} />;
};

export default ResourceCard;
