interface Props {
  class?: string;
}

export const GithubIcon = (props: Props) => (
  <span class={`icon-[streamline-logos--github-logo-2] ${props.class}`} />
);

export const LinkedinIcon = (props: Props) => (
  <span class={`icon-[streamline--linkedin-remix] ${props.class}`} />
);
export const MarkdownIcon = (props: Props) => (
  <span class={`icon-[streamline--markdown-document-programming-solid] ${props.class}`}></span>
);
