import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      pages: "docs",
      assets: "docs"
    }),
    paths: {
      base: "/trentbaker.github.io",
    },
    prerender: {
      default: true,
    },
  },
};

export default config;
