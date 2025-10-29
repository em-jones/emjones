import { createContext, onMount, ParentComponent, useContext } from "solid-js";
import { ActorRefFrom, createActor, log, sendTo, setup, spawnChild } from "xstate";
import router from "./router-machine";
import keyboard from "./keyboard-machine";
import type { Router } from "./router";
import { useRouter } from "@tanstack/solid-router";
import { SemanticVersion } from '@em-jones/types';


export const terminal = setup({
  actors: { router },
  types: {
    context: {} as { router: Router },
    input: {} as { router: Router }
  },
}).createMachine({
  initial: "closed",
  context: {} as { dialog: HTMLDialogElement; router: Router },
  id: 'terminal',
  invoke: [{
    id: "router",
    src: "router",
    input: (v) => ({ router: v.context.router }),
  }],
  states: {
    closed: {},
    open: {}
  }
});

interface AppState {
  version: SemanticVersion;
}

type AppMachineContext = AppState;

const version = SemanticVersion('0.0.3');

const app = setup({
  types: {
    events: {} as
      | { type: "KEY_DOWN"; key: string }
      | { type: "ROUTER_PROVIDED"; router: Router }
      | { type: "ROUTER_READY" }
      | { type: "CLIENT_MOUNTED"; window: Window }
      | { type: "TERMINAL_MOUNTED"; dialog: HTMLDialogElement },
    context: {} as AppMachineContext,
  },
}).createMachine({
  type: "parallel",
  context: { version } as AppMachineContext,
  on: {
    ROUTER_READY: { actions: log("Router is ready") },
    KEY_DOWN: { actions: sendTo("terminal", ({ event }) => event) },
    CLIENT_MOUNTED: {
      actions: [
        ({ event }) => {
          return spawnChild(keyboard, { input: { window: event.window }, id: "keyboard" })
        },
        log(v => `App mounted on client with window: ${v.event.window}`)
      ]
    },
    ROUTER_PROVIDED: { actions: ({ event }) => spawnChild(router, { input: { router: event.router }, id: "router" }) }
  }
});

const appActor = createActor(app);
appActor.start();
const AppContext = createContext<ActorRefFrom<typeof app>>(appActor);
const Container: ParentComponent = ({ children }) => {
  const router = useRouter();
  onMount(() => {
    appActor.send({ type: "CLIENT_MOUNTED", window })
    appActor.send({ type: "ROUTER_PROVIDED", router })
  });
  return <AppContext.Provider value={appActor}>{children}</AppContext.Provider>;
}
export const useAppState = () => useContext(AppContext);
export default Container;
