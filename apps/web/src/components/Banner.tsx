import { Show } from "solid-js";
import { useAppState } from "~/app-state";
import { useIsHomePage } from "./Nav";
import { GithubIcon, LinkedinIcon } from "./tech-icons";
import VimInputsViz from "./VimInputsViz";

const BANNER_TEXT = `
███████╗ ███╗   ███╗      ██╗
██╔════╝ ████╗ ████║      ██║
█████╗   ██╔████╔██║      ██║
██╔══╝   ██║╚██╔╝██║ ██   ██║
███████╗ ██║ ╚═╝ ██║ ╚█████╔╝
╚══════╝ ╚═╝     ╚═╝  ╚════╝ `;
export default () => {
	const isHomePage = useIsHomePage();
	const headerClasses = () => (isHomePage() ? "" : "md:flex-row-reverse");
	const headerFontSize = () =>
		isHomePage() ? "text-sm md:text-base mx-auto" : "text-xs";

	return (({ version }) => {
		return (
			<header class={`flex flex-col justify-between p-4 ${headerClasses()}`}>
				<div class="flex flex-col pt-2 space-y-1">
					<pre
						id="banner"
						class={`bg-clip-text [filter:_drop-shadow(0.5px_0.5px_var(--nord8))] text-transparent bg-gradient-to-br  from-[var(--nord7)] to-[var(--nord15)] w-max ${headerFontSize()}`}
					>
						{BANNER_TEXT}
					</pre>
					<div
						id="version"
						class="text-[var(--nord12)] [text-shadow:_0_0_5px_var(--nord14)] mx-auto"
					>
						v{version}
					</div>
					<h2 id="main-subtitle" class="mx-auto">
						Software Engineer and Architect
					</h2>
					<div id="vim-input-viz" class="mx-auto">
						<VimInputsViz />
					</div>
					<div
						id="social-icons"
						class="flex flex-col w-max mx-auto space-x-2 items-end justify-start"
					>
						<div class="flex space-x-4">
							<a
								href="https://www.linkedin.com/in/emgjones/"
								class="hover:text-[var(--nord10)]"
							>
								<LinkedinIcon class="h-[1.5rem] w-[1.5rem]" />
							</a>

							<a
								href="https://github.com/em-jones"
								class="hover:text-[var(--nord10)]"
							>
								<GithubIcon class="h-[1.5rem] w-[1.5rem]" />
							</a>
						</div>
					</div>
				</div>
			</header>
		);
	})(useAppState().getSnapshot().context);
};
