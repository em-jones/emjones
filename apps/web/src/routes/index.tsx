import { createFileRoute } from "@tanstack/solid-router";
import { useAppState } from "~/app-state";
import Banner from "~/components/Banner";

const Home = () => (({ version }) => (
  <div class="">
    <Banner />
    <div class="mx-auto w-max text-[var(--nord12)]">v{version}</div>
  </div>
))(useAppState().getSnapshot().context);

export const Route = createFileRoute("/")({ component: Home });
