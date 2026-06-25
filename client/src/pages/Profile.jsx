import { useState } from "react";
import { useAuth } from "../lib/context/AuthContext.jsx";
import { useResources } from "../hooks/useResources.js";
import { useNavigate, useLocation } from "react-router-dom";
import MetaDataInsert from "../lib/MetaDataInsert.jsx";
import {
	UserIcon,
	MailIcon,
	ShieldIcon,
	SaveIcon,
	KeyIcon,
	DatabaseIcon,
	StarIcon,
	TagIcon,
	FolderIcon,
	CalendarIcon,
	EyeIcon,
	CheckIcon,
	AlertCircleIcon,
	ArrowLeft,
} from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// ─── Stat card ────────────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, color }) => (
	<div
		className="flex flex-col gap-2 p-4 rounded-2xl border"
		style={{
			background: "rgba(22,25,32,0.9)",
			borderColor: "rgba(255,255,255,0.06)",
		}}
	>
		<div
			className="w-9 h-9 rounded-xl flex items-center justify-center"
			style={{ background: `${color}18`, border: `1px solid ${color}30` }}
		>
			<Icon size={16} style={{ color }} />
		</div>
		<div className="text-2xl font-bold text-white">{value}</div>
		<div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
			{label}
		</div>
	</div>
);

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section = ({ title, subtitle, children }) => (
	<motion.div
		initial={{ opacity: 0, y: 12 }}
		animate={{ opacity: 1, y: 0 }}
		className="rounded-2xl border p-6"
		style={{
			background: "rgba(22,25,32,0.9)",
			borderColor: "rgba(255,255,255,0.06)",
		}}
	>
		<div className="mb-5">
			<h2 className="text-base font-semibold text-white">{title}</h2>
			{subtitle && (
				<p
					className="text-xs mt-0.5"
					style={{ color: "rgba(255,255,255,0.35)" }}
				>
					{subtitle}
				</p>
			)}
		</div>
		{children}
	</motion.div>
);

// ─── Input ────────────────────────────────────────────────────────────────────

const Field = ({ label, icon: Icon, children }) => (
	<div className="flex flex-col gap-1.5">
		<label
			className="text-xs font-medium"
			style={{ color: "rgba(255,255,255,0.45)" }}
		>
			{label}
		</label>
		<div className="relative">
			{Icon && (
				<Icon
					size={15}
					className="absolute left-3 top-1/2 -translate-y-1/2"
					style={{ color: "rgba(255,255,255,0.25)" }}
				/>
			)}
			{children}
		</div>
	</div>
);

const Input = ({ icon, ...props }) => (
	<input
		{...props}
		className={`w-full py-2.5 pr-4 rounded-xl border text-sm text-white outline-none transition-all ${
			icon ? "pl-9" : "pl-3.5"
		}`}
		style={{
			background: "rgba(255,255,255,0.04)",
			borderColor: "rgba(255,255,255,0.08)",
		}}
		onFocus={(e) => {
			e.target.style.borderColor = "#6c63ff";
			e.target.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.15)";
		}}
		onBlur={(e) => {
			e.target.style.borderColor = "rgba(255,255,255,0.08)";
			e.target.style.boxShadow = "none";
		}}
	/>
);

// ─── Profile page ─────────────────────────────────────────────────────────────

const Profile = () => {
	const { user, updateMe, changePassword } = useAuth();
	const { resources = [] } = useResources();
	const navigate = useNavigate();
	const location = useLocation();

	const goBack = () => {
		if (location.state?.from) {
			navigate(location.state.from);
		} else {
			navigate(-1); // Fallback to browser history
		}
	};

	const [profileForm, setProfileForm] = useState({
		name: user?.name || "",
		email: user?.email || "",
	});
	const [passwordForm, setPasswordForm] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [savingProfile, setSavingProfile] = useState(false);
	const [savingPassword, setSavingPassword] = useState(false);
	const [passwordError, setPasswordError] = useState("");

	// Derived stats from real resource data
	const stats = {
		total: resources.length,
		favorites: resources.filter((r) => r.favorite).length,
		categories: new Set(resources.map((r) => r.category)).size,
		tags: new Set(resources.flatMap((r) => r.tags || [])).size,
		totalVisits: resources.reduce((acc, r) => acc + (r.visitCount || 0), 0),
	};

	const topResources = [...resources]
		.sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0))
		.slice(0, 5);

	const memberSince = user?.createdAt
		? new Date(user.createdAt).toLocaleDateString("en-US", {
				month: "long",
				year: "numeric",
			})
		: "—";

	const initials = user?.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.slice(0, 2)
				.join("")
				.toUpperCase()
		: "?";

	const handleProfileSave = async (e) => {
		e.preventDefault();
		setSavingProfile(true);
		try {
			await updateMe({ name: profileForm.name });
			toast.success("Profile updated");
		} catch {
			toast.error("Failed to update profile");
		} finally {
			setSavingProfile(false);
		}
	};

	const handlePasswordSave = async (e) => {
		e.preventDefault();
		setPasswordError("");

		if (passwordForm.newPassword !== passwordForm.confirmPassword) {
			setPasswordError("New passwords do not match");
			return;
		}
		if (passwordForm.newPassword.length < 6) {
			setPasswordError("New password must be at least 6 characters");
			return;
		}

		setSavingPassword(true);
		try {
			await changePassword({
				currentPassword: passwordForm.currentPassword,
				newPassword: passwordForm.newPassword,
			});
			toast.success("Password updated");
			setPasswordForm({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
		} catch {
			toast.error("Current password is incorrect");
		} finally {
			setSavingPassword(false);
		}
	};

	return (
		<>
			<MetaDataInsert
				title={`${user?.name ? user.name.split(" ")[0] + "'s" : "User"} Profile`}
				description="Start organizing your developer resources today."
				noIndex={true}
			/>

			<div className="max-w-5xl mx-auto px-4 py-6 md:py-10 space-y-6">
				{/* Back Button */}
				<button
					onClick={goBack}
					className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 group"
				>
					<ArrowLeft
						size={18}
						className="group-hover:-translate-x-0.5 transition"
					/>
					<span className="text-sm">Back</span>
				</button>
				{/* ── Hero card ── */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					className="relative rounded-3xl border overflow-hidden mb-8"
					style={{
						background: "rgba(22,25,32,0.95)",
						borderColor: "rgba(255,255,255,0.06)",
					}}
				>
					{/* Banner */}
					<div
						className="h-28 md:h-32"
						style={{
							background:
								"linear-gradient(135deg, rgba(108,99,255,0.4) 0%, rgba(59,130,246,0.3) 50%, rgba(168,85,247,0.3) 100%)",
						}}
					/>

					<div className="px-6 pb-6">
						{/* Avatar */}
						<div className="-mt-12 md:-mt-16 mb-6 flex flex-col sm:flex-row sm:items-end gap-4">
							<div
								className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-white border-4 border-[#0d0f14]"
								style={{
									background:
										"linear-gradient(135deg, #6c63ff, #3b82f6)",
								}}
							>
								{initials}
							</div>
							<div className="flex-1">
								<h1 className="text-2xl font-bold text-white">
									{user?.name}
								</h1>
								<p className="text-gray-400">{user?.email}</p>
							</div>
						</div>

						<div className="flex flex-wrap gap-4 items-center justify-between">
							<div className="flex flex-wrap gap-4">
								<div
									className="flex items-center gap-1.5 text-xs"
									style={{ color: "rgba(255,255,255,0.35)" }}
								>
									<CalendarIcon size={12} />
									Member since {memberSince}
								</div>
								<div
									className="flex items-center gap-1.5 text-xs"
									style={{ color: "rgba(255,255,255,0.35)" }}
								>
									<EyeIcon size={12} />
									{stats.totalVisits} total visits
								</div>
								<div
									className="flex items-center gap-1.5 text-xs"
									style={{ color: "rgba(255,255,255,0.35)" }}
								>
									<ShieldIcon size={12} />
									{user?.role || "user"}
								</div>
							</div>
							<div
								className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
								style={{
									background: "rgba(34,197,94,0.12)",
									color: "#22c55e",
									border: "1px solid rgba(34,197,94,0.25)",
								}}
							>
								<span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
								Active
							</div>
						</div>
					</div>
				</motion.div>

				{/* ── Stats row ── */}
				{/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3"> */}
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
					<StatCard
						icon={DatabaseIcon}
						label="Resources"
						value={stats.total}
						color="#6c63ff"
					/>
					<StatCard
						icon={StarIcon}
						label="Favorites"
						value={stats.favorites}
						color="#f59e0b"
					/>
					<StatCard
						icon={FolderIcon}
						label="Categories"
						value={stats.categories}
						color="#a855f7"
					/>
					<StatCard
						icon={TagIcon}
						label="Tags"
						value={stats.tags}
						color="#14b8a6"
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* ── Edit profile ── */}
					<Section
						title="Profile Details"
						subtitle="Update your display name and account info."
					>
						<form
							onSubmit={handleProfileSave}
							className="space-y-4"
						>
							<Field label="Full Name" icon={UserIcon}>
								<Input
									icon
									type="text"
									value={profileForm.name}
									onChange={(e) =>
										setProfileForm({
											...profileForm,
											name: e.target.value,
										})
									}
									placeholder="Your name"
									required
								/>
							</Field>

							<Field label="Email Address" icon={MailIcon}>
								<Input
									icon
									type="email"
									value={profileForm.email}
									disabled
									style={{
										background: "rgba(255,255,255,0.02)",
										borderColor: "rgba(255,255,255,0.05)",
										color: "rgba(255,255,255,0.3)",
										paddingLeft: "2.25rem",
									}}
								/>
								<p
									className="text-[10px] mt-1"
									style={{ color: "rgba(255,255,255,0.25)" }}
								>
									Email cannot be changed
								</p>
							</Field>

							<button
								type="submit"
								disabled={savingProfile}
								className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-60"
								style={{
									background:
										"linear-gradient(135deg, #6c63ff, #4f46e5)",
								}}
							>
								{savingProfile ? (
									<>
										<div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										Saving...
									</>
								) : (
									<>
										<SaveIcon size={14} />
										Save Changes
									</>
								)}
							</button>
						</form>
					</Section>

					{/* ── Change password ── */}
					<Section
						title="Change Password"
						subtitle="Use a strong password at least 6 characters long."
					>
						<form
							onSubmit={handlePasswordSave}
							className="space-y-4"
						>
							<Field label="Current Password" icon={KeyIcon}>
								<Input
									icon
									type="password"
									value={passwordForm.currentPassword}
									onChange={(e) =>
										setPasswordForm({
											...passwordForm,
											currentPassword: e.target.value,
										})
									}
									placeholder="••••••••"
									required
								/>
							</Field>

							<Field label="New Password" icon={ShieldIcon}>
								<Input
									icon
									type="password"
									value={passwordForm.newPassword}
									onChange={(e) => {
										setPasswordError("");
										setPasswordForm({
											...passwordForm,
											newPassword: e.target.value,
										});
									}}
									placeholder="••••••••"
									required
								/>
							</Field>

							<Field
								label="Confirm New Password"
								icon={ShieldIcon}
							>
								<Input
									icon
									type="password"
									value={passwordForm.confirmPassword}
									onChange={(e) => {
										setPasswordError("");
										setPasswordForm({
											...passwordForm,
											confirmPassword: e.target.value,
										});
									}}
									placeholder="••••••••"
									required
								/>
							</Field>

							{passwordError && (
								<div
									className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
									style={{
										background: "rgba(239,68,68,0.1)",
										border: "1px solid rgba(239,68,68,0.25)",
										color: "#f87171",
									}}
								>
									<AlertCircleIcon size={13} />
									{passwordError}
								</div>
							)}

							<button
								type="submit"
								disabled={savingPassword}
								className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-60"
								style={{
									background:
										"linear-gradient(135deg, #6c63ff, #4f46e5)",
								}}
							>
								{savingPassword ? (
									<>
										<div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										Updating...
									</>
								) : (
									<>
										<CheckIcon size={14} />
										Update Password
									</>
								)}
							</button>
						</form>
					</Section>
				</div>

				{/* ── Top resources ── */}
				{topResources.length > 0 && (
					<Section
						title="Most Visited Resources"
						subtitle="Your most accessed links across all sessions."
					>
						{/* <div className="space-y-2"> */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							{topResources.map((r, i) => (
								<div
									key={r._id}
									className="flex items-center gap-3 p-3 rounded-xl transition-colors"
									style={{
										background: "rgba(255,255,255,0.03)",
									}}
								>
									<span
										className="text-xs font-bold w-5 text-center flex-shrink-0"
										style={{
											color: "rgba(255,255,255,0.2)",
										}}
									>
										{i + 1}
									</span>
									{r.favicon ? (
										<img
											src={r.favicon}
											alt=""
											className="w-5 h-5 object-contain flex-shrink-0"
											onError={(e) =>
												(e.target.style.display =
													"none")
											}
										/>
									) : (
										<div
											className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold flex-shrink-0"
											style={{
												background:
													"rgba(108,99,255,0.2)",
												color: "#6c63ff",
											}}
										>
											{r.title?.slice(0, 2).toUpperCase()}
										</div>
									)}
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-white truncate">
											{r.title}
										</p>
										<p
											className="text-[10px] truncate"
											style={{
												color: "rgba(255,255,255,0.3)",
											}}
										>
											{r.url}
										</p>
									</div>
									<div
										className="flex items-center gap-1 text-xs flex-shrink-0"
										style={{
											color: "rgba(255,255,255,0.3)",
										}}
									>
										<EyeIcon size={11} />
										{r.visitCount || 0}
									</div>
								</div>
							))}
						</div>
					</Section>
				)}

				{/* ── Danger zone ── */}
				<Section
					title="Danger Zone"
					subtitle="Irreversible account actions."
				>
					<div
						className="flex items-center justify-between p-4 rounded-xl border"
						style={{
							background: "rgba(239,68,68,0.05)",
							borderColor: "rgba(239,68,68,0.15)",
						}}
					>
						<div>
							<p className="text-sm font-medium text-white">
								Delete Account
							</p>
							<p
								className="text-xs mt-0.5"
								style={{ color: "rgba(255,255,255,0.35)" }}
							>
								Permanently delete your account and all
								resources.
							</p>
						</div>
						<button
							onClick={() =>
								toast.error(
									"Contact support to delete your account.",
								)
							}
							className="px-4 py-2 rounded-xl text-sm font-medium transition-all flex-shrink-0"
							style={{
								background: "rgba(239,68,68,0.1)",
								color: "#f87171",
								border: "1px solid rgba(239,68,68,0.25)",
							}}
						>
							Delete Account
						</button>
					</div>
				</Section>
			</div>
		</>
	);
};

export default Profile;
