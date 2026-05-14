import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [categories, setCategories] = useState([
		"LLM",
		"AI Agent",
		"Backend",
		"Hosting",
		"Frontend",
		"Database",
		"Other",
	]);

	const colors = {
		LLM: "bg-purple-100 text-purple-800",
		"AI Agent": "bg-pink-100 text-pink-800",
		Backend: "bg-green-100 text-green-800",
		Hosting: "bg-blue-100 text-blue-800",
		Frontend: "bg-yellow-100 text-yellow-800",
		Database: "bg-red-100 text-red-800",
		Other: "bg-gray-100 text-gray-800",
	};

	const addCategory = (newCategory) => {
		if (!categories.includes(newCategory)) {
			setCategories([...categories, newCategory]);
		}
	};

	const dataContextFeatures = {
		categories,
		colors,
		addCategory,
	};

	return (
		<DataContext.Provider value={dataContextFeatures}>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
};
