import { Link } from "react-router-dom";
import { useAuth } from "../lib/context/AuthContext.jsx";
import MetaDataInsert from "../lib/MetaDataInsert.jsx";

const features = [
	{
		icon: "⚡",
		title: "Quick Access",
		desc: "Favorite your most-used tools and reach them in one click from the top of your dashboard.",
	},
	{
		icon: "🗂️",
		title: "Organized by Category",
		desc: "LLMs, databases, hosting, dev tools — every resource lives where you'd expect it.",
	},
	{
		icon: "🔍",
		title: "Search Everything",
		desc: "Filter by title, URL, tag, or category across your entire library instantly.",
	},
	{
		icon: "📌",
		title: "Tag & Annotate",
		desc: "Add tags and notes to resources so you remember why you saved them.",
	},
];

const stack = [
	"MongoDB",
	"Express",
	"React",
	"Node.js",
	"Vercel",
	"Cloudinary",
];

const Home = () => {
	const { isAuthenticated } = useAuth();

	return (
		<>
			<MetaDataInsert />

			<div style={styles.page}>
				{/* Grid background */}
				<div style={styles.grid} aria-hidden="true" />

				{/* Glow */}
				<div style={styles.glow} aria-hidden="true" />

				{/* Nav */}
				<nav style={styles.nav}>
					<div style={styles.navLogo}>
						<div style={styles.logoHex}>R4</div>
						<span style={styles.logoText}>
							R4 <span style={styles.logoAccent}>Hub</span>
						</span>
					</div>
					<div style={styles.navLinks}>
						{isAuthenticated ? (
							<Link to="/overview" style={styles.btnPrimary}>
								Go to Dashboard →
							</Link>
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
				</nav>

				{/* Hero */}
				<section style={styles.hero}>
					<div style={styles.badge}>
						<span style={styles.badgeDot} />
						Developer Resource Manager
					</div>

					<h1 style={styles.heroHeading}>
						All your dev tools.
						<br />
						<span style={styles.heroAccent}>One place.</span>
					</h1>

					<p style={styles.heroSub}>
						Stop hunting through browser tabs and bookmarks. R4 Hub
						keeps every API, LLM, platform, and tool organized,
						searchable, and a single click away.
					</p>

					<div style={styles.heroCta}>
						{isAuthenticated ? (
							<Link to="/overview" style={styles.btnPrimaryLg}>
								Open Dashboard →
							</Link>
						) : (
							<>
								<Link
									to="/register"
									style={styles.btnPrimaryLg}
								>
									Start for free →
								</Link>
								<Link to="/login" style={styles.btnGhostLg}>
									Sign in
								</Link>
							</>
						)}
					</div>

					{/* Terminal block */}
					<div style={styles.terminal}>
						<div style={styles.terminalBar}>
							<span
								style={{ ...styles.dot, background: "#ef4444" }}
							/>
							<span
								style={{ ...styles.dot, background: "#f59e0b" }}
							/>
							<span
								style={{ ...styles.dot, background: "#22c55e" }}
							/>
							<span style={styles.terminalTitle}>
								r4-hub ~ dashboard
							</span>
						</div>
						<div style={styles.terminalBody}>
							<div style={styles.terminalLine}>
								<span style={styles.prompt}>$</span>
								<span style={styles.cmd}>
									{" "}
									r4 --list favorites
								</span>
							</div>
							{[
								"GitHub",
								"ChatGPT",
								"Supabase",
								"Vercel",
								"MongoDB Atlas",
							].map((item, i) => (
								<div
									key={item}
									style={{
										...styles.terminalLine,
										animationDelay: `${i * 0.1}s`,
									}}
								>
									<span style={styles.arrow}>›</span>
									<span style={styles.item}> {item}</span>
								</div>
							))}
							<div style={styles.terminalLine}>
								<span style={styles.prompt}>$</span>
								<span style={styles.cmd}>
									{" "}
									r4 --search "llm"
								</span>
							</div>
							<div style={styles.terminalLine}>
								<span style={styles.dimText}>
									Found 6 resources tagged{" "}
								</span>
								<span style={styles.tagText}>#llm</span>
							</div>
						</div>
					</div>
				</section>

				{/* Features */}
				<section style={styles.section}>
					<p style={styles.sectionEyebrow}>What R4 Hub does</p>
					<h2 style={styles.sectionHeading}>
						Built around how developers actually work
					</h2>
					<div style={styles.featureGrid}>
						{features.map((f) => (
							<div key={f.title} style={styles.featureCard}>
								<div style={styles.featureIcon}>{f.icon}</div>
								<h3 style={styles.featureTitle}>{f.title}</h3>
								<p style={styles.featureDesc}>{f.desc}</p>
							</div>
						))}
					</div>
				</section>

				{/* Stack */}
				<section style={styles.stackSection}>
					<p style={styles.stackLabel}>Built with</p>
					<div style={styles.stackRow}>
						{stack.map((s) => (
							<div key={s} style={styles.stackPill}>
								{s}
							</div>
						))}
					</div>
				</section>

				{/* CTA */}
				<section style={styles.ctaSection}>
					<div style={styles.ctaCard}>
						<div style={styles.ctaGlow} aria-hidden="true" />
						<h2 style={styles.ctaHeading}>
							Ready to organize your stack?
						</h2>
						<p style={styles.ctaSub}>
							Create a free account and start adding resources in
							under a minute.
						</p>
						{isAuthenticated ? (
							<Link to="/overview" style={styles.btnPrimaryLg}>
								Go to Dashboard →
							</Link>
						) : (
							<Link to="/register" style={styles.btnPrimaryLg}>
								Create your hub →
							</Link>
						)}
					</div>
				</section>

				{/* Footer */}
				<footer style={styles.footer}>
					<div style={styles.footerLogo}>
						<div
							style={{
								...styles.logoHex,
								width: "22px",
								height: "22px",
								fontSize: "9px",
							}}
						>
							R4
						</div>
						<span style={{ ...styles.logoText, fontSize: "13px" }}>
							R4 <span style={styles.logoAccent}>Hub</span>
						</span>
					</div>
					<p style={styles.footerText}>
						© {new Date().getFullYear()} Pickaxe & Shovel. All
						rights reserved.
					</p>
					<p style={styles.footerText}>
						<a
							href="https://pickaxe-and-shovel.vercel.app/"
							style={styles.footerLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							pickaxe-and-shovel.vercel.app
						</a>
					</p>
				</footer>
			</div>
		</>
	);
};

const styles = {
	page: {
		minHeight: "100vh",
		background: "#0d0f14",
		color: "#e8eaf0",
		fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
		position: "relative",
		overflowX: "hidden",
	},
	grid: {
		position: "fixed",
		inset: 0,
		backgroundImage: `
			linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px)
		`,
		backgroundSize: "40px 40px",
		pointerEvents: "none",
		zIndex: 0,
	},
	glow: {
		position: "fixed",
		top: "-200px",
		left: "50%",
		transform: "translateX(-50%)",
		width: "600px",
		height: "600px",
		background:
			"radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)",
		pointerEvents: "none",
		zIndex: 0,
	},
	nav: {
		position: "relative",
		zIndex: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "20px 40px",
		borderBottom: "1px solid #1e2330",
	},
	navLogo: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
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
	navLinks: {
		display: "flex",
		alignItems: "center",
		gap: "12px",
	},
	btnGhost: {
		padding: "8px 18px",
		borderRadius: "8px",
		border: "1px solid #2a3044",
		background: "transparent",
		color: "#8b9ab8",
		fontSize: "13px",
		fontWeight: "500",
		textDecoration: "none",
		transition: "all 0.15s",
	},
	btnPrimary: {
		padding: "8px 18px",
		borderRadius: "8px",
		background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
		color: "#fff",
		fontSize: "13px",
		fontWeight: "600",
		textDecoration: "none",
		border: "none",
	},
	hero: {
		position: "relative",
		zIndex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
		padding: "80px 24px 60px",
		maxWidth: "760px",
		margin: "0 auto",
	},
	badge: {
		display: "inline-flex",
		alignItems: "center",
		gap: "8px",
		background: "rgba(108,99,255,0.1)",
		border: "1px solid rgba(108,99,255,0.25)",
		borderRadius: "20px",
		padding: "5px 14px",
		fontSize: "12px",
		color: "#a5a0ff",
		fontWeight: "500",
		marginBottom: "28px",
	},
	badgeDot: {
		width: "6px",
		height: "6px",
		borderRadius: "50%",
		background: "#6c63ff",
		display: "inline-block",
	},
	heroHeading: {
		fontSize: "clamp(36px, 6vw, 64px)",
		fontWeight: "800",
		lineHeight: "1.1",
		color: "#e8eaf0",
		margin: "0 0 20px",
		letterSpacing: "-0.02em",
	},
	heroAccent: {
		background: "linear-gradient(135deg, #6c63ff, #3b82f6)",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		backgroundClip: "text",
	},
	heroSub: {
		fontSize: "16px",
		color: "#8b9ab8",
		lineHeight: "1.6",
		maxWidth: "520px",
		margin: "0 0 36px",
	},
	heroCta: {
		display: "flex",
		gap: "12px",
		marginBottom: "52px",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	btnPrimaryLg: {
		padding: "12px 28px",
		borderRadius: "10px",
		background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
		color: "#fff",
		fontSize: "14px",
		fontWeight: "600",
		textDecoration: "none",
		border: "none",
		display: "inline-block",
	},
	btnGhostLg: {
		padding: "12px 28px",
		borderRadius: "10px",
		border: "1px solid #2a3044",
		background: "transparent",
		color: "#8b9ab8",
		fontSize: "14px",
		fontWeight: "500",
		textDecoration: "none",
		display: "inline-block",
	},
	terminal: {
		width: "100%",
		maxWidth: "520px",
		background: "#0a0c10",
		border: "1px solid #2a3044",
		borderRadius: "12px",
		overflow: "hidden",
		textAlign: "left",
	},
	terminalBar: {
		display: "flex",
		alignItems: "center",
		gap: "6px",
		padding: "10px 16px",
		borderBottom: "1px solid #1e2330",
		background: "#111318",
	},
	dot: {
		width: "10px",
		height: "10px",
		borderRadius: "50%",
		display: "inline-block",
	},
	terminalTitle: {
		fontSize: "11px",
		color: "#3a4260",
		marginLeft: "8px",
		fontFamily: "monospace",
	},
	terminalBody: {
		padding: "16px 20px",
		fontFamily: "monospace",
		fontSize: "13px",
		lineHeight: "1.8",
	},
	terminalLine: {
		display: "flex",
		alignItems: "center",
	},
	prompt: { color: "#6c63ff" },
	cmd: { color: "#e8eaf0" },
	arrow: { color: "#22c55e" },
	item: { color: "#a5a0ff" },
	dimText: { color: "#3a4260" },
	tagText: { color: "#6c63ff" },
	section: {
		position: "relative",
		zIndex: 1,
		maxWidth: "900px",
		margin: "0 auto",
		padding: "80px 24px",
		textAlign: "center",
	},
	sectionEyebrow: {
		fontSize: "12px",
		fontWeight: "600",
		color: "#6c63ff",
		textTransform: "uppercase",
		letterSpacing: "0.08em",
		marginBottom: "12px",
	},
	sectionHeading: {
		fontSize: "clamp(24px, 4vw, 36px)",
		fontWeight: "700",
		color: "#e8eaf0",
		margin: "0 0 48px",
		letterSpacing: "-0.01em",
	},
	featureGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
		gap: "16px",
	},
	featureCard: {
		background: "#161920",
		border: "1px solid #2a3044",
		borderRadius: "12px",
		padding: "24px 20px",
		textAlign: "left",
	},
	featureIcon: {
		fontSize: "24px",
		marginBottom: "12px",
	},
	featureTitle: {
		fontSize: "14px",
		fontWeight: "700",
		color: "#e8eaf0",
		margin: "0 0 8px",
	},
	featureDesc: {
		fontSize: "13px",
		color: "#8b9ab8",
		lineHeight: "1.5",
		margin: 0,
	},
	stackSection: {
		position: "relative",
		zIndex: 1,
		textAlign: "center",
		padding: "0 24px 80px",
	},
	stackLabel: {
		fontSize: "11px",
		color: "#3a4260",
		textTransform: "uppercase",
		letterSpacing: "0.1em",
		marginBottom: "16px",
	},
	stackRow: {
		display: "flex",
		flexWrap: "wrap",
		gap: "10px",
		justifyContent: "center",
	},
	stackPill: {
		padding: "6px 16px",
		borderRadius: "20px",
		background: "#161920",
		border: "1px solid #2a3044",
		fontSize: "12px",
		color: "#5a6a8a",
		fontWeight: "500",
	},
	ctaSection: {
		position: "relative",
		zIndex: 1,
		padding: "0 24px 80px",
		maxWidth: "700px",
		margin: "0 auto",
	},
	ctaCard: {
		background: "#161920",
		border: "1px solid #2a3044",
		borderRadius: "16px",
		padding: "52px 40px",
		textAlign: "center",
		position: "relative",
		overflow: "hidden",
	},
	ctaGlow: {
		position: "absolute",
		top: "-60px",
		left: "50%",
		transform: "translateX(-50%)",
		width: "300px",
		height: "200px",
		background:
			"radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)",
		pointerEvents: "none",
	},
	ctaHeading: {
		fontSize: "clamp(22px, 4vw, 32px)",
		fontWeight: "700",
		color: "#e8eaf0",
		margin: "0 0 12px",
		position: "relative",
	},
	ctaSub: {
		fontSize: "14px",
		color: "#8b9ab8",
		margin: "0 0 28px",
		position: "relative",
	},
	footer: {
		position: "relative",
		zIndex: 1,
		borderTop: "1px solid #1e2330",
		padding: "28px 40px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexWrap: "wrap",
		gap: "12px",
	},
	footerLogo: {
		display: "flex",
		alignItems: "center",
		gap: "8px",
	},
	footerText: {
		fontSize: "12px",
		color: "#3a4260",
		margin: 0,
	},
	footerLink: {
		color: "#5a6a8a",
		textDecoration: "none",
	},
};

export default Home;
