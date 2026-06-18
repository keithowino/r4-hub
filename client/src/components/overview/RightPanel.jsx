import { ActivityIcon, CheckCircleIcon } from "lucide-react";
import { useAuth } from "../../lib/context/AuthContext";
import { useCommon } from "../../lib/context/CommonContext";

const RightPanel = ({ stats, resources, handleLogout }) => {
	const { styles, systemStatus } = useCommon();
	const { user } = useAuth();

	return (
		<aside style={styles.rightPanel}>
			<div style={styles.panelSection}>
				<div style={styles.panelTitle}>Summary</div>
				<div style={styles.statGrid}>
					<div style={styles.statCard}>
						<div style={styles.statNum}>{stats.total}</div>
						<div style={styles.statLabel}>Resources</div>
					</div>
					<div style={styles.statCard}>
						<div
							style={{
								...styles.statNum,
								color: "#f59e0b",
							}}
						>
							{stats.favorites}
						</div>
						<div style={styles.statLabel}>Favorites</div>
					</div>
					<div style={styles.statCard}>
						<div
							style={{
								...styles.statNum,
								color: "#a855f7",
							}}
						>
							{stats.categories}
						</div>
						<div style={styles.statLabel}>Categories</div>
					</div>
					<div style={styles.statCard}>
						<div
							style={{
								...styles.statNum,
								color: "#14b8a6",
							}}
						>
							{stats.tags}
						</div>
						<div style={styles.statLabel}>Tags</div>
					</div>
				</div>
			</div>

			{resources.length > 0 && (
				<div style={styles.panelSection}>
					<div style={styles.panelTitle}>Most Visited</div>
					{[...resources]
						.sort(
							(a, b) => (b.visitCount || 0) - (a.visitCount || 0),
						)
						.slice(0, 5)
						.map((r) => {
							const c = getCatColor(r.category);
							return (
								<div key={r._id} style={styles.visitRow}>
									<div
										style={{
											...styles.visitDot,
											background: c.bg,
											color: c.text,
										}}
									>
										{r.title?.slice(0, 2).toUpperCase()}
									</div>
									<div style={styles.visitName}>
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

			{/* developer widget */}
			<div style={styles.panelSection}>
				<div style={styles.panelTitle}>⚡ Developer Widget</div>
				<pre className="text-xs font-mono text-gray-400 overflow-x-auto bg-[#0a0c10] border-[1px] border-solid border-[#2a3044] rounded-lg p-1">
					<code>{`const hub = new R4Hub();
hub.search("database")
  .filter(r => r.favorite)
  .sort("recent")
  .get();`}</code>
				</pre>
			</div>

			{/* system stats */}
			<div style={styles.panelSection}>
				<div style={styles.panelTitle}>
					<ActivityIcon size={16} className="text-green-400" /> System
					Status
				</div>
				<div className="space-y-2">
					{systemStatus.map((item) => (
						<div
							key={item.name}
							className="flex items-center justify-between"
						>
							<span className="text-sm text-gray-400">
								{item.name}
							</span>
							<div className="flex items-center gap-2">
								<span className="text-xs text-green-400">
									{item.status}
								</span>
								<CheckCircleIcon
									size={12}
									className="text-green-400"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
};

export default RightPanel;
