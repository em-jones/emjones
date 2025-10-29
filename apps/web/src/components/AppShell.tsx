import "@tailwindplus/elements";
import { useRouterState } from "@tanstack/solid-router";
import { createEffect, type ParentComponent } from "solid-js";
import { setPage } from "~/nav";
import Banner from "./Banner";
import Nav from "./Nav";
import Terminal from "./Terminal";

export const AppShell: ParentComponent = ({ children }) => {
  const router = useRouterState();
  createEffect(() => {
    const pageName = router().location.pathname.startsWith("/projects")
      ? "projects"
      : router().location.pathname.startsWith("/about")
        ? "about"
        : router().location.pathname.startsWith("/blog")
          ? "blog"
          : router().location.pathname.startsWith("/contact")
            ? "contact"
            : "home";
    setPage(pageName);
  });
  return (
    <>
      <Banner />
      <main
        box-="square"
        shear-="top"
        class="flex-grow overflow-hidden !pb-[2.5rem] [&>div]:m-1"
      >
        <Nav />
        <div class="px-2 sm:px-6 md:px-2 h-full overflow-y-auto pb-8 grid grid-cols-8 gap-4">
          {children}
        </div>
        <Terminal />
      </main>
    </>
  );
};
