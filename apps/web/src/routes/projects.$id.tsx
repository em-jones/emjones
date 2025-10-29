import { createFileRoute } from "@tanstack/solid-router";
import DeepView from "~/components/content/DeepView";
import { NotFound } from "~/components/NotFound";
import { PostErrorComponent } from "~/components/PostError";
import { fetchProject } from "~/projects-api";

const ProjectsComponent = () =>
  ((post) => <DeepView backPath="/projects" title={post().title} html={post().html} />)
    (Route.useLoaderData())

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params: { id } }) => fetchProject({ data: id }),
  errorComponent: PostErrorComponent,
  component: ProjectsComponent,
  notFoundComponent: () => <NotFound>Post not found</NotFound>,
});



