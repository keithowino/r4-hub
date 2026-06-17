import { useState } from "react";
import {
	BookOpen,
	Star,
	FolderOpen,
	Tag,
	Clock,
	Activity,
	CheckCircle,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

const RightPanel = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const summary = {
		total: 128,
		favorites: 23,
		categories: 12,
		tags: 28,
	};

	const activities = [
		{ action: "Added Vercel", time: "2 min ago", icon: "▲" },
		{ action: "Favorited GitHub", time: "15 min ago", icon: "⭐" },
		{ action: "Added Supabase", time: "1 hour ago", icon: "⚡" },
		{ action: "Viewed AWS Console", time: "2 hours ago", icon: "☁️" },
	];

	const systemStatus = [
		{ name: "API", status: "operational" },
		{ name: "Database", status: "operational" },
		{ name: "Search", status: "operational" },
		{ name: "Sync", status: "operational" },
	];

	return (
		<aside
			className={`sticky min-h-[calc(100vh-4rem)] bg-[#0A0F1F]/30 backdrop-blur-sm border-l border-white/5 p-4 overflow-y-auto top-16 transition-all duration-300 ${
				isCollapsed ? "w-12" : "w-80"
			}`}
		>
			{/* Toggle Button */}
			<button
				onClick={() => setIsCollapsed(!isCollapsed)}
				className="absolute -left-3 top-4 p-1 rounded-full bg-[#0A0F1F] border border-white/10 hover:bg-white/10 transition-colors z-50"
			>
				{isCollapsed ? (
					<ChevronLeft size={16} className="text-gray-400" />
				) : (
					<ChevronRight size={16} className="text-gray-400" />
				)}
			</button>

			{!isCollapsed && (
				<>
					{/* Summary Widget */}
					<div className="mb-6 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
						<h3 className="text-sm font-semibold text-gray-300 mb-3">
							Summary
						</h3>
						<div className="grid grid-cols-2 gap-3">
							<div className="p-2 rounded-lg bg-white/5">
								<div className="flex items-center gap-2 text-blue-400">
									<BookOpen size={14} />
									<span className="text-lg font-bold">
										{summary.total}
									</span>
								</div>
								<p className="text-xs text-gray-500">
									Resources
								</p>
							</div>
							<div className="p-2 rounded-lg bg-white/5">
								<div className="flex items-center gap-2 text-yellow-400">
									<Star size={14} />
									<span className="text-lg font-bold">
										{summary.favorites}
									</span>
								</div>
								<p className="text-xs text-gray-500">
									Favorites
								</p>
							</div>
							<div className="p-2 rounded-lg bg-white/5">
								<div className="flex items-center gap-2 text-green-400">
									<FolderOpen size={14} />
									<span className="text-lg font-bold">
										{summary.categories}
									</span>
								</div>
								<p className="text-xs text-gray-500">
									Categories
								</p>
							</div>
							<div className="p-2 rounded-lg bg-white/5">
								<div className="flex items-center gap-2 text-purple-400">
									<Tag size={14} />
									<span className="text-lg font-bold">
										{summary.tags}
									</span>
								</div>
								<p className="text-xs text-gray-500">Tags</p>
							</div>
						</div>
					</div>

					{/* Activity Feed */}
					<div className="mb-6 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
						<div className="flex items-center gap-2 mb-3">
							<Clock size={16} className="text-gray-400" />
							<h3 className="text-sm font-semibold text-gray-300">
								Recent Activity
							</h3>
						</div>
						<div className="space-y-3">
							{activities.map((activity, idx) => (
								<div
									key={idx}
									className="flex items-center gap-3"
								>
									<div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg">
										{activity.icon}
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm text-gray-300 truncate">
											{activity.action}
										</p>
										<p className="text-xs text-gray-500">
											{activity.time}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Developer Widget */}
					<div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-white/5">
						<h3 className="text-sm font-semibold text-gray-300 mb-2">
							⚡ Developer
						</h3>
						<pre className="text-xs font-mono text-gray-400 overflow-x-auto">
							<code>{`const hub = new R4Hub();
hub.search("database")
  .filter(r => r.favorite)
  .sort("recent")
  .get();`}</code>
						</pre>
					</div>

					{/* System Status */}
					<div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
						<div className="flex items-center gap-2 mb-3">
							<Activity size={16} className="text-gray-400" />
							<h3 className="text-sm font-semibold text-gray-300">
								System Status
							</h3>
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
										<CheckCircle
											size={12}
											className="text-green-400"
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</aside>
	);
};

export default RightPanel;
