import { EventObject, fromCallback } from "xstate";
import type { Router } from "./router";

export default fromCallback<EventObject, { router: Router }>(({ input: { router }, sendBack }) => {
  const unsub = router.subscribe("onRendered", r => {
    console.log("Route rendered:", r);
  });
  sendBack({ type: "ROUTER_READY" });
  return unsub;
});
