import { lazy, Suspense, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./lib/context/AuthContext.jsx";
import { CommonContextProvider } from "./lib/context/CommonContext.jsx";
import ProtectedRoute, {
	PublicOnlyRoute,
} from "./components/common/ProtectedRoute.jsx";
import MainLayout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trackPageView } from "./lib/services/analyticsService.js";
import SEODashboard from "./pages/SEODashboard.jsx";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Categories = lazy(() => import("./pages/Categories"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Profile = lazy(() => import("./pages/Profile"));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			retry: 1,
		},
	},
});

// Loading fallback component
const PageLoader = () => (
	<div className="min-h-screen flex items-center justify-center bg-[#0d0f14]">
		<div className="text-center">
			<div className="spinner mx-auto mb-4" />
			<p className="text-[#3a4260] text-sm">Loading...</p>
		</div>
	</div>
);

const PageTracker = () => {
	const location = useLocation();

	useEffect(() => {
		// Track page view on route change
		trackPageView(location.pathname, document.title);
	}, [location]);

	return null;
};

const AppRoutes = () => {
	return (
		<Suspense fallback={<PageLoader />}>
			<Routes>
				{/* Public landing page */}
				<Route path="/" element={<Home />} />

				{/* Public only — redirect to dashboard if already logged in */}
				<Route element={<PublicOnlyRoute />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>

				{/* Protected routes */}
				<Route element={<ProtectedRoute />}>
					<Route path="/profile" element={<Profile />} />
					{/* <Route path="/seo-dashboard" element={<SEODashboard />} /> */}
					<Route path="/overview" element={<MainLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="favorites" element={<Favorites />} />
						<Route path="categories" element={<Categories />} />
						<Route path="ai-tools" element={<Dashboard />} />
						<Route path="platforms" element={<Dashboard />} />
						<Route path="cloud" element={<Dashboard />} />
						<Route path="dev-tools" element={<Dashboard />} />
						<Route path="resources" element={<Dashboard />} />
					</Route>
				</Route>

				{/* Catch-all */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Suspense>
	);
};

const App = () => {
	return (
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<CommonContextProvider>
					<AuthContextProvider>
						<Router>
							<PageTracker />
							<AppRoutes />
							<ToastContainer
								position="bottom-right"
								autoClose={4000}
								hideProgressBar
								newestOnTop
								closeOnClick
								pauseOnHover
								theme="dark"
								toastStyle={{
									background: "#1e2330",
									border: "1px solid #2a3044",
									color: "#e8eaf0",
									fontSize: "13px",
									borderRadius: "10px",
								}}
							/>
						</Router>
					</AuthContextProvider>
				</CommonContextProvider>
			</QueryClientProvider>
		</HelmetProvider>
	);
};

export default App;
