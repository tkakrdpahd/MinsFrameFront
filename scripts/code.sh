# code.sh
tree . -I ".next|node_modules|pnpm-lock.yaml" --prune
cloc . --exclude-dir=dist,.next,node_modules --not-match-f='(^|/)pnpm-lock\.yaml$'