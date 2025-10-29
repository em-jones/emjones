/// <reference types="vite/client" />

import styles from "@em-jones/ui/styles.css?url";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import highlightjs from "highlight.js/styles/nord.css?url";
import type * as Solid from "solid-js";
import { HydrationScript } from "solid-js/web";
import AppState from "~/app-state";
import { AppShell } from "~/components/AppShell";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import { page } from "~/nav";
import { seo } from "~/utils/seo";

const RootDocument = ({ children }: { children: Solid.JSX.Element }) => (
  <html data-webtui-theme="nord">
    <head>
      <HydrationScript />
    </head>
    <body data-page={page()} class="flex flex-col">
      <HeadContent />
      <hr />
      <AppState>
        <AppShell>{children}</AppShell>
      </AppState>
      <TanStackRouterDevtools position="bottom-right" />
      <Scripts />
    </body>
  </html>
);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...seo({
        title: "Em Jones | Software Engineer and Architect",
        description: `A software engineer and architect specializing in building scalable web applications and Cloud-Native services. Explore my projects, blog, and professional journey.`,
      }),
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "stylesheet", href: highlightjs },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon.gif",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon.gif",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon.gif",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.gif" },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});
