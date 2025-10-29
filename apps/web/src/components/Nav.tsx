import { type ActiveOptions, Link } from "@tanstack/solid-router";
import { useLocation } from "@tanstack/solid-router";
import { allPosts, allProjects } from "content-collections";
import { createMemo, For, ParentComponent, Show } from "solid-js";

type ParentPath = "/" | "/blog" | "/projects";
const activeProps = { class: "font-bold" };
const links: { to: ParentPath, label: string, activeOptions?: ActiveOptions, subtree?: (typeof allPosts) }[] = [
  { to: "/", label: "Home", activeOptions: { exact: true } },
  { to: "/blog", label: "Blog", subtree: allPosts },
  { to: "/projects", label: "Projects", subtree: allProjects },
  // { to: "/users", label: "Users" },
  // { to: "/route-a", label: "Pathless Layout" },
  // { to: "/deferred", label: "Deferred" },
  // { to: "/this-route-does-not-exist", label: "Not Exist" },
];

export const useIsHomePage = () => {
  const location = useLocation();
  return createMemo(() => location().pathname === "/");
}

export const ShowOnNonHomePage: ParentComponent = (props) => {
  const isHomepage = useIsHomePage();
  return <Show when={!isHomepage()}>{props.children}</Show>;
}

export default () => (
  <div class="h-full">
    <ul marker-="open tree">
      {links.map(({ to, label, activeOptions, subtree }) => (<li>
        <Link to={to} {...{ activeProps, activeOptions }}>{label}</Link>
        <Show when={subtree !== undefined && (to === "/blog" || to === "/projects")}>
          <ul marker-="open tree">
            <For each={subtree}>{(i) => <li>
              <Show when={to === "/blog"}>
                <Link to={`/blog/$id`} params={(prev) => ({ ...prev, id: i._meta.fileName })}  {...{ activeProps }}>{i.title}</Link>
              </Show>
              <Show when={to === "/projects"}>
                <Link to={`/projects/$id`} params={(prev) => ({ ...prev, id: i._meta.fileName })}  {...{ activeProps }}>{i.title}</Link>
              </Show>
            </li>}
            </For>
          </ul>
        </Show>
      </li>))}
    </ul>
  </div>
);
