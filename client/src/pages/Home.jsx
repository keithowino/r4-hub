import { Link } from "react-router-dom";
import { useAuth } from "../lib/context/AuthContext.jsx";
import MetaDataInsert from "../lib/MetaDataInsert.jsx";
import data from "../lib/data.js";
import HomeNav from "../components/home/Navbar.jsx";
import HomeFooter from "../components/home/Footer.jsx";
import { useCommon } from "../lib/context/CommonContext.jsx";
import { RedirectToDashboard } from "../components/common/Buttons.jsx";

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
	const { styles } = useCommon();

	return (
		<>
			<MetaDataInsert title={data.metadata.name} />

			<section>
				{/* Grid background */}
				<div style={styles.grid} aria-hidden="true" />

				{/* Glow */}
				<div style={styles.glow} aria-hidden="true" />

				<HomeNav />

				<div className="container mx-auto">
					<section className="relative z-[1] flex flex-col items-center text-center pt-20 px-6 pb-[60px] max-w-3xl my-0 mx-auto">
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
							Stop hunting through browser tabs and bookmarks. R4
							Hub keeps every API, LLM, platform, and tool
							organized, searchable, and a single click away.
						</p>

						<div style={styles.heroCta}>
							{isAuthenticated ? (
								<RedirectToDashboard />
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
									style={{
										...styles.dot,
										background: "#ef4444",
									}}
								/>
								<span
									style={{
										...styles.dot,
										background: "#f59e0b",
									}}
								/>
								<span
									style={{
										...styles.dot,
										background: "#22c55e",
									}}
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

					<section style={styles.section}>
						<p style={styles.sectionEyebrow}>
							What {data.metadata.name} does
						</p>
						<h2 style={styles.sectionHeading}>
							Built around how developers actually work
						</h2>
						<div style={styles.featureGrid}>
							{features.map((f) => (
								<div key={f.title} style={styles.featureCard}>
									<div style={styles.featureIcon}>
										{f.icon}
									</div>
									<h3 style={styles.featureTitle}>
										{f.title}
									</h3>
									<p style={styles.featureDesc}>{f.desc}</p>
								</div>
							))}
						</div>
					</section>

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

					<section style={styles.ctaSection}>
						<div style={styles.ctaCard}>
							<div style={styles.ctaGlow} aria-hidden="true" />
							<h2 style={styles.ctaHeading}>
								Ready to organize your stack?
							</h2>
							<p style={styles.ctaSub}>
								Create a free account and start adding resources
								in under a minute.
							</p>
							{isAuthenticated ? (
								<RedirectToDashboard />
							) : (
								<Link
									to="/register"
									style={styles.btnPrimaryLg}
								>
									Create your hub →
								</Link>
							)}
						</div>
					</section>
				</div>

				<HomeFooter />
			</section>
		</>
	);
};

export default Home;
