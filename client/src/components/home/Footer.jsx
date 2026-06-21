import React from "react";
import data from "../../lib/data";
import { useCommon } from "../../lib/context/CommonContext";
import Logo from "../common/Logo";

const Footer = () => {
	const { styles } = useCommon();

	return (
		<footer className="relative z-10 border-t border-[#1e2330] py-6 px-4 sm:px-6 md:px-10 w-full">
			{/* Desktop Layout */}
			<div className="hidden sm:flex items-center justify-between gap-3">
				<Logo
					gap="1"
					fontsize="sm"
					logoIcon={{
						width: "22px",
						height: "22px",
						fontSize: "9px",
					}}
				/>
				<p className="text-xs text-[#3a4260]">
					© {new Date().getFullYear()} {data.metadata.name}. All
					rights reserved.
				</p>
				<p className="text-xs text-[#3a4260]">
					Powered by{" "}
					<a
						href={data.metadata.parentCompany.liveLink}
						style={styles.footerLink}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-[#6c63ff] transition-colors"
					>
						{data.metadata.parentCompany.name}
					</a>
				</p>
			</div>

			{/* Mobile Layout - Centered Stack */}
			<div className="flex sm:hidden flex-col items-center gap-3">
				<Logo
					gap="1"
					fontsize="sm"
					logoIcon={{
						width: "22px",
						height: "22px",
						fontSize: "9px",
					}}
				/>
				<p className="text-xs text-[#3a4260] text-center">
					© {new Date().getFullYear()} {data.metadata.name}.
					<br />
					All rights reserved.
				</p>
				<p className="text-xs text-[#3a4260]">
					Powered by{" "}
					<a
						href={data.metadata.parentCompany.liveLink}
						style={styles.footerLink}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-[#6c63ff] transition-colors"
					>
						{data.metadata.parentCompany.name}
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
