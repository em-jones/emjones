import { createSignal, For, onMount } from "solid-js";

const allowedKeys = ["h", "j", "k", "l"] as const; // TODO: add '/' search
type Key = (typeof allowedKeys)[number];
type KeyState = Record<Key, boolean>;
const d = allowedKeys.reduce(
	(acc, key) => ({ ...acc, [key]: false }),
	{} as KeyState,
);
const isKey = (key: string): key is Key => allowedKeys.includes(key as Key);

export default () => {
	const [selectedKeys, setSelectedKeys] = createSignal<Record<Key, boolean>>(d);
	const setSelected = (b: boolean) => (e: KeyboardEvent) =>
		isKey(e.key) && setSelectedKeys((prev) => ({ ...prev, [e.key as Key]: b }));
	const handleKeyDown = setSelected(true);
	const handleKeyUp = setSelected(false);
	onMount(() => {
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	});
	return (
		<div id="sidebar-vim-nav-container">
			<span class="mr-2"></span>
			<For each={Object.entries(selectedKeys())}>
				{([key, isOpen]) => (
					<button size-="sm" variant-={isOpen ? "background2" : "background4"}>
						{key}
					</button>
				)}
			</For>
		</div>
	);
};
