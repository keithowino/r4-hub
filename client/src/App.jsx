import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./lib/context/AuthContext.jsx";
import { CommonContextProvider } from "./lib/context/CommonContext.jsx";
import ProtectedRoute, {
	PublicOnlyRoute,
} from "./components/common/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MainLayout from "./components/Layout";
import Favorites from "./pages/Favorites";
import Categories from "./pages/Categories";

const AppRoutes = () => {
	return (
		<Routes>
			{/* Public landing page */}
			<Route path="/" element={<Home />} />

			{/* Public only — redirect to dashboard if already logged in */}
			<Route element={<PublicOnlyRoute />}>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Route>

			<Route
				path="/overview"
				element={
					<ProtectedRoute>
						<MainLayout />
					</ProtectedRoute>
				}
			>
				{/* <Route index element={<Dashboard />} /> */}
				{/* <Route path="favorites" element={<Favorites />} /> */}
				{/* <Route path="categories" element={<Categories />} /> */}
				{/* <Route path="ai-tools" element={<Dashboard />} /> */}
				{/* <Route path="platforms" element={<Dashboard />} /> */}
				{/* <Route path="cloud" element={<Dashboard />} /> */}
				{/* <Route path="dev-tools" element={<Dashboard />} /> */}
				{/* <Route path="resources" element={<Dashboard />} /> */}
			</Route>

			{/* Catch-all */}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

const App = () => {
	return (
		<HelmetProvider>
			<AuthContextProvider>
				<CommonContextProvider>
					<Router>
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
				</CommonContextProvider>
			</AuthContextProvider>
		</HelmetProvider>
	);
};

export default App;
