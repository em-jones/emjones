---
title: Content Rendering Stack
published_at: 2025-12-01
description:
  An overview of the technologies used to build the content rendering portion of
  my site.
summary: >
  Through the use of popular open-source technologies, I've built a content
  rendering stack. Kick the tires with me to see how it all fits together.
tags:
  - content-collections
  - markdown
  - tanstack-start
  - static-site-generation
  - typescript
  - wasm
  - wasmcloud
  - cloudflare-workers
---

## Content Rendering Stack

### Tanstack Start

#### Pros

- Full static-site generation support
- Built with TypeScript for type-safety and developer experience
- Rich plugin ecosystem to extend functionality
- Good performance optimizations out of the box
- Active community and ongoing development

#### Cons

- At time of writing, still relatively new and evolving rapidly (in `RC` stage)

#### Outstanding Questions

- At the moment, it's not entirely clear how this solution will be able to
  target my (eventual) [`wasmcloud`](https://wasmcloud.com) hosting environment.
  - Fortunately, [`Tanstack Start`](https://start.tanstack.com/) is built on top
    of [`Vite`](https://vitejs.dev/) and [`Nitro`](https://nitro.unjs.io/), and
    those appear to have some level of support for `cloudflare workers` as a
    build target. Based off of my familiarity with the `wasm` ecosystem, these
    disparate deployment targets are working to unify around `WASI` as a common
    runtime target.
    <!-- TODO: Confirm this understanding-->
    <!-- Issue URL: https://github.com/em-jones/emjones/issues/1 -->

### Content Collections

#### Pros

- Failry straightforward to define content collections using
- Richly developed ecosystem for markdown content processing that it integrates
  with
- Type-safe content models for compile(generation)-time validation
- Less opinionated creates more flexibility

#### Cons

- Less opinions means more decisions to make and more custom code to write
