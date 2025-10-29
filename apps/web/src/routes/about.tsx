import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/about")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div class="col-span-8 flex flex-col">
			<header>
				<h1>About Me</h1>
			</header>
			<article>
				<p>
					I'm Em, a software developer with a passion for creating efficient and
					scalable web applications. With a background in computer science and
					years of experience in the industry, I specialize in front-end
					development using modern frameworks and technologies.
				</p>
			</article>
		</div>
	);
}
