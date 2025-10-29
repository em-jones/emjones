import { createFileRoute } from '@tanstack/solid-router';
import { fetchProject } from '~/projects-api';
import { PostErrorComponent } from '~/components/PostError';
import DeepView from '~/components/content/DeepView';

export const Route = createFileRoute('/projects_/$id/deep')({
  loader: async ({ params: { id } }) => fetchProject({ data: id }),
  errorComponent: PostErrorComponent,
  component: PostDeepComponent,
})

function PostDeepComponent() {
  const post = Route.useLoaderData()

  return <DeepView title={post().title} backPath='/projects' html={post().html} />
}

