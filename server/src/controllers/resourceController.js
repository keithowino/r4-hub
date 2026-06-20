import Resource from "../models/Resource.js";

// @desc    Get all resources for logged in user
// @route   GET /api/resources
// @access  Private
export const getResources = async (req, res, next) => {
	try {
		const { category, favorite, status, search, tag } = req.query;

		const filter = { user: req.user.id };

		if (category) filter.category = category;
		if (favorite === "true") filter.favorite = true;
		if (status) filter.status = status;
		else filter.status = "active";
		if (tag) filter.tags = { $in: [tag] };

		if (search) {
			filter.$or = [
				{ title: { $regex: search, $options: "i" } },
				{ url: { $regex: search, $options: "i" } },
				{ notes: { $regex: search, $options: "i" } },
				{ tags: { $in: [new RegExp(search, "i")] } },
				{ category: { $regex: search, $options: "i" } },
				{ subcategory: { $regex: search, $options: "i" } },
			];
		}

		const resources = await Resource.find(filter).sort({ createdAt: -1 });

		res.status(200).json({
			success: true,
			count: resources.length,
			data: resources,
		});
	} catch (error) {
		next(error);
	}
};

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Private
export const getResource = async (req, res, next) => {
	try {
		const resource = await Resource.findOne({
			_id: req.params.id,
			user: req.user.id,
		});

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		res.status(200).json({
			success: true,
			data: resource,
		});
	} catch (error) {
		next(error);
	}
};

// // @desc    Create a resource
// // @route   POST /api/resources
// // @access  Private
// export const createResource = async (req, res, next) => {
// 	try {
// 		const { title, url, category, subcategory, tags, notes, favicon } =
// 			req.body;

// 		let faviconUrl = favicon;
// 		if (!faviconUrl && url) {
// 			try {
// 				faviconUrl = `${new URL(url).origin}/favicon.ico`;
// 			} catch {
// 				faviconUrl = "";
// 			}
// 		}

// 		const resource = await Resource.create({
// 			title,
// 			url,
// 			category,
// 			subcategory,
// 			tags,
// 			notes,
// 			favicon: faviconUrl,
// 			user: req.user.id,
// 		});

// 		res.status(201).json({
// 			success: true,
// 			data: resource,
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

// @desc    Create a resource
// @route   POST /api/resources
// @access  Private
export const createResource = async (req, res, next) => {
	try {
		const { title, url, category, subcategory, tags, notes, icon } =
			req.body;

		// Generate favicon URL from domain
		let faviconUrl = "";
		try {
			faviconUrl = `${new URL(url).origin}/favicon.ico`;
		} catch {
			faviconUrl = "";
		}

		const resource = await Resource.create({
			title,
			url,
			category,
			subcategory: subcategory || "",
			tags: tags || [],
			notes: notes || "",
			icon: icon || "🔗",
			favicon: faviconUrl,
			user: req.user.id,
		});

		res.status(201).json({
			success: true,
			data: resource,
		});
	} catch (error) {
		next(error);
	}
};

// @desc    Update a resource
// @route   PUT /api/resources/:id
// @access  Private
export const updateResource = async (req, res, next) => {
	try {
		const resource = await Resource.findOneAndUpdate(
			{ _id: req.params.id, user: req.user.id },
			req.body,
			{
				returnDocument: "after", // ✅ Replace 'new: true' with this
				runValidators: true,
			},
		);

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		res.status(200).json({
			success: true,
			data: resource,
		});
	} catch (error) {
		next(error);
	}
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private
export const deleteResource = async (req, res, next) => {
	try {
		const resource = await Resource.findOneAndDelete({
			_id: req.params.id,
			user: req.user.id,
		});

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Resource deleted",
			data: {},
		});
	} catch (error) {
		next(error);
	}
};

// @desc    Toggle favorite on a resource
// @route   PATCH /api/resources/:id/favorite
// @access  Private
export const toggleFavorite = async (req, res, next) => {
	try {
		const resource = await Resource.findOne({
			_id: req.params.id,
			user: req.user.id,
		});

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		resource.favorite = !resource.favorite;
		await resource.save();

		res.status(200).json({
			success: true,
			data: resource,
		});
	} catch (error) {
		next(error);
	}
};

// @desc    Increment visit count on a resource
// @route   PATCH /api/resources/:id/visit
// @access  Private
export const incrementVisit = async (req, res, next) => {
	try {
		const resource = await Resource.findOneAndUpdate(
			{ _id: req.params.id, user: req.user.id },
			{
				$inc: { visitCount: 1 },
				lastVisited: new Date(),
			},
			{
				returnDocument: "after", // ✅ Replace 'new: true' with this
			},
		);

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		res.status(200).json({
			success: true,
			data: resource,
		});
	} catch (error) {
		next(error);
	}
};

// @desc    Archive a resource (soft delete)
// @route   PATCH /api/resources/:id/archive
// @access  Private
export const archiveResource = async (req, res, next) => {
	try {
		const resource = await Resource.findOneAndUpdate(
			{ _id: req.params.id, user: req.user.id },
			{ status: "archived" },
			{
				returnDocument: "after", // ✅ Replace 'new: true' with this
			},
		);

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Resource archived",
			data: resource,
		});
	} catch (error) {
		next(error);
	}
};
