/**
 * Generate Open Graph image URL
 * @param {string} title - The page title
 * @param {string} subtitle - Optional subtitle
 * @param {string} type - Resource type (resource, category, etc.)
 * @returns {string} OG image URL
 */
export const getOGImage = (
	title,
	subtitle = "Developer Resource Management",
	type = "resource",
) => {
	// Using Vercel's OG image service
	const baseUrl = "https://og-image.vercel.app";

	// Create the image content
	const content = {
		title: title,
		subtitle: subtitle,
		type: type,
	};

	// For Vercel OG image (simple version)
	const encodedTitle = encodeURIComponent(content.title);
	const encodedSubtitle = encodeURIComponent(content.subtitle);

	return `${baseUrl}/api/og?title=${encodedTitle}&subtitle=${encodedSubtitle}&theme=dark&border=purple&images=https%3A%2F%2Fr4-hub.vercel.app%2Flogo.png`;
};

/**
 * Get fallback OG image
 */
export const getDefaultOGImage = () => {
	return "https://r4-hub.vercel.app/og-image.png";
};
