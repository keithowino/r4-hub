import { useState } from "react";

export const RIcon = ({ c, md = "9", imgd = "3", resource }) => {
	const [imgErr, setImgErr] = useState(false);

	return (
		<div
			// className={`w-${md} h-${md} rounded-xl flex items-center justify-center flex-shrink-0`}
			className={`${imgErr ? `flex items-center justify-center flex-shrink-0` : ""} w-${md} h-${md} rounded-xl`}
			style={{
				background: `${imgErr && c.bg}`,
				border: `${imgErr && `1px solid ${c.border}`}`,
			}}
		>
			{/* Try to show favicon first, fallback to emoji, then initials */}
			{resource.favicon && !imgErr ? (
				<img
					src={resource.favicon}
					alt=""
					className={`w-${imgd} h-${imgd} object-contain`}
					// className={`w-${md} h-${md} object-contain`}
					onError={() => setImgErr(true)}
				/>
			) : resource.icon ? (
				<span className="text-xl">{resource.icon}</span>
			) : (
				<span className="text-sm font-bold" style={{ color: c.text }}>
					{resource.title?.slice(0, 2).toUpperCase() || "??"}
				</span>
			)}
		</div>
	);
};
