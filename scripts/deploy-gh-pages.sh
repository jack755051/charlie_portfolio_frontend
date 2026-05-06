#!/usr/bin/env bash
set -euo pipefail

echo "==> Validating JSON SSOT..."
npm run validate:ssot

echo "==> Building static site..."
npm run generate

echo "==> Deploying to gh-pages..."
npx gh-pages -d .output/public

echo "==> Done. GitHub Pages will rebuild automatically."
