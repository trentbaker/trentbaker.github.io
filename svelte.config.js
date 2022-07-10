import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      pages: "static/docs",
      assets: "static/docs",
    }),
    paths: {
      base: "/docs",
    },
    prerender: {
      default: true,
    },
  },
};

export default config;
