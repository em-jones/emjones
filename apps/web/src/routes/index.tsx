import { createFileRoute, Link } from "@tanstack/solid-router";
import { allPosts, allProjects } from "content-collections";
import { For, onMount } from "solid-js";
import { setPage } from "~/nav";

const Home = () => {
	onMount(() => {
		setPage("home");
	});
	return (
		<>
			<article class="col-span-8 md:col-span-5">
				<header>
					<h2 class="before:content-['##']"> Welcome</h2>
				</header>
				<p>
					Howdy! This site is <Link to={"/about"}>Em Jones</Link>'s professional
					site and blog.
				</p>
				<p>
					What you can expect to find here are write-ups on projects I've worked
					on, technical deep-dives into topics I'm interested in, and general
					musings on software engineering and architecture and DevOps.
				</p>
			</article>
			<aside class="col-span-8 md:col-span-3">
				<header>
					<h3 class="before:content-['###']"> What's New?</h3>
				</header>
				<h4 class="before:content-['####']"> Projects</h4>
				<ol>
					<For each={allProjects.slice(0, 3)}>
						{(project) => (
							<li class="text-xs">
								<Link
									to={`/projects/$id`}
									params={{ id: project._meta.fileName }}
								>
									{project.title}
								</Link>
							</li>
						)}
					</For>
				</ol>
				<h4 class="before:content-['####']"> Blog</h4>
				<ol>
					<For each={allPosts.slice(0, 3)}>
						{(project) => (
							<li class="text-xs">
								<Link to={`/blog/$id`} params={{ id: project._meta.fileName }}>
									{project.title}
								</Link>
							</li>
						)}
					</For>
				</ol>
			</aside>
		</>
	);
};

export const Route = createFileRoute("/")({ component: Home });
