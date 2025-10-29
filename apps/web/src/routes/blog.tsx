import { createFileRoute, Link, Outlet } from "@tanstack/solid-router";
import Index from "~/components/content/Index";
import { fetchPosts } from "~/posts-api";

const BlogComponent = () => (posts => <Index posts={posts} path="/blog" />)(Route.useLoaderData());

export const Route = createFileRoute("/blog")({
  loader: async () => fetchPosts(),
  component: BlogComponent,
});
