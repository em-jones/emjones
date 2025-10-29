import { Link, Outlet, useLocation } from "@tanstack/solid-router";
import { createSignal, For, onMount, Show } from "solid-js";

interface Props {
	posts: () =>
		| typeof import("content-collections").allProjects
		| typeof import("content-collections").allPosts;
	path: "/projects" | "/blog";
}

const PopoverLink = (props: {
	open: boolean;
	to: Props["path"];
	post: ReturnType<Props["posts"]>[0];
	onHover: () => void;
}) => {
	const ref = createSignal<HTMLElement>();
	return (
		<li class="nav">
			<details is-="popover" open={props.open} onmouseover={props.onHover}>
				<summary>
					<Link
						class="w-full"
						to={`${props.to}/$id`}
						is-="badge"
						params={{ id: props.post._meta.fileName }}
						activeProps={{ class: "font-bold" }}
						variant-={props.open ? "background2" : ""}
					>
						<div class="flex flex-col justify-center mr-2"></div>
						{props.post.title}
					</Link>
				</summary>
				<p class="text-xs md:line-clamp-4 line-clamp-2">{props.post.summary}</p>
			</details>
		</li>
	);
};

export default ({ posts, path }: Props) => {
	const location = useLocation();
	const isIndex = () =>
		location().pathname === "/projects" || location().pathname === "/blog";
	const [selected, setSelected] = createSignal<number>(0);
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "j" || e.key === "ArrowDown")
			setSelected((s) => (s + 1) % posts().length);
		if (e.key === "k" || e.key === "ArrowUp")
			setSelected((s) => (s - 1 + posts().length) % posts().length);
	};
	onMount(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	});
	return (
		<div class="col-span-8">
			<Outlet />
			<Show when={isIndex()}>
				<ul class="!list-none">
					<For each={posts()}>
						{(post, i) => (
							<PopoverLink
								onHover={() => setSelected(i())}
								open={i() == selected()}
								to={path}
								post={post}
							/>
						)}
					</For>
				</ul>
			</Show>
		</div>
	);
};
