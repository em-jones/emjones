#!/bin/bash
alias yarn="corepack yarn"
alias yarnpkg="corepack yarnpkg"
alias pnpm="corepack pnpm"
alias pnpx="corepack pnpx"
alias npm="corepack npm"
alias npx="corepack npx"



uv tool install specify-cli --from git+https://github.com/github/spec-kit.git --force
vale sync
