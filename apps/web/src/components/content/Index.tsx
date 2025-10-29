import { Link, Outlet, useLocation } from "@tanstack/solid-router";
import { For, Show } from "solid-js";
interface Props {
  posts: () => (typeof import("content-collections").allProjects | typeof import("content-collections").allPosts);
  path: "/projects" | "/blog";
}

export default ({ posts, path }: Props) => {
  const location = useLocation();
  const isIndex = () => location().pathname === "/projects" || location().pathname === "/blog";
  return <div>
    <Outlet />
    <Show when={isIndex()}>
      <ul>
        <For each={posts()}>
          {(post) => (
            <li class="flex gap-4">
              <div class="w-full">
                <Link
                  to={`${path}/$id`}
                  params={{ id: post._meta.fileName }}
                  class="block py-1"
                  activeProps={{ class: "font-bold" }}
                >
                  <div class="">{post.title}</div>
                </Link>
                <p class="text-xs md:line-clamp-4 line-clamp-2">{post.summary}</p>
              </div>
            </li>
          )}
        </For>
      </ul>

    </Show>
  </div >
}
