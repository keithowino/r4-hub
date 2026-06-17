import React from "react";
import { Search, Command } from "lucide-react";

const SearchBar = ({
	value,
	onChange,
	placeholder = "Search resources, tools, docs...",
}) => {
	return (
		<div className="relative">
			<Search
				className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
				size={20}
			/>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full pl-12 pr-16 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500"
			/>
			<div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500">
				<Command size={14} />
				<span>K</span>
			</div>
		</div>
	);
};

export default SearchBar;
