import { type EventObject, fromCallback } from "xstate";

export default fromCallback<EventObject, { window: Window }>(
  ({ sendBack, input }) => {
    const handleKeyDown = (evt: KeyboardEvent) =>
      sendBack({ type: "KEY_DOWN", key: evt.key });
    input.window.addEventListener("keydown", handleKeyDown);
    return () => input.window.removeEventListener("keydown", handleKeyDown);
  },
);
