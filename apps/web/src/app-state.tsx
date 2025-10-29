import { SemanticVersion } from "@em-jones/types";
import { useRouter } from "@tanstack/solid-router";
import { createContext, type ParentComponent, useContext } from "solid-js";
import type { ActorLogicFrom, EventObject } from "xstate";
import { assign, createActor, fromCallback, setup } from "xstate";
import type keyboard from "./keyboard-machine";
import type { Router } from "./router";
import router from "./router-machine";

const terminalKeyboard = fromCallback(({ sendBack }) => {
	import("hotkeys-js").then(({ default: hk }) => {
		console.log("Terminal keyboard actor initialized");
		hk("alt+o", () => sendBack({ type: "TOGGLE" }));
	});
});

const dialog = fromCallback<EventObject, { dialog: HTMLDialogElement }>(
	({ input: { dialog }, sendBack }) => {
		dialog.addEventListener("cancel", () => {
			sendBack({ type: "CLOSE_NOOP" });
		});
	},
);
type XSTATE_INIT = {
	type: "xstate.init";
	input: { dialog: HTMLDialogElement; router: Router };
};
export const terminal = setup({
	actors: { keyboard: terminalKeyboard, router, dialog },
	types: {
		context: {} as { dialog: HTMLDialogElement },
		input: {} as { dialog: HTMLDialogElement },
		events: {} as
			| { type: "TOGGLE" }
			| { type: "INITIALIZE"; dialog: HTMLDialogElement }
			| XSTATE_INIT,
	},
}).createMachine({
	initial: "closed",
	context: ({ input: { dialog } }) => ({ dialog }),
	id: "terminal",
	invoke: [
		{
			id: "keyboard",
			src: "keyboard",
		},
		{
			id: "dialog",
			src: "dialog",
			input: ({ event }) => (event as XSTATE_INIT).input,
		},
		{
			id: "router",
			src: "router",
			input: ({ event }) => (event as XSTATE_INIT).input,
		},
	],
	on: {
		NAVIGATING: ".closed",
		CLOSE_NOOP: ".closed",
		INITIALIZE: {
			actions: [
				assign({
					dialog: ({ event }) => event.dialog,
				}),
			],
		},
	},
	states: {
		closed: {
			entry: ({ context }) => {
				context.dialog?.close();
			},
			on: {
				TOGGLE: { target: "open" },
			},
		},
		open: {
			entry: ({ context }) => context.dialog?.showModal(),
			on: {
				TOGGLE: { target: "closed" },
			},
		},
	},
});

interface AppState {
	version: SemanticVersion;
}

interface Actors {
	router: ActorLogicFrom<typeof router>;
	keyboard: ActorLogicFrom<typeof keyboard>;
	terminal: ActorLogicFrom<typeof terminal>;
}

type AppMachineContext = AppState & Actors;
interface TerminalMounted {
	type: "TERMINAL_MOUNTED";
	dialog: HTMLDialogElement;
	router: Router;
}

const appSetup = setup({
	types: {
		input: {} as { version: SemanticVersion },
		events: {} as
			| { type: "KEY_DOWN"; key: string }
			| { type: "ROUTER_PROVIDED"; router: Router }
			| { type: "ROUTER_READY" }
			| TerminalMounted,
		context: {} as AppMachineContext,
	},
});
const app = appSetup.createMachine({
	context: ({ input }) => ({ version: input.version }) as AppMachineContext,
	on: {
		VIEW_TOGGLED: {},
		TERMINAL_MOUNTED: {
			actions: [
				assign({
					// terminal: ({ event, spawn }) =>
					//   spawn(terminal, {
					//     input: { dialog: event.dialog, router: event.router },
					//   }),
				}),
			],
		},
	},
});
const version = SemanticVersion("0.0.3");
type ActorType = ReturnType<typeof createActor<typeof app>>;
const appActor = createActor(app, { input: { version } });
appActor.start();
const AppContext = createContext<ActorType>(appActor);

const Container: ParentComponent = ({ children }) => {
	const router = useRouter();
	appActor.send({ type: "ROUTER_PROVIDED", router });
	return <AppContext.Provider value={appActor}>{children}</AppContext.Provider>;
};
export const useAppState = () => useContext(AppContext);
export default Container;
