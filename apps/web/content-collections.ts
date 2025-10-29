import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { Schema } from "effect";

const getCollection = (name: string) => defineCollection({
  name,
  schema: Schema.standardSchemaV1(Schema.Struct({
    title: Schema.String,
    summary: Schema.String,
    description: Schema.String,
    tags: Schema.Array(Schema.String)
  })),
  directory: `../../.content/${name}/`,
  include: ["*.mdx", "*.md"],
  transform: (doc, context) => compileMarkdown(context, doc).then(html => ({ ...doc, html }))
});

export default defineConfig({ collections: [getCollection("posts"), getCollection("projects")] });
