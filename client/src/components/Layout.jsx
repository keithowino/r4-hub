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

// 	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// 	const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

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

// 	return (
// 		<div className="min-h-screen bg-[#0d0f14] flex flex-col">
// 			<OverviewNavbar
// 				setIsSearchOpen={() => {}} // You can wire this up if needed
// 				handleLogout={handleLogout}
// 				toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
// 				toggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
// 			/>

// 			<div className="flex flex-1 overflow-hidden relative">
// 				{/* Sidebar */}
// 				<OverviewSidebar
// 					resources={resources}
// 					favorites={favorites}
// 					uniqueCategories={uniqueCategories}
// 					allTags={allTags}
// 					isOpen={isSidebarOpen}
// 					onClose={() => setIsSidebarOpen(false)}
// 				/>
// 				{/* Main Content */}
// 				<main className="flex-1 overflow-y-auto p-4 lg:p-6">
// 					<Outlet />
// 				</main>
// 				<aside
// 					className={`
// 						fixed lg:static right-0 inset-y-0 z-50 w-80 lg:w-64 bg-[#161920]
// 						border-l border-[#2a3044] overflow-y-auto p-5 transition-transform
// 						${isRightPanelOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
// 					`}
// 				>
// 					<OverviewRightPanel
// 						stats={stats}
// 						resources={resources}
// 						onClose={() => setIsRightPanelOpen(false)}
// 					/>
// 				</aside>
// 				{isRightPanelOpen && (
// 					<div
// 						className="fixed inset-0 bg-black/70 z-40 lg:hidden"
// 						onClick={() => setIsRightPanelOpen(false)}
// 					/>
// 				)}
// 			</div>

// 			<AddResourceModal
// 				isOpen={isAddResModalOpen}
// 				onClose={() => setIsAddResModalOpen(false)}
// 				onSave={createResource}
// 			/>
// 		</div>
// 	);
// };

// export default Layout;

// ...

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
				setIsSearchOpen={() => {}}
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
				<main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8">
					<Outlet />
				</main>

				{/* Right Panel */}
				<aside
					className={`
						fixed lg:static right-0 inset-y-0 z-40 lg:z-30 w-80 lg:w-64 
						bg-[#161920] border-l border-[#2a3044] overflow-y-auto p-5 
						transition-transform duration-300
						${isRightPanelOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
					`}
				>
					<OverviewRightPanel
						stats={stats}
						resources={resources}
						onClose={() => setIsRightPanelOpen(false)}
					/>
				</aside>

				{/* Mobile Backdrop */}
				{isRightPanelOpen && (
					<div
						className="fixed inset-0 bg-black/70 z-30 lg:hidden"
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
