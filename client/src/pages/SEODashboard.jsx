const SEODashboard = () => {
	const seoData = {
		pagesIndexed: 0,
		impressions: 0,
		clicks: 0,
		avgPosition: 0,
		ctr: 0,
	};

	// Fetch from Google Search Console API
	// Display metrics in a dashboard widget

	return (
		<div className="grid grid-cols-4 gap-4">
			<div className="stat-card">
				<h4>Pages Indexed</h4>
				<span>{seoData.pagesIndexed}</span>
			</div>
			{/* ... more stats */}
		</div>
	);
};

export default SEODashboard;
