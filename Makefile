install:
	npm install
ci:
	npm ci
publish:
	npm publish --dry-run
link:
	npm link
gendiff:
	node bin/gendiff.js
	