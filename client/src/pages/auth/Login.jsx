import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext.jsx";
import MetaDataInsert from "../../lib/MetaDataInsert.jsx";
import { useCommon } from "../../lib/context/CommonContext.jsx";

const Login = () => {
	const { login, error, clearError } = useAuth();
	const { styles } = useCommon();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({ email: "", password: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		clearError();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await login({ email: formData.email, password: formData.password });
			navigate("/overview");
		} catch {
			// error is already set in AuthContext
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<MetaDataInsert title="Sign In" />

			<div className="relative container mx-auto min-h-screen flex flex-col items-center justify-center bg-[#0d0f14] overflow-hidden">
				<div style={styles.grid} aria-hidden="true" />

				<div style={styles.card}>
					{/* Logo */}
					<div style={styles.logoRow}>
						<div style={styles.logoHex}>R4</div>
						<span style={styles.logoText}>
							R4 <span style={styles.logoAccent}>Hub</span>
						</span>
					</div>

					<h1 style={styles.heading}>Welcome back</h1>
					<p style={styles.subheading}>
						Sign in to access your dev resources.
					</p>

					{error && (
						<div style={styles.errorBox}>
							<span style={styles.errorIcon}>!</span>
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} style={styles.form}>
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
								autoFocus
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
							<div style={styles.labelRow}>
								<label style={styles.label} htmlFor="password">
									Password
								</label>
							</div>
							<input
								id="password"
								name="password"
								type="password"
								required
								autoComplete="current-password"
								placeholder="Your password"
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
									Signing in...
								</span>
							) : (
								"Sign in"
							)}
						</button>
					</form>

					<p style={styles.footer}>
						Don't have an account?{" "}
						<Link to="/register" style={styles.link}>
							Create one
						</Link>
					</p>
				</div>

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

export default Login;
