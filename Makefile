dev:
	npx wrangler dev

# Publication:Classmethod#Admin 
cm-admin-get-Classmethod:
	curl -X GET "localhost:8787/auth/publications/Classmethod" -u cm_seiichi1101_admin:password -w "\n"
cm-admin-delete-Classmethod:
	curl -X DELETE "localhost:8787/auth/publications/Classmethod" -u cm_seiichi1101_admin:password -w "\n"
cm-admin-get-Classmethod-blog1:
	curl -X GET "localhost:8787/auth/publications/Classmethod/blogs/blog1" -u cm_seiichi1101_admin:password -w "\n"
cm-admin-delete-Classmethod-blog1:
	curl -X DELETE "localhost:8787/auth/publications/Classmethod/blogs/blog1" -u cm_seiichi1101_admin:password -w "\n"

# Publication:Classmethod#Member1
cm-member1-get-Classmethod:
	curl -X GET "localhost:8787/auth/publications/Classmethod" -u cm_seiichi1101_member1:password -w "\n"
cm-member1-delete-Classmethod:
	curl -X DELETE "localhost:8787/auth/publications/Classmethod" -u cm_seiichi1101_member1:password -w "\n"
cm-member1-get-Classmethod-blog1:
	curl -X GET "localhost:8787/auth/publications/Classmethod/blogs/blog1" -u cm_seiichi1101_member1:password -w "\n"
cm-member1-delete-Classmethod-blog1:
	curl -X DELETE "localhost:8787/auth/publications/Classmethod/blogs/blog1" -u cm_seiichi1101_member1:password -w "\n"

# Publication:Classmethod#Member2
cm-member2-get-Classmethod:
	curl -X GET "localhost:8787/auth/publications/Classmethod" -u cm_seiichi1101_member2:password -w "\n"
cm-member2-delete-Classmethod:
	curl -X DELETE "localhost:8787/auth/publications/Classmethod" -u cm_seiichi1101_member2:password -w "\n"
cm-member2-get-Classmethod-blog1:
	curl -X GET "localhost:8787/auth/publications/Classmethod/blogs/blog1" -u cm_seiichi1101_member2:password -w "\n"
cm-member2-delete-Classmethod-blog1:
	curl -X DELETE "localhost:8787/auth/publications/Classmethod/blogs/blog1" -u cm_seiichi1101_member2:password -w "\n"
