import { createFileRoute } from "@tanstack/solid-router";
import { createSignal, onMount } from "solid-js";
import { useAppState } from "~/app-state";
import Banner from "~/components/Banner";

const Home = () => {
  const app = useAppState();
  const [version, setVersion] = createSignal("0.0.1");
  onMount(() => setVersion("0.0.1"));
  return (
    <div class="">
      <Banner />
      <div class="mx-auto w-max text-[var(--nord12)]">v{version()}</div>
    </div>
  );
};

export const Route = createFileRoute("/")({ component: Home });
