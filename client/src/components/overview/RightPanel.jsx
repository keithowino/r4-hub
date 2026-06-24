// import { ActivityIcon, CheckCircleIcon } from "lucide-react";
// import { useAuth } from "../../lib/context/AuthContext";
// import { useCommon } from "../../lib/context/CommonContext";

// const RightPanel = ({ stats, resources }) => {
// 	const { styles, systemStatus, getCatColor } = useCommon();
// 	const { user } = useAuth();

// 	return (
// 		<aside style={styles.rightPanel}>
// 			<div style={styles.panelSection}>
// 				<div style={styles.panelTitle}>Summary</div>
// 				<div style={styles.statGrid}>
// 					<div style={styles.statCard}>
// 						<div style={styles.statNum}>{stats.total}</div>
// 						<div style={styles.statLabel}>Resources</div>
// 					</div>
// 					<div style={styles.statCard}>
// 						<div
// 							style={{
// 								...styles.statNum,
// 								color: "#f59e0b",
// 							}}
// 						>
// 							{stats.favorites}
// 						</div>
// 						<div style={styles.statLabel}>Favorites</div>
// 					</div>
// 					<div style={styles.statCard}>
// 						<div
// 							style={{
// 								...styles.statNum,
// 								color: "#a855f7",
// 							}}
// 						>
// 							{stats.categories}
// 						</div>
// 						<div style={styles.statLabel}>Categories</div>
// 					</div>
// 					<div style={styles.statCard}>
// 						<div
// 							style={{
// 								...styles.statNum,
// 								color: "#14b8a6",
// 							}}
// 						>
// 							{stats.tags}
// 						</div>
// 						<div style={styles.statLabel}>Tags</div>
// 					</div>
// 				</div>
// 			</div>

// 			{resources.length > 0 && (
// 				<div style={styles.panelSection}>
// 					<div style={styles.panelTitle}>Most Visited</div>
// 					{[...resources]
// 						.sort(
// 							(a, b) => (b.visitCount || 0) - (a.visitCount || 0),
// 						)
// 						.slice(0, 5)
// 						.map((r) => {
// 							const c = getCatColor(r.category);
// 							return (
// 								<div key={r._id} style={styles.visitRow}>
// 									<div
// 										style={{
// 											...styles.visitDot,
// 											background: c.bg,
// 											color: c.text,
// 										}}
// 									>
// 										{r.title?.slice(0, 2).toUpperCase()}
// 									</div>
// 									<div style={styles.visitName}>
// 										{r.title}
// 									</div>
// 									<div style={styles.visitCount}>
// 										{r.visitCount || 0}
// 									</div>
// 								</div>
// 							);
// 						})}
// 				</div>
// 			)}

// 			{/* developer widget */}
// 			<div style={styles.panelSection}>
// 				<div style={styles.panelTitle}>⚡ Developer Widget</div>
// 				<pre className="text-xs font-mono text-gray-400 overflow-x-auto bg-[#0a0c10] border-[1px] border-solid border-[#2a3044] rounded-lg p-1">
// 					<code>{`const hub = new R4Hub();
// hub.search("database")
//   .filter(r => r.favorite)
//   .sort("recent")
//   .get();`}</code>
// 				</pre>
// 			</div>

// 			{/* system stats */}
// 			<div style={styles.panelSection}>
// 				<div style={styles.panelTitle}>
// 					<ActivityIcon size={16} className="text-green-400" /> System
// 					Status
// 				</div>
// 				<div className="space-y-2">
// 					{systemStatus.map((item) => (
// 						<div
// 							key={item.name}
// 							className="flex items-center justify-between"
// 						>
// 							<span className="text-sm text-gray-400">
// 								{item.name}
// 							</span>
// 							<div className="flex items-center gap-2">
// 								<span className="text-xs text-green-400">
// 									{item.status}
// 								</span>
// 								<CheckCircleIcon
// 									size={12}
// 									className="text-green-400"
// 								/>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</aside>
// 	);
// };

// export default RightPanel;

// ...

import { ActivityIcon, CheckCircleIcon, X } from "lucide-react";
import { useAuth } from "../../lib/context/AuthContext";
import { useCommon } from "../../lib/context/CommonContext";

const RightPanel = ({ stats, resources, onClose }) => {
	const { styles, systemStatus, getCatColor } = useCommon();
	const { user } = useAuth();

	return (
		<div className="h-full flex flex-col">
			{/* Mobile Header with Close Button */}
			<div className="flex items-center justify-between lg:hidden mb-6 pb-4 border-b border-[#2a3044]">
				<h3 className="font-semibold text-white">Overview</h3>
				<button
					onClick={onClose}
					className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
				>
					<X size={22} />
				</button>
			</div>

			<div className="space-y-6">
				{/* Summary Stats */}
				<div>
					<div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
						Summary
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div className="bg-[#1e2330] border border-[#2a3044] rounded-xl p-4 text-center">
							<div className="text-2xl font-bold text-white">
								{stats.total}
							</div>
							<div className="text-xs text-gray-400 mt-1">
								Resources
							</div>
						</div>
						<div className="bg-[#1e2330] border border-[#2a3044] rounded-xl p-4 text-center">
							<div className="text-2xl font-bold text-amber-400">
								{stats.favorites}
							</div>
							<div className="text-xs text-gray-400 mt-1">
								Favorites
							</div>
						</div>
						{/* ... other stat cards similarly */}
					</div>
				</div>

				{/* Most Visited */}
				{resources.length > 0 && (
					<div>
						<div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
							Most Visited
						</div>
						{[...resources]
							.sort(
								(a, b) =>
									(b.visitCount || 0) - (a.visitCount || 0),
							)
							.slice(0, 5)
							.map((r) => {
								const c = getCatColor(r.category);
								return (
									<div
										key={r._id}
										className="flex items-center gap-3 py-3 border-b border-[#2a3044] last:border-none"
									>
										<div
											className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
											style={{
												background: c.bg || "#1e2330",
												color: c.text,
											}}
										>
											{r.title?.slice(0, 2).toUpperCase()}
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-white truncate">
												{r.title}
											</p>
											<p className="text-xs text-gray-500 truncate">
												{r.url}
											</p>
										</div>
										<div className="text-xs text-gray-400">
											{r.visitCount || 0}
										</div>
									</div>
								);
							})}
					</div>
				)}

				{/* System Status */}
				<div>
					<div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
						<ActivityIcon size={16} className="text-green-400" />
						System Status
					</div>
					<div className="space-y-3">
						{systemStatus.map((item) => (
							<div
								key={item.name}
								className="flex justify-between items-center bg-[#1e2330] rounded-xl px-4 py-3"
							>
								<span className="text-sm text-gray-300">
									{item.name}
								</span>
								<div className="flex items-center gap-1.5 text-green-400 text-sm">
									{item.status}
									<CheckCircleIcon size={16} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RightPanel;
