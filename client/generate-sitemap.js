import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = "https://r4-hub.vercel.app";

const staticRoutes = [
	"",
	"/login",
	"/register",
	"/overview",
	"/overview/favorites",
	"/overview/categories",
	"/overview/resources",
	"/overview/ai-tools",
	"/overview/platforms",
	"/overview/cloud",
	"/overview/dev-tools",
];

// Generate sitemap XML
const generateSitemap = () => {
	const urls = staticRoutes.map((route) => ({
		url: `${baseUrl}${route}`,
		changefreq: route === "" ? "daily" : "weekly",
		priority: route === "" ? "1.0" : "0.8",
		lastmod: new Date().toISOString().split("T")[0],
	}));

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		({ url, changefreq, priority, lastmod }) => `
  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`,
	)
	.join("")}
</urlset>`;

	fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemap);
	console.log("✅ Sitemap generated successfully!");
};

generateSitemap();
