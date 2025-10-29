import { createFileRoute } from "@tanstack/solid-router";
import DeepView from "~/components/content/DeepView";
import { PostErrorComponent } from "~/components/PostError";
import { fetchPost } from "~/posts-api";

export const Route = createFileRoute("/blog_/$id/deep")({
	loader: async ({ params: { id } }) => fetchPost({ data: id }),
	errorComponent: PostErrorComponent,
	component: PostDeepComponent,
});

function PostDeepComponent() {
	const post = Route.useLoaderData();

	return <DeepView title={post().title} backPath="/blog" html={post().html} />;
}
