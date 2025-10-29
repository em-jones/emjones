import contentCollections from "@content-collections/vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { defineConfig } from "vite";
import viteSolid from "vite-plugin-solid";
import tsConfigPaths from "vite-tsconfig-paths";
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    contentCollections(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    nitroV2Plugin({ preset: 'bun' }),
    tanstackStart(),
    wasm(),
    viteSolid({ ssr: true }),
  ],
});
