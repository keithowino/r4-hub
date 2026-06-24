import React from "react";
import { Helmet } from "react-helmet-async";
import data from "../../lib/data";
import { getOGImage } from "../../lib/ogImage";

const SEO = ({
	title = "R4 Hub - Developer Resource Management Platform",
	description = "Organize, save, search, and quickly access all your developer tools, AI platforms, documentation, and learning resources in one centralized hub.",
	keywords = "developer tools, resource management, AI tools, dev resources, bookmark manager, developer dashboard, coding tools, tech stack, developer productivity",
	image,
	url = "https://r4-hub.vercel.app",
	type = "website",
	siteName = "R4 Hub",
	author = "Keith Owino",
	publishedTime,
	modifiedTime,
	tags = [],
	noIndex = false,
	children,
}) => {
	const { metadata, social } = data;

	const canonicalUrl =
		url ||
		(typeof window !== "undefined"
			? window.location.href
			: metadata.liveLink);

	// ✅ Generate OG image - use provided image or generate one from title
	const ogImage = image || getOGImage(title);

	// ✅ Use ogImage for the image URL
	const imageUrl = ogImage.startsWith("http")
		? ogImage
		: `https://r4-hub.vercel.app${ogImage}`;

	// Generate JSON-LD structured data
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: siteName,
		description: description,
		url: canonicalUrl,
		author: {
			"@type": "Person",
			name: author,
		},
		applicationCategory: "DeveloperApplication",
		operatingSystem: "All",
		browserRequirements: "Requires modern browser",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		...(publishedTime && {
			datePublished: publishedTime,
		}),
		...(modifiedTime && {
			dateModified: modifiedTime,
		}),
	};

	// Generate breadcrumb structured data
	const breadcrumbData = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: "https://r4-hub.vercel.app",
			},
		],
	};

	// Add page-specific breadcrumb items if available
	const pathSegments = url
		.replace("https://r4-hub.vercel.app", "")
		.split("/")
		.filter(Boolean);
	if (pathSegments.length > 0) {
		pathSegments.forEach((segment, index) => {
			const position = index + 2;
			const displayName =
				segment.charAt(0).toUpperCase() + segment.slice(1);
			breadcrumbData.itemListElement.push({
				"@type": "ListItem",
				position,
				name: displayName,
				item: `https://r4-hub.vercel.app/${segment}`,
			});
		});
	}

	// Generate article structured data if applicable
	const articleData =
		type === "article"
			? {
					"@context": "https://schema.org",
					"@type": "Article",
					headline: title,
					description: description,
					author: {
						"@type": "Person",
						name: author,
					},
					publisher: {
						"@type": "Organization",
						name: siteName,
					},
					...(publishedTime && { datePublished: publishedTime }),
					...(modifiedTime && { dateModified: modifiedTime }),
					image: imageUrl,
					mainEntityOfPage: canonicalUrl,
				}
			: null;

	// Generate FAQ structured data if tags are provided
	const faqData =
		tags.length > 0
			? {
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: tags.slice(0, 5).map((tag) => ({
						"@type": "Question",
						name: `What resources are available in the ${tag} category?`,
						acceptedAnswer: {
							"@type": "Answer",
							text: `Find and organize ${tag} related developer tools, documentation, and resources on R4 Hub.`,
						},
					})),
				}
			: null;

	// Determine page title
	let pageTitle;
	if (!title || title === metadata.name) {
		pageTitle = `${metadata.name} - ${metadata.slug}`;
	} else {
		pageTitle = `${title} - ${metadata.name}`;
	}

	const metaDescription = description || metadata.description;
	const metaKeywords = keywords || metadata.keywords;
	const metaAuthor = author || metadata.author;

	return (
		<Helmet>
			{/* Primary Meta Tags */}
			<title>{pageTitle}</title>
			<meta name="title" content={pageTitle} />
			<meta name="description" content={metaDescription} />
			<meta name="keywords" content={metaKeywords} />
			<meta name="author" content={metaAuthor} />
			<meta
				name="robots"
				content={noIndex ? "noindex, nofollow" : "index, follow"}
			/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<link rel="canonical" href={canonicalUrl} />
			{/* Open Graph / Facebook */}
			<meta property="og:type" content={type} />
			<meta property="og:url" content={canonicalUrl} />
			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:image" content={imageUrl} />{" "}
			{/* ✅ Using imageUrl */}
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:site_name" content={siteName} />
			<meta property="og:locale" content="en_US" />
			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:url" content={canonicalUrl} />
			<meta name="twitter:title" content={pageTitle} />
			<meta name="twitter:description" content={metaDescription} />
			<meta name="twitter:image" content={imageUrl} />{" "}
			{/* ✅ Using imageUrl */}
			<meta name="twitter:creator" content={social.twitterHandle} />
			<meta name="twitter:site" content={social.twitterHandle} />
			{/* Additional Meta Tags */}
			<meta name="application-name" content={siteName} />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta
				name="apple-mobile-web-app-status-bar-style"
				content="black-translucent"
			/>
			<meta name="apple-mobile-web-app-title" content={siteName} />
			<meta name="mobile-web-app-capable" content="yes" />
			<meta name="theme-color" content="#0d0f14" />
			<meta name="msapplication-TileColor" content="#0d0f14" />
			<meta name="msapplication-TileImage" content="/favicon-96x96.png" />
			{/* Structured Data - JSON-LD */}
			<script type="application/ld+json">
				{JSON.stringify(structuredData)}
			</script>
			<script type="application/ld+json">
				{JSON.stringify(breadcrumbData)}
			</script>
			{articleData && (
				<script type="application/ld+json">
					{JSON.stringify(articleData)}
				</script>
			)}
			{faqData && (
				<script type="application/ld+json">
					{JSON.stringify(faqData)}
				</script>
			)}
			{/* PWA / Web App Meta Tags */}
			<link rel="manifest" href="/manifest.json" />
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon-16x16.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/apple-touch-icon.png"
			/>
			{/* DNS Prefetch for Performance */}
			<link rel="dns-prefetch" href="//api.r4-hub.vercel.app" />
			<link rel="dns-prefetch" href="//fonts.googleapis.com" />
			{children}
		</Helmet>
	);
};

export default SEO;
