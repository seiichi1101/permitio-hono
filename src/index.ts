import { type Context, Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { Permit } from "permitio";

type Env = {
	PERMITIO_TOKEN: string;
};

type Variables = {
	blogId: string;
	username: string;
};

const app = new Hono<{ Bindings: Env; Variables: Variables }>();
let permit: Permit | undefined;
type Action = "read" | "create" | "delete" | "update";
type Resource = "Blog";
type Permission = {
	action: Action;
	resource: Resource;
};

const urlMapping = (method: string, path: string): Permission => {
	const mapping: { [key: string]: Permission } = {
		"get-/auth/blog": { action: "read", resource: "Blog" },
		"post-/auth/blog": { action: "create", resource: "Blog" },
		"delete-/auth/blog": { action: "delete", resource: "Blog" },
		"put-/auth/blog": { action: "update", resource: "Blog" },
	};
	const key = `${method}-${path}`;
	return mapping[key];
};

// User attributes mapping
const getUserAttributes = (username: string) => {
	const userAttributes: Record<
		string,
		{ is_staff: boolean; subscription_plan?: string }
	> = {
		seiichi1101_staff: { is_staff: true, subscription_plan: undefined },
		seiichi1101_user: { is_staff: false, subscription_plan: "free" },
		seiichi1101_premium: {
			is_staff: false,
			subscription_plan: "premium",
		},
	};
	return (
		userAttributes[username] || {
			is_staff: false,
			subscription_plan: undefined,
		}
	);
};

// Blog resource attributes mapping - All patterns (12 patterns)
// Grouped by owner
const getResourceAttributes = (blogId: string) => {
	const resourceAttributes: Record<
		string,
		{ is_paid: boolean; is_published: boolean; owner: string }
	> = {
		// Staff owned blogs
		"1": { is_paid: false, is_published: true, owner: "seiichi1101_staff" }, // Free + Published
		"2": { is_paid: false, is_published: false, owner: "seiichi1101_staff" }, // Free + Draft
		"3": { is_paid: true, is_published: true, owner: "seiichi1101_staff" }, // Paid + Published
		"4": { is_paid: true, is_published: false, owner: "seiichi1101_staff" }, // Paid + Draft

		// User owned blogs
		"5": { is_paid: false, is_published: true, owner: "seiichi1101_user" }, // Free + Published
		"6": { is_paid: false, is_published: false, owner: "seiichi1101_user" }, // Free + Draft
		"7": { is_paid: true, is_published: true, owner: "seiichi1101_user" }, // Paid + Published
		"8": { is_paid: true, is_published: false, owner: "seiichi1101_user" }, // Paid + Draft

		// Premium owned blogs
		"9": { is_paid: false, is_published: true, owner: "seiichi1101_premium" }, // Free + Published
		"10": { is_paid: false, is_published: false, owner: "seiichi1101_premium" }, // Free + Draft
		"11": { is_paid: true, is_published: true, owner: "seiichi1101_premium" }, // Paid + Published
		"12": { is_paid: true, is_published: false, owner: "seiichi1101_premium" }, // Paid + Draft
	};
	return (
		resourceAttributes[blogId] || {
			is_paid: false,
			is_published: false,
			owner: "",
		}
	);
};

// Support multiple users for basic auth
app.use(
	"/auth/*",
	basicAuth({
		verifyUser: (username, password) => {
			const validUsers: Record<string, string> = {
				seiichi1101_staff: "password",
				seiichi1101_user: "password",
				seiichi1101_premium: "password",
			};
			return validUsers[username] === password;
		},
	}),
);

// Access Control Middleware
app.use("/auth/*", async (c, next) => {
	const path = c.req.path;
	const method = c.req.method.toLowerCase();
	const authHeader = c.req.header("Authorization");
	const username = atob(authHeader?.substring(6) || "").split(":")[0];

	// Get blogId from query parameter (required)
	const blogId = c.req.query("blogId");
	if (!blogId) {
		return c.text("Bad Request: blogId query parameter is required", 400);
	}

	if (!permit) {
		permit = new Permit({
			pdp: "http://localhost:7766",
			token: c.env.PERMITIO_TOKEN,
		});
	}

	const { action, resource } = urlMapping(method, path);
	const userAttrs = getUserAttributes(username);
	const resourceAttrs = getResourceAttributes(blogId);

	const hasPermission = await permit.check(
		{
			key: username,
			attributes: userAttrs,
		},
		action,
		{
			type: resource,
			attributes: resourceAttrs,
		},
	);

	if (!hasPermission) {
		return c.text(
			`Forbidden: User '${username}' cannot '${action}' blog '${blogId}'`,
			403,
		);
	}

	// Store blogId in context for handlers
	c.set("blogId", blogId);
	c.set("username", username);

	return next();
});

app.get("/auth/blog", (c) => {
	const blogId = c.get("blogId");
	const username = c.get("username");
	return c.json({
		message: "Blog read successfully",
		user: username,
		blogId: blogId,
		action: "read",
	});
});

app.post("/auth/blog", (c) => {
	const blogId = c.get("blogId");
	const username = c.get("username");
	return c.json({
		message: "Blog created successfully",
		user: username,
		blogId: blogId,
		action: "create",
	});
});

app.delete("/auth/blog", (c) => {
	const blogId = c.get("blogId");
	const username = c.get("username");
	return c.json({
		message: "Blog deleted successfully",
		user: username,
		blogId: blogId,
		action: "delete",
	});
});

app.put("/auth/blog", (c) => {
	const blogId = c.get("blogId");
	const username = c.get("username");
	return c.json({
		message: "Blog updated successfully",
		user: username,
		blogId: blogId,
		action: "update",
	});
});

export default app;
