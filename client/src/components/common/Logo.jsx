const Logo = ({ gap = "1", fontsize = "lg", logoIcon }) => {
	return (
		<div className={`flex gap-${gap} items-center`}>
			<div
				style={logoIcon}
				className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white"
			>
				R4
			</div>
			<span className={`font-bold text-${fontsize} text-[#e8eaf0]`}>
				R4{" "}
				<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
					Hub
				</span>
			</span>
		</div>
	);
};

export default Logo;
