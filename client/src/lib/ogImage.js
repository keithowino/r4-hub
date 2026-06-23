// Helper for generating Open Graph image URLs
export const getOGImage = (
	title,
	subtitle = "Developer Resource Management",
) => {
	const encodedTitle = encodeURIComponent(title);
	const encodedSubtitle = encodeURIComponent(subtitle);
	return `https://og-image.vercel.app/api?title=${encodedTitle}&subtitle=${encodedSubtitle}&theme=dark&border=purple`;
};
