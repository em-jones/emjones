
const javascript = import("highlight.js/lib/languages/javascript");
const typescript = import("highlight.js/lib/languages/typescript");
const python = import("highlight.js/lib/languages/python");
const ruby = import("highlight.js/lib/languages/ruby");
const elixir = import("highlight.js/lib/languages/elixir");
const go = import("highlight.js/lib/languages/go");
const rust = import("highlight.js/lib/languages/rust");
const java = import("highlight.js/lib/languages/java");
const csharp = import("highlight.js/lib/languages/csharp");
const css = import("highlight.js/lib/languages/css");
// const html = import("highlight.js/lib/languages/html");
const json = import("highlight.js/lib/languages/json");
const bash = import("highlight.js/lib/languages/bash");
const xml = import("highlight.js/lib/languages/xml");
const languages = {
  javascript,
  typescript,
  python,
  ruby,
  go,
  rust,
  java,
  csharp,
  css,
  json,
  bash,
  elixir,
  xml
};
import type { HLJSApi } from "highlight.js";

/**
 * Registers the selected languages with Highlight.js.
 * @param hljs - The Highlight.js core module.
 * @returns An array of promises that resolve when each language is registered.
 */
const registerLanguages = ({ default: hljs }: { default: HLJSApi }) =>
  Object.entries(languages).map(([lang, m]) => m.then((module) => hljs.registerLanguage(lang, module.default)))


/**
 * Highlights all code blocks on the page using Highlight.js.
 * @param hljs - The Highlight.js core module.
 */
const setHighlighting = (hljs: HLJSApi) => document.querySelectorAll('pre code')
  .forEach((e) => hljs.highlightElement(e as HTMLElement))
/**
 * Loads Highlight.js core and registers selected languages, then highlights all code blocks on the page.
 * @returns A promise that resolves when all code blocks have been highlighted.
 * #Example
 * ```ts
 * import { loadLanguages } from './use-hljs';
 * 
 * // Place within page load (onMount)
 * loadLanguages().then(() => {
 *  console.log('Code blocks highlighted!');
 * });
 */
export const loadLanguages = () => import("highlight.js/lib/core")
  .then(async (hljs) => {
    await Promise.all(registerLanguages(hljs));
    return hljs.default
  }).then(setHighlighting)
