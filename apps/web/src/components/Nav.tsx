import {
	type ActiveOptions,
	Link,
	useLocation,
	useRouter,
} from "@tanstack/solid-router";
import { createMemo, For, onMount, type ParentComponent, Show } from "solid-js";

type ParentPath = "/" | "/blog" | "/projects" | "/about";
const activeProps = { class: "font-bold", "variant-": "background2" };
const links: {
	to: ParentPath;
	label: string;
	activeOptions?: ActiveOptions;
}[] = [
	{ to: "/", label: " home", activeOptions: { exact: true } },
	{ to: "/blog", label: " blog" },
	{ to: "/projects", label: " projects" },
	{ to: "/about", label: "󰘥 about" },
];
// const nextLink = links.reduce((acc, link) => ({...acc, [link.to]: links[(links.indexOf(link) + 1) % links.length]}), {} as Record<ParentPath, typeof links[0]>);
// const prevLink = links.reduce((acc, link) => ({...acc, [link.to]: links[(links.indexOf(link) - 1 + links.length) % links.length]}), {} as Record<ParentPath, typeof links[0]>);

export const useIsHomePage = () => {
	const location = useLocation();
	return createMemo(() => location().pathname === "/");
};

export const ShowOnNonHomePage: ParentComponent = (props) => {
	const isHomepage = useIsHomePage();
	return <Show when={!isHomepage()}>{props.children}</Show>;
};

export default () => {
	const router = useRouter();

	const moveLeft = () => {
		const next = ((l) =>
			l === "/"
				? "/about"
				: l.startsWith("/about")
					? "/projects"
					: l.startsWith("/projects")
						? "/blog"
						: "/")(router.latestLocation.pathname);
		router.navigate({ to: next });
	};
	const moveRight = () => {
		const next = ((l) =>
			l === "/"
				? "/blog"
				: l.startsWith("/blog")
					? "/projects"
					: l.startsWith("/projects")
						? "/about"
						: "/")(router.latestLocation.pathname);
		router.navigate({ to: next });
	};
	function vimHandling(e: KeyboardEvent) {
		if (e.key === "h") moveLeft();
		if (e.key === "l") moveRight();
	}
	onMount(() => {
		document.addEventListener("keydown", vimHandling);
		return () => document.removeEventListener("keydown", vimHandling);
	});
	return (
		<For each={links}>
			{({ to, label, activeOptions }) => (
				<Link is-="badge" {...{ to, activeProps, activeOptions }}>
					{label}
				</Link>
			)}
		</For>
	);
};
