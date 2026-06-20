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
	const { isAddResModalOpen, setIsAddResModalOpen, styles } = useCommon();
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	// ✅ Pull real data instead of dead local state
	const { resources = [], createResource } = useResources();

	const [search, setSearch] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);

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
		<div>
			<OverviewNavbar
				setIsSearchOpen={setIsSearchOpen}
				handleLogout={handleLogout}
			/>
			<div style={styles.body}>
				<OverviewSidebar
					setSearch={setSearch}
					resources={resources}
					favorites={favorites}
					uniqueCategories={uniqueCategories}
					allTags={allTags}
				/>
				<main style={styles.main}>
					<Outlet />
				</main>
				<aside style={styles.rightPanel}>
					<OverviewRightPanel stats={stats} resources={resources} />
				</aside>
			</div>

			{/* Add Modal */}
			<AddResourceModal
				isOpen={isAddResModalOpen}
				onClose={() => setIsAddResModalOpen(false)}
				onSave={createResource}
			/>
		</div>
	);
};

export default Layout;
