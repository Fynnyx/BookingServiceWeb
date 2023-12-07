// @/plugins/markdownit.ts
import md from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";

export default defineNuxtPlugin(() => {
  const renderer = md();
  renderer.use(MarkdownItAnchor);
  return {
    provide: {
      mdRenderer: renderer,
    },
  };
});