import { createFileRoute } from '@tanstack/solid-router';
import { fetchPost } from '~/posts-api';
import { PostErrorComponent } from '~/components/PostError';
import DeepView from '~/components/content/DeepView';

export const Route = createFileRoute('/blog_/$id/deep')({
  loader: async ({ params: { id } }) => {
    console.log({ id })
    return fetchPost({ data: id });
  },
  errorComponent: PostErrorComponent,
  component: PostDeepComponent,
})

function PostDeepComponent() {
  const post = Route.useLoaderData()

  return <DeepView title={post().title} backPath='/blog' html={post().html} />
}
