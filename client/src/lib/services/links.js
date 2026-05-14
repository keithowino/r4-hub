import { v4 as uuidv4 } from "uuid";
// NB: Hooks should not be imported into service files.

const STORAGE_KEY = "dev_resources";

export const getLinks = () => {
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) return JSON.parse(stored);

	// Sample data to get you started
	const sampleLinks = [
		// {
		// 	id: uuidv4(),
		// 	title: "DeepSeek Chat",
		// 	url: "https://chat.deepseek.com",
		// 	category: "LLM",
		// 	tags: ["llm", "chat", "free"],
		// 	notes: "Great for coding and reasoning",
		// 	createdAt: new Date().toISOString(),
		// 	favicon: "https://chat.deepseek.com/favicon.ico",
		// },
		// {
		// 	id: uuidv4(),
		// 	title: "ChatGPT",
		// 	url: "https://chat.openai.com",
		// 	category: "LLM",
		// 	tags: ["llm", "chat", "gpt4"],
		// 	notes: "OpenAI flagship model",
		// 	createdAt: new Date().toISOString(),
		// },
		{
			id: uuidv4(),
			title: "Firebase Console",
			url: "https://console.firebase.google.com",
			category: "Backend",
			subcategory: "Database",
			tags: ["firebase", "auth", "hosting"],
			notes: "Useful for auth and Firestore",
			favorite: true,
			lastVisited: null,
			visitCount: 0,
			status: "active",
			favicon: "",
			createdAt: new Date().toISOString(),
		},
		// {
		// 	id: uuidv4(),
		// 	title: "Vercel",
		// 	url: "https://vercel.com",
		// 	category: "Hosting",
		// 	tags: ["deploy", "frontend", "serverless"],
		// 	notes: "Deploy frontend apps instantly",
		// 	createdAt: new Date().toISOString(),
		// },
	];

	localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleLinks));
	return sampleLinks;
};

export const saveLinks = (links) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
};

// export const addLink = (linkData) => {
// 	const links = getLinks();
// 	const newLink = {
// 		id: uuidv4(),
// 		...linkData,
// 		createdAt: new Date().toISOString(),
// 	};
// 	// links.push(newLink);
// 	links.unshift();
// 	saveLinks(links);
// 	return newLink;
// };

export const addLink = (linkData) => {
	const links = getLinks();
	const domain = new URL(linkData.url).origin;

	const newLink = {
		id: uuidv4(),
		title: linkData.title,
		url: linkData.url,
		category: linkData.category,
		subcategory: "",
		tags: linkData.tags || [],
		notes: linkData.notes || "",
		favorite: false,
		visitCount: 0,
		lastVisited: null,
		status: "active",
		favicon: `${domain}/favicon.ico`,
		createdAt: new Date().toISOString(),
	};

	links.push(newLink);
	saveLinks(links);
	return newLink;
};

export const updateLink = (id, updatedData) => {
	const links = getLinks();
	const index = links.findIndex((link) => link.id === id);
	if (index !== -1) {
		links[index] = { ...links[index], ...updatedData };
		saveLinks(links);
		return links[index];
	}
	return null;
};

export const deleteLink = (id) => {
	const links = getLinks();
	const filtered = links.filter((link) => link.id !== id);
	saveLinks(filtered);
	return filtered;
};

export const toggleFavorite = (id) => {
	const links = getLinks();
	const updated = links.map((link) =>
		link.id === id ? { ...link, favorite: !link.favorite } : link,
	);

	saveLinks(updated);
	return updated;
};

export const incrementVisit = (id) => {
	const links = getLinks();
	const updated = links.map((link) =>
		link.id === id
			? {
					...link,
					visitCount: (link.visitCount || 0) + 1,
					lastVisited: new Date().toISOString(),
				}
			: link,
	);

	saveLinks(updated);
	return updated;
};
