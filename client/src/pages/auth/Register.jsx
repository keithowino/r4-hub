import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext.jsx";
import MetaDataInsert from "../../lib/MetaDataInsert.jsx";

const Register = () => {
	const { register, loading, error, clearError } = useAuth();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [fieldError, setFieldError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		clearError();
		setFieldError("");
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setFieldError("Passwords do not match");
			return;
		}

		if (formData.password.length < 6) {
			setFieldError("Password must be at least 6 characters");
			return;
		}

		setIsSubmitting(true);
		try {
			await register({
				name: formData.name,
				email: formData.email,
				password: formData.password,
			});
			navigate("/dashboard");
		} catch {
			// error is already set in AuthContext
		} finally {
			setIsSubmitting(false);
		}
	};

	const displayError = fieldError || error;

	return (
		<>
			<MetaDataInsert title="Create Account" />

			<div style={styles.page}>
				{/* Background grid */}
				<div style={styles.grid} aria-hidden="true" />

				<div style={styles.card}>
					{/* Logo */}
					<div style={styles.logoRow}>
						<div style={styles.logoHex}>R4</div>
						<span style={styles.logoText}>
							R4 <span style={styles.logoAccent}>Hub</span>
						</span>
					</div>

					<h1 style={styles.heading}>Create your account</h1>
					<p style={styles.subheading}>
						Your dev resources, organized in one place.
					</p>

					{/* Error */}
					{displayError && (
						<div style={styles.errorBox}>
							<span style={styles.errorIcon}>!</span>
							{displayError}
						</div>
					)}

					<form onSubmit={handleSubmit} style={styles.form}>
						<div style={styles.field}>
							<label style={styles.label} htmlFor="name">
								Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								autoComplete="name"
								placeholder="Keith Owino"
								style={styles.input}
								value={formData.name}
								onChange={handleChange}
								onFocus={(e) =>
									(e.target.style.borderColor = "#6c63ff")
								}
								onBlur={(e) =>
									(e.target.style.borderColor = "#2a3044")
								}
							/>
						</div>

						<div style={styles.field}>
							<label style={styles.label} htmlFor="email">
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								autoComplete="email"
								placeholder="keith@example.com"
								style={styles.input}
								value={formData.email}
								onChange={handleChange}
								onFocus={(e) =>
									(e.target.style.borderColor = "#6c63ff")
								}
								onBlur={(e) =>
									(e.target.style.borderColor = "#2a3044")
								}
							/>
						</div>

						<div style={styles.field}>
							<label style={styles.label} htmlFor="password">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								autoComplete="new-password"
								placeholder="Min. 6 characters"
								style={styles.input}
								value={formData.password}
								onChange={handleChange}
								onFocus={(e) =>
									(e.target.style.borderColor = "#6c63ff")
								}
								onBlur={(e) =>
									(e.target.style.borderColor = "#2a3044")
								}
							/>
						</div>

						<div style={styles.field}>
							<label
								style={styles.label}
								htmlFor="confirmPassword"
							>
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								required
								autoComplete="new-password"
								placeholder="Repeat your password"
								style={styles.input}
								value={formData.confirmPassword}
								onChange={handleChange}
								onFocus={(e) =>
									(e.target.style.borderColor = "#6c63ff")
								}
								onBlur={(e) =>
									(e.target.style.borderColor = "#2a3044")
								}
							/>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							style={{
								...styles.btn,
								opacity: isSubmitting ? 0.7 : 1,
								cursor: isSubmitting
									? "not-allowed"
									: "pointer",
							}}
						>
							{isSubmitting ? (
								<span style={styles.btnInner}>
									<span style={styles.spinner} />
									Creating account...
								</span>
							) : (
								"Create account"
							)}
						</button>
					</form>

					<p style={styles.footer}>
						Already have an account?{" "}
						<Link to="/login" style={styles.link}>
							Sign in
						</Link>
					</p>
				</div>

				{/* Bottom tagline */}
				<p style={styles.tagline}>
					<span style={styles.taglineAccent}>&lt;/&gt;</span> Built
					for developers, designed for productivity.
				</p>
			</div>

			<style>{`
				@keyframes spin {
					to { transform: rotate(360deg); }
				}
			`}</style>
		</>
	);
};

const styles = {
	page: {
		minHeight: "100vh",
		background: "#0d0f14",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: "24px 16px",
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
	card: {
		width: "100%",
		maxWidth: "400px",
		background: "#161920",
		border: "1px solid #2a3044",
		borderRadius: "16px",
		padding: "36px 32px",
		position: "relative",
		zIndex: 1,
	},
	logoRow: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
		marginBottom: "28px",
	},
	logoHex: {
		width: "32px",
		height: "32px",
		background: "linear-gradient(135deg, #6c63ff, #3b82f6)",
		borderRadius: "8px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: "900",
		fontSize: "12px",
		color: "#fff",
	},
	logoText: {
		fontWeight: "700",
		fontSize: "18px",
		color: "#e8eaf0",
	},
	logoAccent: {
		color: "#6c63ff",
	},
	heading: {
		fontSize: "22px",
		fontWeight: "700",
		color: "#e8eaf0",
		margin: "0 0 6px",
	},
	subheading: {
		fontSize: "13px",
		color: "#8b9ab8",
		margin: "0 0 24px",
	},
	errorBox: {
		display: "flex",
		alignItems: "center",
		gap: "8px",
		background: "rgba(239,68,68,0.1)",
		border: "1px solid rgba(239,68,68,0.3)",
		borderRadius: "8px",
		padding: "10px 14px",
		fontSize: "13px",
		color: "#f87171",
		marginBottom: "20px",
	},
	errorIcon: {
		width: "18px",
		height: "18px",
		background: "#ef4444",
		borderRadius: "50%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "11px",
		fontWeight: "700",
		color: "#fff",
		flexShrink: 0,
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "16px",
	},
	field: {
		display: "flex",
		flexDirection: "column",
		gap: "6px",
	},
	label: {
		fontSize: "12px",
		fontWeight: "600",
		color: "#8b9ab8",
	},
	input: {
		background: "#1e2330",
		border: "1px solid #2a3044",
		borderRadius: "8px",
		padding: "10px 14px",
		color: "#e8eaf0",
		fontSize: "13px",
		outline: "none",
		transition: "border-color 0.15s",
		width: "100%",
	},
	btn: {
		width: "100%",
		background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
		border: "none",
		borderRadius: "8px",
		padding: "12px",
		color: "#fff",
		fontSize: "14px",
		fontWeight: "600",
		marginTop: "4px",
		transition: "opacity 0.15s",
	},
	btnInner: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "8px",
	},
	spinner: {
		width: "14px",
		height: "14px",
		border: "2px solid rgba(255,255,255,0.3)",
		borderTopColor: "#fff",
		borderRadius: "50%",
		display: "inline-block",
		animation: "spin 0.7s linear infinite",
	},
	footer: {
		textAlign: "center",
		fontSize: "13px",
		color: "#8b9ab8",
		marginTop: "24px",
	},
	link: {
		color: "#6c63ff",
		textDecoration: "none",
		fontWeight: "600",
	},
	tagline: {
		marginTop: "32px",
		fontSize: "12px",
		color: "#3a4260",
		position: "relative",
		zIndex: 1,
	},
	taglineAccent: {
		color: "#6c63ff",
	},
};

export default Register;
