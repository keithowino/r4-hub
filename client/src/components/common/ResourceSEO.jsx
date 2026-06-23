import React from "react";
import SEO from "./SEO";

const ResourceSEO = ({ resource }) => {
	if (!resource) return null;

	const title = `${resource.title} - R4 Hub Developer Resource`;
	const description =
		resource.notes ||
		resource.description ||
		`Save and organize ${resource.title} - a ${resource.category} resource for developers on R4 Hub.`;

	const tags = resource.tags || [];
	const keywords = [
		resource.category,
		...tags,
		"developer tools",
		"dev resources",
		"R4 Hub",
	].join(", ");

	const url = `https://r4-hub.vercel.app/resource/${resource._id || resource.id}`;

	return (
		<SEO
			title={title}
			description={description}
			keywords={keywords}
			url={url}
			type="article"
			publishedTime={resource.createdAt}
			modifiedTime={resource.updatedAt}
			tags={tags}
		/>
	);
};

export default ResourceSEO;
