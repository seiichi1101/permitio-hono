dev:
	npx wrangler dev

# ========================================
# Staff user (is_staff: true, subscription_plan: free)
# ========================================

# Staff -> My blogs
staff-get-my-free-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=1" -u seiichi1101_staff:password -w "\n"

staff-get-my-free-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=2" -u seiichi1101_staff:password -w "\n"

staff-get-my-paid-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=3" -u seiichi1101_staff:password -w "\n"

staff-get-my-paid-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=4" -u seiichi1101_staff:password -w "\n"

# Staff -> User blogs
staff-get-user-free-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=5" -u seiichi1101_staff:password -w "\n"

staff-get-user-free-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=6" -u seiichi1101_staff:password -w "\n"

staff-get-user-paid-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=7" -u seiichi1101_staff:password -w "\n"

staff-get-user-paid-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=8" -u seiichi1101_staff:password -w "\n"

# Staff -> Premium blogs
staff-get-premium-free-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=9" -u seiichi1101_staff:password -w "\n"

staff-get-premium-free-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=10" -u seiichi1101_staff:password -w "\n"

staff-get-premium-paid-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=11" -u seiichi1101_staff:password -w "\n"

staff-get-premium-paid-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=12" -u seiichi1101_staff:password -w "\n"

# ========================================
# Regular user (is_staff: false, subscription_plan: free)
# ========================================

# User -> Staff blogs
user-get-staff-free-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=1" -u seiichi1101_user:password -w "\n"

user-get-staff-free-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=2" -u seiichi1101_user:password -w "\n"

user-get-staff-paid-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=3" -u seiichi1101_user:password -w "\n"

user-get-staff-paid-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=4" -u seiichi1101_user:password -w "\n"

# User -> My blogs
user-get-my-free-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=5" -u seiichi1101_user:password -w "\n"

user-get-my-free-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=6" -u seiichi1101_user:password -w "\n"

user-get-my-paid-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=7" -u seiichi1101_user:password -w "\n"

user-get-my-paid-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=8" -u seiichi1101_user:password -w "\n"

# User -> Premium blogs
user-get-premium-free-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=9" -u seiichi1101_user:password -w "\n"

user-get-premium-free-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=10" -u seiichi1101_user:password -w "\n"

user-get-premium-paid-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=11" -u seiichi1101_user:password -w "\n"

user-get-premium-paid-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=12" -u seiichi1101_user:password -w "\n"

# ========================================
# Premium user (is_staff: false, subscription_plan: premium)
# ========================================

# Premium -> Staff blogs
premium-get-staff-free-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=1" -u seiichi1101_premium:password -w "\n"

premium-get-staff-free-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=2" -u seiichi1101_premium:password -w "\n"

premium-get-staff-paid-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=3" -u seiichi1101_premium:password -w "\n"

premium-get-staff-paid-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=4" -u seiichi1101_premium:password -w "\n"

# Premium -> User blogs
premium-get-user-free-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=5" -u seiichi1101_premium:password -w "\n"

premium-get-user-free-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=6" -u seiichi1101_premium:password -w "\n"

premium-get-user-paid-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=7" -u seiichi1101_premium:password -w "\n"

premium-get-user-paid-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=8" -u seiichi1101_premium:password -w "\n"

# Premium -> My blogs
premium-get-my-free-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=9" -u seiichi1101_premium:password -w "\n"

premium-get-my-free-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=10" -u seiichi1101_premium:password -w "\n"

premium-get-my-paid-published-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=11" -u seiichi1101_premium:password -w "\n"

premium-get-my-paid-draft-blog:
	curl -X GET "localhost:8787/auth/blog?blogId=12" -u seiichi1101_premium:password -w "\n"
