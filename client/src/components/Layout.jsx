// import React from "react";
// import { Outlet } from "react-router-dom";
// import data from "../lib/data";

// const Layout = () => {
// 	return (
// 		<section className="layout relative flex flex-col min-h-screen items-center bg-gray-50">
// 			<main>
// 				<Outlet />
// 			</main>
// 			<footer className="absolute bottom-0 flex justify-center w-full">
// 				<p className="text-sm">
// 					&copy; {new Date().getFullYear()}
// 					{""} Powered by{""}{" "}
// 					<a
// 						href={`${data.metadata.parentCompany.link}`}
// 						target="_blank"
// 						rel="noopener noreferrer"
// 						className="cursor-pointer hover:text-blue-600"
// 					>
// 						{data.metadata.parentCompany.name}
// 					</a>
// 				</p>
// 			</footer>
// 		</section>
// 	);
// };

// export default Layout;

import { Outlet } from "react-router-dom";
import OverviewNavbar from "./overview/Navbar";
import OverviewSidebar from "./overview/Sidebar";
import OverviewRightPanel from "./overview/RightPanel";
import { useState } from "react";
import { useCommon } from "../lib/context/CommonContext";
import { useAuth } from "../lib/context/AuthContext";

const Layout = () => {
	const { styles } = useCommon();
	const { user, logout } = useAuth();

	const [resources, setResources] = useState([]);
	const [search, setSearch] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingResource, setEditingResource] = useState(null);

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

	const openAddModal = () => {
		setEditingResource(null);
		setModalOpen(true);
	};

	return (
		<div>
			<OverviewNavbar
				setIsSearchOpen={setIsSearchOpen}
				handleLogout={handleLogout}
				openAddModal={openAddModal}
			/>
			<div style={styles.body}>
				<OverviewSidebar
					openAddModal={openAddModal}
					setSearch={setSearch}
				/>

				<main style={styles.main}>
					<Outlet />
				</main>

				<aside style={styles.rightPanel}>
					<OverviewRightPanel
						stats={stats}
						resources={resources}
						handleLogout={handleLogout}
					/>
				</aside>
			</div>
		</div>
	);
};

export default Layout;
