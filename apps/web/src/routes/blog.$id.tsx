import { createFileRoute } from "@tanstack/solid-router";
import { NotFound } from "~/components/NotFound";
import { PostErrorComponent } from "~/components/PostError";
import { fetchPost } from "~/posts-api";
import { onMount } from "solid-js";
import { loadLanguages } from "~/utils/use-hljs";
import DeepView from "~/components/content/DeepView";

const PostComponent = () => {
  const post = Route.useLoaderData();

  return <DeepView backPath="/blog" title={post().title} html={post().html} />;
}

export const Route = createFileRoute("/blog/$id")({
  loader: ({ params: { id: data } }) => fetchPost({ data }),
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  },
});

