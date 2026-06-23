import React from "react";
import SEO from "../components/common/SEO";

const MetaDataInsert = ({
	title,
	description,
	keywords,
	image,
	url,
	type,
	noIndex,
}) => {
	return (
		<SEO
			title={title}
			description={description}
			keywords={keywords}
			image={image}
			url={url}
			type={type}
			noIndex={noIndex}
		/>
	);
};

export default MetaDataInsert;
