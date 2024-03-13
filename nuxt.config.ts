// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/styles/global.scss"],
  experimental: {
    typedPages: true,
  },
  modules: ["@nuxtjs/prismic", "@nuxt/image"],
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
    head: {
      link: [
        { href: "https://fonts.googleapis.com", rel: "preconnect" },
        {
          href: "https://fonts.gstatic.com",
          rel: "preconnect",
          crossorigin: "anonymous",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&display=swap",
          rel: "stylesheet",
        },
      ],
    },
  },
  prismic: {
    endpoint: "blokche-les-fabricants",
  },
  image: {
    prismic: {},
  },
});
