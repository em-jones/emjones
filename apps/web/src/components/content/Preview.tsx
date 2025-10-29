import { Link } from "@tanstack/solid-router";
import { onMount } from "solid-js";
import { loadLanguages } from "~/utils/use-hljs";

interface Props {
  title: string;
  id: string;
  html: string;
  path: "/blog" | "/projects";
}

export default ({ title, id, html, path }: Props) => {
  onMount(() => loadLanguages());
  return <div class="space-y-2">
    <h4 class="text-xl font-bold underline">{title}</h4>
    <Link
      to={`${path}/$id/deep`}
      params={{ id }}
      activeProps={{ class: "text-black font-bold" }}
      class="py-1"
      is-="button"
    >
      Deep View
    </Link>
    <div class="text-sm" innerHTML={html} />
  </div>;
}
