import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";

// Shows a full-screen loader while auth state is being verified on mount
const AuthLoader = () => (
	<div style={styles.page}>
		<div style={styles.grid} aria-hidden="true" />
		<div style={styles.inner}>
			<div style={styles.logoHex}>R4</div>
			<div style={styles.spinnerWrap}>
				<div style={styles.spinner} />
			</div>
			<p style={styles.text}>Loading your workspace...</p>
		</div>
		<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
	</div>
);

// Wraps private routes — redirects to /login if not authenticated
const ProtectedRoute = ({ children }) => {
	// ← Accept children prop
	const { isAuthenticated, loading } = useAuth();
	const location = useLocation();

	if (loading) return <AuthLoader />;

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children; // ← Return children instead of Outlet
};

// Wraps public routes — redirects to /dashboard if already logged in
export const PublicOnlyRoute = ({ children }) => {
	// ← Accept children prop
	const { isAuthenticated, loading } = useAuth();

	if (loading) return <AuthLoader />;

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}

	return children; // ← Return children instead of Outlet
};

const styles = {
	page: {
		minHeight: "100vh",
		background: "#0d0f14",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		overflow: "hidden",
	},
	grid: {
		position: "absolute",
		inset: 0,
		backgroundImage: `
			linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px)
		`,
		backgroundSize: "40px 40px",
		pointerEvents: "none",
	},
	inner: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "16px",
		position: "relative",
		zIndex: 1,
	},
	logoHex: {
		width: "40px",
		height: "40px",
		background: "linear-gradient(135deg, #6c63ff, #3b82f6)",
		borderRadius: "10px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: "900",
		fontSize: "14px",
		color: "#fff",
	},
	spinnerWrap: {
		width: "28px",
		height: "28px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	spinner: {
		width: "24px",
		height: "24px",
		border: "2px solid #2a3044",
		borderTopColor: "#6c63ff",
		borderRadius: "50%",
		animation: "spin 0.7s linear infinite",
	},
	text: {
		fontSize: "13px",
		color: "#5a6a8a",
	},
};

export default ProtectedRoute;
