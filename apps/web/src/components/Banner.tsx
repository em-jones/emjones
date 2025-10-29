const BANNER_TEXT = `
███████╗███╗   ███╗     ██╗
██╔════╝████╗ ████║     ██║
█████╗  ██╔████╔██║     ██║
██╔══╝  ██║╚██╔╝██║██   ██║
███████╗██║ ╚═╝ ██║╚█████╔╝
╚══════╝╚═╝     ╚═╝ ╚════╝ `;
export default () => (
	<header id="#header" class="flex flex-col">
		<pre class="mx-auto bg-clip-text text-transparent bg-gradient-to-br from-[var(--nord7)] to-[var(--nord15)] w-max">
			{BANNER_TEXT}
		</pre>
		<h2 class="mx-auto">Software Engineer and Architect</h2>
	</header>
);
