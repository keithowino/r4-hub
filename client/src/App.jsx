// import React from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import { HelmetProvider } from "react-helmet-async";
// import MainLayout from "./components/Layout";
// import { ToastContainer } from "react-toastify";
// // import Dashboard from "./pages/Dashboard";
// import { CommonContextProvider } from "./lib/context/CommonContext";
// import { AuthContextProvider } from "./lib/context/AuthContext";

// const App = () => {
// 	const AuthenticatedApp = () => {
// 		return (
// 			<Routes>
// 				<Route path="/" element={<MainLayout />}>
// 					<Route index element={<Home />} />
// 					{/* <Route path="/dashboard" element={<Dashboard />} /> */}
// 				</Route>
// 			</Routes>
// 		);
// 	};

// 	return (
// 		<AuthContextProvider>
// 			<CommonContextProvider>
// 				<HelmetProvider>
// 					<Router>
// 						<AuthenticatedApp />
// 					</Router>
// 				</HelmetProvider>
// 				<ToastContainer />
// 			</CommonContextProvider>
// 		</AuthContextProvider>
// 	);
// };

// export default App;

import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider, useAuth } from "./lib/context/AuthContext";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import MainLayout from "./components/Layout";
import { CommonContextProvider } from "./lib/context/CommonContext";
import Login from "./pages/auth/Login";
import Favorites from "./pages/Favorites";
import Categories from "./pages/Categories";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			retry: 1,
		},
	},
});

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#030712]">
				<div className="text-white">Loading...</div>
			</div>
		);
	}

	return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<MainLayout />
					</ProtectedRoute>
				}
			>
				<Route index element={<Dashboard />} />
				<Route path="favorites" element={<Favorites />} />
				<Route path="categories" element={<Categories />} />
				{/* <Route path="ai-tools" element={<Dashboard />} /> */}
				{/* <Route path="platforms" element={<Dashboard />} /> */}
				{/* <Route path="cloud" element={<Dashboard />} /> */}
				{/* <Route path="dev-tools" element={<Dashboard />} /> */}
				<Route path="resources" element={<Dashboard />} />
			</Route>
		</Routes>
	);
};

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<CommonContextProvider>
					<Router>
						<AppRoutes />
						{/* <ToastContainer
							position="top-right"
							toastOptions={{
								duration: 4000,
								style: {
									background: "#0A0F1F",
									color: "#fff",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: "12px",
								},
								success: {
									iconTheme: {
										primary: "#34D399",
										secondary: "#fff",
									},
								},
								error: {
									iconTheme: {
										primary: "#F87171",
										secondary: "#fff",
									},
								},
							}}
						/> */}
						<ToastContainer
							position="top-right"
							autoClose={4000}
							hideProgressBar={false}
							newestOnTop
							closeOnClick={false}
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="colored"
							// transition={Bounce}
						/>
					</Router>
				</CommonContextProvider>
			</AuthContextProvider>
		</QueryClientProvider>
	);
};

export default App;
