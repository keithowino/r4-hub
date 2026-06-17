export const NAV_TABS = [
	{ id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
	{ id: "ai-tools", label: "AI Tools", icon: "Brain" },
	{ id: "platforms", label: "Platforms", icon: "Server" },
	{ id: "cloud", label: "Cloud", icon: "Cloud" },
	{ id: "dev-tools", label: "Dev Tools", icon: "Wrench" },
	{ id: "resources", label: "Resources", icon: "FolderOpen" },
];

export const CATEGORIES = [
	"AI Tools",
	"Dev Platforms",
	"Databases",
	"Cloud",
	"Code Tools",
	"Learning",
	"Productivity",
	"Other",
];

export const CATEGORY_COLORS = {
	"AI Tools": "from-purple-500 to-pink-500",
	"Dev Platforms": "from-blue-500 to-cyan-500",
	Databases: "from-green-500 to-emerald-500",
	Cloud: "from-sky-500 to-indigo-500",
	"Code Tools": "from-orange-500 to-red-500",
	Learning: "from-violet-500 to-purple-500",
	Productivity: "from-teal-500 to-cyan-500",
	Other: "from-gray-500 to-gray-600",
};

export const TAG_COLORS = {
	AI: "#8B5CF6",
	Backend: "#3B82F6",
	Frontend: "#60A5FA",
	Cloud: "#38BDF8",
	Database: "#34D399",
	DevOps: "#F472B6",
	Security: "#F87171",
	Productivity: "#FBBF24",
	LLM: "#A78BFA",
	API: "#60A5FA",
	Hosting: "#34D399",
};

export const SAMPLE_RESOURCES = [
	{
		id: "1",
		title: "ChatGPT",
		url: "https://chat.openai.com",
		category: "AI Tools",
		tags: ["AI", "LLM"],
		description: "Advanced AI assistant for coding and research",
		favorite: true,
		icon: "🤖",
	},
	{
		id: "2",
		title: "GitHub",
		url: "https://github.com",
		category: "Dev Platforms",
		tags: ["DevOps", "Backend"],
		description: "Code hosting and collaboration platform",
		favorite: true,
		icon: "🐙",
	},
	{
		id: "3",
		title: "Supabase",
		url: "https://supabase.com",
		category: "Databases",
		tags: ["Database", "Backend"],
		description: "Open source Firebase alternative",
		favorite: false,
		icon: "⚡",
	},
	{
		id: "4",
		title: "Vercel",
		url: "https://vercel.com",
		category: "Cloud",
		tags: ["Hosting", "Frontend"],
		description: "Deploy frontend apps instantly",
		favorite: true,
		icon: "▲",
	},
	{
		id: "5",
		title: "Cursor",
		url: "https://cursor.sh",
		category: "AI Tools",
		tags: ["AI", "Productivity"],
		description: "AI-powered code editor",
		favorite: false,
		icon: "⌨️",
	},
];
