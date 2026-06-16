import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			trim: true,
			maxlength: [100, "Title cannot exceed 100 characters"],
		},
		url: {
			type: String,
			required: [true, "URL is required"],
			trim: true,
		},
		category: {
			type: String,
			required: [true, "Category is required"],
			enum: [
				"LLM",
				"AI Agent",
				"Backend",
				"Hosting",
				"Frontend",
				"Database",
				"Cloud",
				"Dev Tools",
				"Learning",
				"Other",
			],
			default: "Other",
		},
		subcategory: {
			type: String,
			trim: true,
			default: "",
		},
		tags: {
			type: [String],
			default: [],
		},
		notes: {
			type: String,
			trim: true,
			default: "",
			maxlength: [500, "Notes cannot exceed 500 characters"],
		},
		favicon: {
			type: String,
			default: "",
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		visitCount: {
			type: Number,
			default: 0,
		},
		lastVisited: {
			type: Date,
			default: null,
		},
		status: {
			type: String,
			enum: ["active", "archived"],
			default: "active",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

// Index for faster querying
resourceSchema.index({ user: 1, category: 1 });
resourceSchema.index({ user: 1, favorite: 1 });
resourceSchema.index({ user: 1, tags: 1 });

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
