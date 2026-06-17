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

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./common/Navbar";
import Sidebar from "./common/Sidebar";
import RightPanel from "./common/RightPanel";

const Layout = () => {
	return (
		<div className="min-h-screen bg-[#030712] text-white">
			<Navbar />
			<div className="flex pt-16">
				<Sidebar />
				<main className="flex-1 px-6 py-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
					<Outlet />
				</main>
				<RightPanel />
			</div>
		</div>
	);
};

export default Layout;
