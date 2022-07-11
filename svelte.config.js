import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: "docs",
      assets: "docs",
      // fallback: "200.html",
    }),
    paths:{
      base:"",
    },
  },
};

export default config;
