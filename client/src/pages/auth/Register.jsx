import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext.jsx";
import MetaDataInsert from "../../lib/MetaDataInsert.jsx";
import { useCommon } from "../../lib/context/CommonContext.jsx";

const Register = () => {
	const { styles } = useCommon();
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
			<MetaDataInsert
				title="Create Account - R4 Hub"
				description="Create your free R4 Hub account and start organizing your developer resources today."
				noIndex={true}
			/>

			<div className="relative container mx-auto min-h-screen flex flex-col items-center justify-center bg-[#0d0f14] overflow-hidden">
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

export default Register;
