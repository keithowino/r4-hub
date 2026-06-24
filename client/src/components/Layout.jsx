// // import { Outlet, useNavigate } from "react-router-dom";
// // import OverviewNavbar from "./overview/Navbar";
// // import OverviewSidebar from "./overview/Sidebar";
// // import OverviewRightPanel from "./overview/RightPanel";
// // import { useCommon } from "../lib/context/CommonContext";
// // import { useAuth } from "../lib/context/AuthContext";
// // import { useResources } from "../hooks/useResources";
// // import { useState } from "react";
// // import AddResourceModal from "./common/modals/AddResourceModal";

// // const Layout = () => {
// // 	const { isAddResModalOpen, setIsAddResModalOpen, styles } = useCommon();
// // 	const { user, logout } = useAuth();
// // 	const navigate = useNavigate();

// // 	// ✅ Pull real data instead of dead local state
// // 	const { resources = [], createResource } = useResources();

// // 	const [search, setSearch] = useState("");
// // 	const [isSearchOpen, setIsSearchOpen] = useState(false);

// // 	const favorites = resources.filter((r) => r.favorite);
// // 	const uniqueCategories = [...new Set(resources.map((r) => r.category))];
// // 	const allTags = [...new Set(resources.flatMap((r) => r.tags || []))];
// // 	const stats = {
// // 		total: resources.length,
// // 		favorites: favorites.length,
// // 		categories: uniqueCategories.length,
// // 		tags: allTags.length,
// // 	};

// // 	const handleLogout = () => {
// // 		logout();
// // 		navigate("/login");
// // 	};

// // 	return (
// // 		<div>
// // 			<OverviewNavbar
// // 				setIsSearchOpen={setIsSearchOpen}
// // 				handleLogout={handleLogout}
// // 			/>
// // 			<div style={styles.body}>
// // 				<OverviewSidebar
// // 					setSearch={setSearch}
// // 					resources={resources}
// // 					favorites={favorites}
// // 					uniqueCategories={uniqueCategories}
// // 					allTags={allTags}
// // 				/>
// // 				<main style={styles.main}>
// // 					<Outlet />
// // 				</main>
// // 				<aside style={styles.rightPanel}>
// // 					<OverviewRightPanel stats={stats} resources={resources} />
// // 				</aside>
// // 			</div>

// // 			{/* Add Modal */}
// // 			<AddResourceModal
// // 				isOpen={isAddResModalOpen}
// // 				onClose={() => setIsAddResModalOpen(false)}
// // 				onSave={createResource}
// // 			/>
// // 		</div>
// // 	);
// // };

// // export default Layout;

// import { Outlet, useNavigate } from "react-router-dom";
// import OverviewNavbar from "./overview/Navbar";
// import OverviewSidebar from "./overview/Sidebar";
// import OverviewRightPanel from "./overview/RightPanel";
// import { useCommon } from "../lib/context/CommonContext";
// import { useAuth } from "../lib/context/AuthContext";
// import { useResources } from "../hooks/useResources";
// import { useState } from "react";
// import AddResourceModal from "./common/modals/AddResourceModal";

// const Layout = () => {
// 	const { isAddResModalOpen, setIsAddResModalOpen } = useCommon();
// 	const { user, logout } = useAuth();
// 	const navigate = useNavigate();

// 	const { resources = [], createResource } = useResources();

// 	const [search, setSearch] = useState("");
// 	const [isSearchOpen, setIsSearchOpen] = useState(false);
// 	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// 	const favorites = resources.filter((r) => r.favorite);
// 	const uniqueCategories = [...new Set(resources.map((r) => r.category))];
// 	const allTags = [...new Set(resources.flatMap((r) => r.tags || []))];
// 	const stats = {
// 		total: resources.length,
// 		favorites: favorites.length,
// 		categories: uniqueCategories.length,
// 		tags: allTags.length,
// 	};

// 	const handleLogout = () => {
// 		logout();
// 		navigate("/login");
// 	};

// 	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

// 	return (
// 		<div className="min-h-screen bg-[#0d0f14] flex flex-col">
// 			<OverviewNavbar
// 				setIsSearchOpen={setIsSearchOpen}
// 				handleLogout={handleLogout}
// 				toggleSidebar={toggleSidebar}
// 				isSidebarOpen={isSidebarOpen}
// 			/>

// 			<div className="flex flex-1 overflow-hidden relative">
// 				{/* Sidebar - Mobile Drawer + Desktop */}
// 				<OverviewSidebar
// 					setSearch={setSearch}
// 					resources={resources}
// 					favorites={favorites}
// 					uniqueCategories={uniqueCategories}
// 					allTags={allTags}
// 					isOpen={isSidebarOpen}
// 					onClose={() => setIsSidebarOpen(false)}
// 				/>

// 				{/* Main Content */}
// 				<main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8">
// 					<Outlet />
// 				</main>

// 				{/* Right Panel - Hidden on smaller screens */}
// 				<aside className="hidden lg:block w-56 border-l border-[#2a3044] bg-[#161920] overflow-y-auto p-4">
// 					<OverviewRightPanel stats={stats} resources={resources} />
// 				</aside>
// 			</div>

// 			{/* Add Modal */}
// 			<AddResourceModal
// 				isOpen={isAddResModalOpen}
// 				onClose={() => setIsAddResModalOpen(false)}
// 				onSave={createResource}
// 			/>
// 		</div>
// 	);
// };

// export default Layout;

import { Outlet, useNavigate } from "react-router-dom";
import OverviewNavbar from "./overview/Navbar";
import OverviewSidebar from "./overview/Sidebar";
import OverviewRightPanel from "./overview/RightPanel";
import { useCommon } from "../lib/context/CommonContext";
import { useAuth } from "../lib/context/AuthContext";
import { useResources } from "../hooks/useResources";
import { useState } from "react";
import AddResourceModal from "./common/modals/AddResourceModal";

const Layout = () => {
	const { isAddResModalOpen, setIsAddResModalOpen } = useCommon();
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const { resources = [], createResource } = useResources();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

	const favorites = resources.filter((r) => r.favorite);
	const uniqueCategories = [...new Set(resources.map((r) => r.category))];
	const allTags = [...new Set(resources.flatMap((r) => r.tags || []))];
	const stats = {
		total: resources.length,
		favorites: favorites.length,
		categories: uniqueCategories.length,
		tags: allTags.length,
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div className="min-h-screen bg-[#0d0f14] flex flex-col">
			<OverviewNavbar
				setIsSearchOpen={() => {}} // You can wire this up if needed
				handleLogout={handleLogout}
				toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
				toggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
			/>

			<div className="flex flex-1 overflow-hidden relative">
				{/* Sidebar */}
				<OverviewSidebar
					resources={resources}
					favorites={favorites}
					uniqueCategories={uniqueCategories}
					allTags={allTags}
					isOpen={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
				/>

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto p-4 lg:p-6">
					<Outlet />
				</main>

				{/* <aside
					className={`
						fixed lg:static inset-y-0 right-0 z-50 w-72 lg:w-56 bg-[#161920] border-l border-[#2a3044] 
						transform transition-transform duration-300 overflow-y-auto p-4
						${isRightPanelOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
					`}
				>
					<OverviewRightPanel stats={stats} resources={resources} />
				</aside>


				{isRightPanelOpen && (
					<div
						className="fixed inset-0 bg-black/70 z-40 lg:hidden"
						onClick={() => setIsRightPanelOpen(false)}
					/>
				)} */}
				{/* Right Panel */}
				<aside
					className={`
						fixed lg:static right-0 inset-y-0 z-50 w-80 lg:w-64 bg-[#161920] 
						border-l border-[#2a3044] overflow-y-auto p-5 transition-transform
						${isRightPanelOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
					`}
				>
					<OverviewRightPanel
						stats={stats}
						resources={resources}
						onClose={() => setIsRightPanelOpen(false)}
					/>
				</aside>

				{isRightPanelOpen && (
					<div
						className="fixed inset-0 bg-black/70 z-40 lg:hidden"
						onClick={() => setIsRightPanelOpen(false)}
					/>
				)}
			</div>

			<AddResourceModal
				isOpen={isAddResModalOpen}
				onClose={() => setIsAddResModalOpen(false)}
				onSave={createResource}
			/>
		</div>
	);
};

export default Layout;
