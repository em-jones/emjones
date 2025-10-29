import "@tailwindplus/elements";
import { onMount, type ParentComponent } from "solid-js";
import Nav, { ShowOnNonHomePage, useIsHomePage } from "./Nav";
import Terminal from "./Terminal";

export const AppShell: ParentComponent = ({ children }) => {
	const isHomepage = useIsHomePage();
	return (
		<>
			<ShowOnNonHomePage>
				<el-dialog>
					<dialog id="sidebar" class="backdrop:bg-transparent md:hidden">
						<el-dialog-backdrop class="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"></el-dialog-backdrop>

						<div tabindex="0" class="fixed inset-0 flex focus:outline-none">
							<el-dialog-panel class="group/dialog-panel relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
								<div class="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out group-data-closed/dialog-panel:opacity-0">
									<button
										type="button"
										command="close"
										commandfor="sidebar"
										class="-m-2.5 p-2.5"
									>
										<span class="sr-only">Close sidebar</span>
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											data-slot="icon"
											aria-hidden="true"
											class="size-6 text-white"
										>
											<path
												d="M6 18 18 6M6 6l12 12"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</button>
								</div>

								<div class="bg-primary flex grow flex-col gap-y-5 overflow-y-auto dark:ring-1 dark:ring-white/10">
									<nav class="flex flex-1 flex-col">
										<Nav />
									</nav>
								</div>
							</el-dialog-panel>
						</div>
					</dialog>
				</el-dialog>
			</ShowOnNonHomePage>

			<ShowOnNonHomePage>
				<div class="hidden md:fixed md:inset-y-[-5] md:z-50 md:flex md:w-72 md:flex-col border-r border-white/10 h-full">
					<div class="bg-primary relative flex grow flex-col gap-y-5 overflow-y-auto dark:after:pointer-events-none dark:after:absolute dark:after:inset-y-0 dark:after:right-0 dark:after:w-px dark:after:bg-white/10">
						<nav class="flex flex-1 flex-col">
							<Nav />
							{/*
          <div role="list" class="flex flex-1 flex-col gap-y-7">
            <span class="mt-auto">
              <a
                href="#"
                class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-secondary"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  class="size-8 rounded-full bg-indigo-700 outline -outline-offset-1 outline-white/10 dark:bg-indigo-800"
                />
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">Tom Cook</span>
              </a>
            </span>
          </div>
        */}
						</nav>
					</div>
				</div>
			</ShowOnNonHomePage>
			<ShowOnNonHomePage>
				<div class="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-xs sm:px-6 md:hidden dark:bg-indigo-800 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10">
					<button
						type="button"
						command="show-modal"
						commandfor="sidebar"
						class="-m-2.5 p-2.5 text-indigo-200 hover:text-white md:hidden"
					>
						<span class="sr-only">Open sidebar</span>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							data-slot="icon"
							aria-hidden="true"
							class="size-6"
						>
							<path
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					<div class="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>
					<a href="#">
						<span class="sr-only">Your profile</span>
						<img
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
							class="size-8 rounded-full bg-indigo-700 outline -outline-offset-1 outline-white/10 dark:bg-indigo-800"
						/>
					</a>
				</div>
			</ShowOnNonHomePage>

			<main class={`py-10 h-[100vh] ${isHomepage() ? "" : "md:pl-72"}`}>
				<div class="px-2 sm:px-6 md:px-2 h-full">{children}</div>
				<Terminal />
			</main>
		</>
	);
};
