import { type Context, Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { Permit } from "permitio";

const app = new Hono<{ Bindings: Env }>();
let permit: Permit | undefined;

type Env = {
	PERMITIO_TOKEN: string;
};
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

app.use(
	"/auth/*",
	basicAuth({
		username: "seiichi1101",
		password: "password",
	}),
);

// Access Control Middleware
app.use("/auth/*", async (c, next) => {
	const path = c.req.path;
	const method = c.req.method.toLowerCase();
	const requiredPermissions = urlMapping(method, path);
	const authHeader = c.req.header("Authorization");
	const username = atob(authHeader?.substring(6) || "").split(":")[0];

	if (!permit) {
		permit = new Permit({
			pdp: "https://cloudpdp.api.permit.io",
			token: c.env.PERMITIO_TOKEN,
		});
	}

	const hasPermission = await permit.check(
		username,
		requiredPermissions.action,
		requiredPermissions.resource,
	);

	if (!hasPermission) {
		return c.text("Forbidden", 403);
	}

	return next();
});

app.get("/auth/blog", (c) => {
	return c.text(
		`You are authorized to access: ${c.req.method} - ${c.req.path}`,
	);
});

app.post("/auth/blog", (c) => {
	return c.text(
		`You are authorized to access: ${c.req.method} - ${c.req.path}`,
	);
});

app.delete("/auth/blog", (c) => {
	return c.text(
		`You are authorized to access: ${c.req.method} - ${c.req.path}`,
	);
});

app.put("/auth/blog", (c) => {
	return c.text(
		`You are authorized to access: ${c.req.method} - ${c.req.path}`,
	);
});

export default app;
