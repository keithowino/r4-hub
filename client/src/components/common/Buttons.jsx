import { Link } from "react-router-dom";
import { useCommon } from "../../lib/context/CommonContext";

export const RedirectToDashboard = () => {
	const { styles } = useCommon();

	return (
		<Link
			to="/overview"
			style={{ textDecoration: "none" }}
			className="py-2 px-[18px] bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold border-none rounded-lg"
		>
			Go to Dashboard →
		</Link>
	);
};
