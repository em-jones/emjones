/// <reference types="vite/client" />

import styles from "@em-jones/ui/styles.css?url";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import highlightjs from "highlight.js/styles/nord.css?url";
import type * as Solid from "solid-js";
import { HydrationScript } from "solid-js/web";
import { AppShell } from "~/components/AppShell";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import { seo } from "~/utils/seo";
import AppState from "~/app-state";

const RootDocument = ({ children }: { children: Solid.JSX.Element }) => (
  <html data-webtui-theme="nord">
    <head>
      <HydrationScript />
    </head>
    <body>
      <HeadContent />
      <hr />
      <AppState><AppShell>{children}</AppShell></AppState>
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
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "stylesheet", href: highlightjs },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});
