import { EventObject, fromCallback } from "xstate";
import type { Router } from "./router";

export default fromCallback<EventObject, { router: Router }>(({ input: { router }, sendBack }) => {
  console.log("Router machine invoked");
  const unsub = router.subscribe("onRendered", r => {
  });
  router.subscribe("onBeforeNavigate", r => {
    sendBack({ type: "NAVIGATING" })
  })
  sendBack({ type: "ROUTER_READY" });
  return unsub;
});
