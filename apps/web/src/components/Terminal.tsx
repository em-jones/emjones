import { useRouter } from "@tanstack/solid-router";
import { allPosts, allProjects } from "content-collections";
import { type Component, createSignal, type JSX, onMount } from "solid-js";
import type TypeIt from "typeit";
import { useAppState } from "~/app-state";

type Props = {};

const prompt = `anon@emjones:~$ `;
const help =
  "For a list of available commands, type&nbsp<span class=\"command-name\">'help'</span>";
const welcome = "🎉 Welcome to my portfolio and blog!";
const availableCommands = ["help", "ls", "cd"];

const commandDescriptions: Record<string, string> = {
  help: "Displays this help message.",
  ls: "Print site map of available pages",
  cd: "Navigate to a different page, e.g. 'cd about', 'cd projects', 'cd projects/webapp'",
};

const commandEmojis: Record<string, string> = {
  help: "❓",
  ls: "📂",
  cd: "🔗",
  about: "👤",
  contact: "✉",
  projects: "💼",
  blog: "📝",
};

const siteMap: Record<string, string> = {
  projects: "/projects",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
};

const fakeGet = (data: Record<string, string>, delay = 500) =>
  new Promise<Record<string, string>>((resolve) =>
    setTimeout(() => resolve(data), delay),
  );

const getProjects = () =>
  fakeGet(
    allProjects.reduce(
      (acc, project) => ({
        ...acc,
        [project._meta.fileName]: `/projects/${project._meta.fileName}`,
      }),
      {} as Record<string, string>,
    ),
  );

const getBlogPosts = () =>
  fakeGet(
    allPosts.reduce(
      (acc, post) => ({ ...acc, [post.title]: `/blog/${post._meta.fileName}` }),
      {} as Record<string, string>,
    ),
  );

const sectionList: Record<string, () => Promise<Record<string, string>>> = {
  projects: getProjects,
  blog: getBlogPosts,
  about: () => fakeGet({}),
  contact: () => fakeGet({}),
};
const link = (url: string, name: string) =>
  `<a href="${url}" class="underline hover:text-indigo-400">${name}</a>`;
const linkListItem = (url: string, name: string) =>
  `<li>${link(url, name)}</li>`;

const Spinner = '<span is-="spinner" variant-="dots"></span>';
type AfterStringFunc = (characters: string) => Promise<void>;
const printSiteMap = async (
  typeit: TypeIt,
  afterString?: AfterStringFunc,
  path?: string,
) => {
  if (!path) {
    const output = Object.entries(siteMap).reduce(
      (output, [name, url]) =>
        (output += linkListItem(url, name + " " + (commandEmojis[name] || ""))),
      '<ul marker-="open tree">',
    );
    typeit.type(output + "</ul>", { afterString });
  } else if (path in sectionList) {
    typeit.type(`${Spinner} - Loading ${path}`).flush(() => { });
    await sectionList[path]().then((list) => {
      typeit
        .delete(`Loading ${path}`.length + 4, { instant: true })
        .flush(() => { });
      const output = Object.entries(list).reduce(
        (output, [name, url]) => (output += linkListItem(url, name)),
        "",
      );
      typeit.type(
        `<ul marker-="tree">
                    <li>${link(siteMap[path] as string, path + " " + commandEmojis[path])}
                    <ul marker-="open tree">${output}</ul>
                  </li>
                </ul>`,
        { afterString },
      );
    });
  } else if (!(path in sectionList))
    typeit.type(`ls: cannot access '${path}': No such file or directory`);
};

const printHelp = (typeit: TypeIt) => {
  availableCommands.forEach((cmd) =>
    typeit
      .break()
      .type(
        `<span class="command-name ml-4">${cmd}</span>: ${commandEmojis[cmd]}  ${commandDescriptions[cmd]}`,
      ),
  );
  typeit.break();
};

const handleCommand = async (
  typeit: TypeIt,
  command: string,
  afterString: AfterStringFunc,
  navigate: (path: string) => void,
) => {
  typeit.break();
  if (!availableCommands.includes(command.trim().split(" ")[0]))
    typeit.type(`${command.trim()}: command not found. ${help}`);
  else if (command.trim() === "help") printHelp(typeit);
  else if (command.trim().split(" ")[0] === "cd")
    navigate(command.trim().split(" ")[1] || "");
  else if (command.trim().split(" ")[0] === "ls")
    await printSiteMap(typeit, afterString, command.trim().split(" ")[1] || "");
};

const Terminal: Component<Props> = (_props) => {
  let typeit!: TypeIt;
  let input!: HTMLInputElement;
  const focus = () => input.focus();
  const [currentCommand, setCurrentCommand] = createSignal<string>("");

  let dialog: HTMLDialogElement | undefined;
  onMount(() => {
    useAppState().send({ type: "TERMINAL_MOUNTED", dialog: dialog!, router: useRouter() });
  });

  let terminal!: HTMLDivElement;
  const setScroll = () =>
    terminal.children
      .item(terminal.children.length - 1)
      ?.scrollIntoView({ behavior: "smooth", block: "end" });
  const router = useRouter();
  const tryRoute: AfterStringFunc = async (characters) => {
    const container = document.createElement("div");
    container.innerHTML = characters;
    await Promise.all(
      Array.from(container.getElementsByTagName("a")).map((a) =>
        router.preloadRoute({ to: a.getAttribute("href")! }),
      ),
    ).then((r) => {
      console.log("Preloaded routes:", r);
    });
  };
  const navigate = (path: string) => router.navigate({ to: `/${path}` });
  const userTyped: JSX.EventHandler<HTMLInputElement, KeyboardEvent> = (ev) => {
    if (ev.key === "Enter")
      handleCommand(typeit!, currentCommand(), tryRoute, navigate).then(() => {
        typeit
          .break()
          .type(prompt, { instant: true })
          .flush(() => {
            input!.value = "";
            setScroll();
          });
      });
    else if (ev.key === "Backspace" && ev.currentTarget.value.length > 0)
      typeit.delete(1).flush(setScroll);
    else if (ev.key === "Tab") ev.preventDefault();
    else if (ev.key.length === 1) typeit.type(ev.key).flush(setScroll);
  };
  onMount(() =>
    import("typeit").then(({ default: TypeIt }) => {
      typeit = new TypeIt("#terminal", {
        strings: [
          welcome,
          // ...asciiArt.map(
          // 	(line) =>
          // 		`<span class="ascii-art">${line.replace(/ /g, "\u00a0")}</span>`,
          // ),
        ],
        lifeLike: false,
        speed: 1,
        nextStringDelay: 0,
        cursorChar: "█",
        afterComplete: () => {
          [help, prompt].forEach((str) => typeit.break().type(str));
          typeit.flush(focus);
        },
      }).go();
    }),
  );

  return (
    <dialog
      id="terminal-modal"
      ref={dialog}
      popover="manual"
      class="w-full h-1/2 pt-2 translate-y-full"
    >
      <div box-="square" shear-="top" class="h-full pb-[2.2rem]!">
        <div class="header">
          <span is-="badge" variant-="foreground2">
            Terminal
          </span>
        </div>
        <div
          id="terminal"
          ref={terminal}
          class="h-full overflow-y-scroll text-xs lg:text-md"
          onClick={focus}
        />
        <input
          class="opacity-0 text-indigo-200"
          ref={input}
          onKeyDown={userTyped}
          onInput={(e) =>
            setCurrentCommand(e.currentTarget.value.toLowerCase())
          }
        />
      </div>
    </dialog>
  );
};

export default Terminal;
