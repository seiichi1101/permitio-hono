dev:
	npx wrangler dev

get:
	curl -X GET localhost:8787/auth/blog -u seiichi1101:password -w "\n"

post:
	curl -X POST localhost:8787/auth/blog -u seiichi1101:password -w "\n"

delete:
	curl -X DELETE localhost:8787/auth/blog -u seiichi1101:password -w "\n"

put:
	curl -X PUT localhost:8787/auth/blog -u seiichi1101:password -w "\n"
