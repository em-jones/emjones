---
title: Professional Site (Tanstack Web App)
description: >
  Building a proper portfolio to showcase skills and streamline the job search
  process.
summary: >
  This project focuses on creating a comprehensive portfolio that exhibits
  application development and application-layer developer operations skills
tags:
  - portfolio
  - ci-cd
  - github-actions
  - typescript
  - tanstack
  - xstate
  - vite
  - vitest
  - content-collections
  - effect
---

## [The Professional Portfolio Site](https://github.com/em-jones/emjones)

### Goals

- Create a professional portfolio website to showcase skills, projects, and
  experience.

### Tools Used

- **Framework**:
  - [`Tanstack Start`](https://tanstack.com/start/latest) - Web Application
    Framework
  - [`Tanstack Router`](https://tanstack.com/router/latest) - Routing Database
  - [`Effect`](https://effect.website) - Functional Typescript Ecosystem
- **Language**: [`TypeScript`](https://www.typescriptlang.org/)
- **State Management**: [`XState`](https://stately.ai/docs/xstate)
- **Build Tool**: [`Vite`](https://vite.dev/)
- **Testing**:
  - [`Vitest`(TODO)](https://vitest.dev/)
  - [`Playwright`(TODO)](https://playwright.dev/)
- **Content Management**:
  [`Content Collections`](https://www.content-collections.dev/)
- **CI/CD**: [`GitHub Actions`](https://github.com/features/actions)
- **Styles**: [`Tailwind CSS`](https://tailwindcss.com/) and
  [`webtui`](https://webtui.ironclad.sh/)
- **Hosting**: [`Fly.io`](https://fly.io/)

### Roadmap

- [ ] Content Hot-reloading during development
- [ ] Move [`action`]()-based code to `effect`
- [ ] Otel Instrumentation
- [ ] Sentry Instrumentation
- [ ] Migrate Terminal state management to `xstate`
- [ ] Add unit and integration tests with Vitest
- [ ] Add more E2E tests with Playwright
- [ ] Improve SEO and performance optimizations
  - [ ] Add Sitemap
  - [ ] Add Meta Tags
- [ ] Add RSS Feed
- [ ] Integrate with subscription service
- [ ] Migrate to [Application Platform](./0002-application-platform.md)
