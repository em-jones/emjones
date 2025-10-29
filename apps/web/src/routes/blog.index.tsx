import { createFileRoute } from "@tanstack/solid-router";

const PostsIndexComponent = () => <div></div>;

export const Route = createFileRoute("/blog/")({
	component: PostsIndexComponent,
});
