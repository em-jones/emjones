import { Link } from "@tanstack/solid-router";
import { onMount } from "solid-js";
import { loadLanguages } from "~/utils/use-hljs";

interface Props {
  title: string;
  html: string;
  backPath: "/blog" | "/projects";
}
export default ({ title, html, backPath }: Props) => {
  onMount(() => loadLanguages());
  return <div class="p-2 space-y-2">
    <Link to={backPath} class="block py-1 hover:text-[var(--nord8)] text-[var(--nord11)]" >
      ← All Posts
    </Link>
    <h1 class="font-bold">{title}</h1>
    <div innerHTML={html} />
  </div>;
}
