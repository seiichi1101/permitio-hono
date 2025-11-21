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
type ResourceType = "Publication" | "Blog";
type Permission = {
	action: Action;
	resourceType: ResourceType;
	resourceKey: string;
};

const methodToAction: Record<string, Action> = {
	get: "read",
	post: "create",
	delete: "delete",
	put: "update",
};

const urlMapping = (method: string, path: string): Permission => {
	const normalizedPath = path.replace(/\/+$/, "") || "/";
	const action = methodToAction[method];
	if (!action) {
		throw new Error(`Unsupported method ${method.toUpperCase()}`);
	}

	const blogMatch = normalizedPath.match(
		/^\/auth\/publications\/([^/]+)\/blogs\/([^/]+)$/,
	);
	if (blogMatch) {
		return {
			action,
			resourceType: "Blog",
			resourceKey: blogMatch[2],
		};
	}

	const publicationMatch = normalizedPath.match(
		/^\/auth\/publications\/([^/]+)$/,
	);
	if (publicationMatch) {
		return {
			action,
			resourceType: "Publication",
			resourceKey: publicationMatch[1],
		};
	}

	throw new Error(`No permission mapping for ${method.toUpperCase()} ${path}`);
};

// Support multiple users for basic auth
app.use(
	"/auth/*",
	basicAuth({
		verifyUser: (username, password) => {
			const validUsers: Record<string, string> = {
				cm_seiichi1101_admin: "password",
				cm_seiichi1101_member1: "password",
				cm_seiichi1101_member2: "password",
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

	if (!permit) {
		permit = new Permit({
			pdp: "http://localhost:7766",
			token: c.env.PERMITIO_TOKEN,
		});
	}

	const { action, resourceType, resourceKey } = urlMapping(method, path);

	const hasPermission = await permit.check(username, `${action}`, {
		type: resourceType,
		key: resourceKey,
	});

	if (!hasPermission) {
		return c.text(
			`Forbidden: User '${username}' cannot '${action}' resource '${resourceType}' (${resourceKey})`,
			403,
		);
	}

	c.set("username", username);
	return next();
});

app.get("/auth/publications/:pubId", (c) => {
	return c.json({
		message: "Blog read successfully",
		user: c.get("username"),
		pubId: c.req.param("pubId"),
		action: "read",
	});
});

app.delete("/auth/publications/:pubId", (c) => {
	return c.json({
		message: "Blog deleted successfully",
		user: c.get("username"),
		pubId: c.req.param("pubId"),
		action: "delete",
	});
});

app.put("/auth/publications/:pubId", (c) => {
	return c.json({
		message: "Blog updated successfully",
		user: c.get("username"),
		pubId: c.req.param("pubId"),
		action: "update",
	});
});

app.get("/auth/publications/:pubId/blogs/:blogId", (c) => {
	return c.json({
		message: "Blog read successfully",
		user: c.get("username"),
		pubId: c.req.param("pubId"),
		blogId: c.req.param("blogId"),
		action: "read",
	});
});

app.delete("/auth/publications/:pubId/blogs/:blogId", (c) => {
	return c.json({
		message: "Blog deleted successfully",
		user: c.get("username"),
		pubId: c.req.param("pubId"),
		blogId: c.req.param("blogId"),
		action: "delete",
	});
});

app.put("/auth/publications/:pubId/blogs/:blogId", (c) => {
	return c.json({
		message: "Blog updated successfully",
		user: c.get("username"),
		pubId: c.req.param("pubId"),
		blogId: c.req.param("blogId"),
		action: "update",
	});
});

export default app;
