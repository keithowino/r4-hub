import React from "react";
import { Outlet } from "react-router-dom";
import data from "../lib/data";

const Layout = () => {
	return (
		<section className="layout relative flex flex-col min-h-screen items-center bg-gray-50">
			<main>
				<Outlet />
			</main>
			<footer className="absolute bottom-0 flex justify-center w-full">
				<p className="text-sm">
					&copy; {new Date().getFullYear()}
					{""} Powered by{""}{" "}
					<a
						href={`${data.metadata.parentCompany.link}`}
						target="_blank"
						rel="noopener noreferrer"
						className="cursor-pointer hover:text-blue-600"
					>
						{data.metadata.parentCompany.name}
					</a>
				</p>
			</footer>
		</section>
	);
};

export default Layout;
