/**
 * Analytics Service - Google Analytics 4
 * Tracks user behavior, page views, and custom events
 */

// Check if GA is loaded
const isGALoaded = () => {
	return typeof window !== "undefined" && typeof window.gtag === "function";
};

/**
 * Track a page view
 * @param {string} url - The page URL
 * @param {string} title - The page title
 */
export const trackPageView = (url, title) => {
	if (!isGALoaded()) return;

	window.gtag("config", "G-M507DHQXRK", {
		page_path: url,
		page_title: title,
	});
};

/**
 * Track a custom event
 * @param {string} action - The event action (e.g., 'click', 'submit')
 * @param {string} category - The event category (e.g., 'resource', 'auth')
 * @param {string} label - The event label (e.g., 'add_resource', 'login')
 * @param {*} value - Optional numeric value
 */
export const trackEvent = (action, category, label, value) => {
	if (!isGALoaded()) return;

	window.gtag("event", action, {
		event_category: category,
		event_label: label,
		value: value,
	});
};

/**
 * Track user login
 */
export const trackLogin = (method = "email") => {
	trackEvent("login", "authentication", `login_${method}`);
};

/**
 * Track user registration
 */
export const trackRegistration = (method = "email") => {
	trackEvent("sign_up", "authentication", `register_${method}`);
};

/**
 * Track resource creation
 * @param {string} category - The resource category
 * @param {number} tagCount - Number of tags added
 */
export const trackResourceCreated = (category, tagCount = 0) => {
	trackEvent("create_resource", "resource", category, tagCount);
};

/**
 * Track resource deletion
 * @param {string} category - The resource category
 */
export const trackResourceDeleted = (category) => {
	trackEvent("delete_resource", "resource", category);
};

/**
 * Track resource favorite toggle
 * @param {string} category - The resource category
 * @param {boolean} isFavorite - Whether it was favorited or unfavorited
 */
export const trackFavoriteToggle = (category, isFavorite) => {
	const action = isFavorite ? "favorite_resource" : "unfavorite_resource";
	trackEvent(action, "resource", category);
};

/**
 * Track search query
 * @param {string} query - The search query
 * @param {number} results - Number of results found
 */
export const trackSearch = (query, results = 0) => {
	trackEvent("search", "search", query, results);
};

/**
 * Track resource visit
 * @param {string} title - The resource title
 * @param {string} category - The resource category
 */
export const trackResourceVisit = (title, category) => {
	trackEvent("visit_resource", "resource", `${category}: ${title}`);
};

/**
 * Track error
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 */
export const trackError = (errorType, errorMessage) => {
	trackEvent("error", "errors", errorType, errorMessage);
};

/**
 * Track performance metric
 * @param {string} metricName - Name of the metric
 * @param {number} value - Metric value in milliseconds
 */
export const trackPerformance = (metricName, value) => {
	trackEvent("performance", "performance", metricName, value);
};

/**
 * Initialize analytics with user ID (for user tracking)
 * @param {string} userId - The user's ID
 */
export const setUserId = (userId) => {
	if (!isGALoaded()) return;
	window.gtag("config", "G-M507DHQXRK", {
		user_id: userId,
	});
};
