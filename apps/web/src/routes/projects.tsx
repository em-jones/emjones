import { createFileRoute } from "@tanstack/solid-router";
import Index from "~/components/content/Index";
import { fetchProjects } from "~/projects-api";

const ProjectsComponent = () => {
	return ((posts) => <Index posts={posts} path="/projects" />)(
		Route.useLoaderData(),
	);
};
export const Route = createFileRoute("/projects")({
	loader: async () => fetchProjects(),
	component: ProjectsComponent,
});
