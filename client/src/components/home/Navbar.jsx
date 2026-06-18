import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useCommon } from "../../lib/context/CommonContext";
import Logo from "../common/Logo";
import { RedirectToDashboard } from "../common/Buttons";
import { useAuth } from "../../lib/context/AuthContext";

const Navbar = () => {
	const { isAuthenticated } = useAuth();
	const { styles } = useCommon();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	return (
		<>
			<nav className="relative z-10 flex items-center justify-between py-5 px-4 sm:px-6 md:px-10 border-b border-[#1e2330] w-full">
				<Logo
					gap="2"
					fontsize="xl"
					logoIcon={{
						width: "32px",
						height: "32px",
						fontSize: "12px",
					}}
				/>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-3">
					{isAuthenticated ? (
						<RedirectToDashboard />
					) : (
						<>
							<Link to="/login" style={styles.btnGhost}>
								Sign in
							</Link>
							<Link to="/register" style={styles.btnPrimary}>
								Get started
							</Link>
						</>
					)}
				</div>

				{/* Mobile Hamburger Button */}
				<button
					onClick={toggleMobileMenu}
					className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
					aria-label="Toggle menu"
				>
					{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</nav>

			{/* Mobile Menu - Slide in from right */}
			{isMobileMenuOpen && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
						onClick={closeMobileMenu}
					/>

					{/* Menu Panel */}
					<div className="fixed top-0 right-0 h-full w-64 bg-[#161920] border-l border-[#2a3044] z-50 p-6 md:hidden animate-slide-in">
						<div className="flex justify-between items-center mb-8">
							<Logo gap="2" fontsize="xl" />
							<button
								onClick={closeMobileMenu}
								className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
							>
								<X size={20} />
							</button>
						</div>

						<div className="flex flex-col gap-3">
							{isAuthenticated ? (
								<>
									<Link
										to="/overview"
										onClick={closeMobileMenu}
										className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-center hover:shadow-lg hover:shadow-blue-500/25 transition-all"
									>
										Dashboard →
									</Link>
									<button
										onClick={() => {
											// Handle logout
											closeMobileMenu();
										}}
										className="w-full py-3 px-4 rounded-lg border border-[#2a3044] text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-center"
									>
										Sign Out
									</button>
								</>
							) : (
								<>
									<Link
										to="/login"
										onClick={closeMobileMenu}
										className="w-full py-3 px-4 rounded-lg border border-[#2a3044] text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-center"
									>
										Sign In
									</Link>
									<Link
										to="/register"
										onClick={closeMobileMenu}
										className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-center hover:shadow-lg hover:shadow-blue-500/25 transition-all"
									>
										Get Started
									</Link>
								</>
							)}
						</div>

						{/* Footer */}
						<div className="absolute bottom-6 left-6 right-6 border-t border-[#1e2330] pt-4">
							<p className="text-xs text-[#3a4260] text-center">
								© {new Date().getFullYear()} R4 Hub
							</p>
						</div>
					</div>
				</>
			)}

			<style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
		</>
	);
};

export default Navbar;
