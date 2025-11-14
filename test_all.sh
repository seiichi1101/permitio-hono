#!/bin/bash

# Test all make commands and record results
echo "Testing all Makefile commands..."
echo "================================"
echo ""

commands=(
  "staff-get-my-free-published-blog"
  "staff-get-my-free-draft-blog"
  "staff-get-my-paid-published-blog"
  "staff-get-my-paid-draft-blog"
  "staff-get-user-free-published-blog"
  "staff-get-user-free-draft-blog"
  "staff-get-user-paid-published-blog"
  "staff-get-user-paid-draft-blog"
  "staff-get-premium-free-published-blog"
  "staff-get-premium-free-draft-blog"
  "staff-get-premium-paid-published-blog"
  "staff-get-premium-paid-draft-blog"
  "user-get-staff-free-published-blog"
  "user-get-staff-free-draft-blog"
  "user-get-staff-paid-published-blog"
  "user-get-staff-paid-draft-blog"
  "user-get-my-free-published-blog"
  "user-get-my-free-draft-blog"
  "user-get-my-paid-published-blog"
  "user-get-my-paid-draft-blog"
  "user-get-premium-free-published-blog"
  "user-get-premium-free-draft-blog"
  "user-get-premium-paid-published-blog"
  "user-get-premium-paid-draft-blog"
  "premium-get-staff-free-published-blog"
  "premium-get-staff-free-draft-blog"
  "premium-get-staff-paid-published-blog"
  "premium-get-staff-paid-draft-blog"
  "premium-get-user-free-published-blog"
  "premium-get-user-free-draft-blog"
  "premium-get-user-paid-published-blog"
  "premium-get-user-paid-draft-blog"
  "premium-get-my-free-published-blog"
  "premium-get-my-free-draft-blog"
  "premium-get-my-paid-published-blog"
  "premium-get-my-paid-draft-blog"
)

success_count=0
fail_count=0

for cmd in "${commands[@]}"; do
  output=$(make $cmd 2>&1)
  exit_code=$?
  
  if echo "$output" | grep -q "Forbidden"; then
    echo "❌ FAIL (403): $cmd"
    ((fail_count++))
  elif echo "$output" | grep -q "successfully"; then
    echo "✅ SUCCESS: $cmd"
    ((success_count++))
  elif [ $exit_code -eq 0 ]; then
    echo "✅ SUCCESS: $cmd"
    ((success_count++))
  else
    echo "❌ FAIL: $cmd (exit code: $exit_code)"
    ((fail_count++))
  fi
done

echo ""
echo "================================"
echo "Summary:"
echo "  Success: $success_count"
echo "  Failed:  $fail_count"
echo "  Total:   ${#commands[@]}"
