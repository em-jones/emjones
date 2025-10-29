import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import { compileMarkdown } from "@content-collections/markdown";


const posts = defineCollection({
  name: "posts",
  directory: "../../.content/posts/",
  include: ["*.mdx", "*.md"],
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
  transform: async (doc, context) => compileMarkdown(context, doc).then(html => ({ ...doc, html }))
});

const projects = defineCollection({
  name: "projects",
  directory: "../../.content/projects/",
  include: ["*.mdx", "*.md"],
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
  transform: async (doc, context) => compileMarkdown(context, doc).then(html => ({ ...doc, html }))
});

export default defineConfig({ collections: [posts, projects] });
