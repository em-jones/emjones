import { createFileRoute, Outlet } from "@tanstack/solid-router";

const LayoutComponent = () => (
	<div class="p-2">
		<div class="border-b">I'm a layout</div>
		<div>
			<Outlet />
		</div>
	</div>
);

export const Route = createFileRoute("/_pathlessLayout")({
	component: LayoutComponent,
});
