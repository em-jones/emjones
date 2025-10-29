import { createSignal } from "solid-js";

type Pages = "home" | "about" | "projects" | "blog" | "contact";
export const [page, setPage] = createSignal<Pages>("home");
