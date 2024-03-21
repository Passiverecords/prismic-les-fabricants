// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/styles/global.scss"],
  experimental: {
    typedPages: true,
  },
  modules: ["@nuxtjs/prismic", "@nuxt/image"],
  nitro: {
    prerender: {
      ignore: ["/preview", "/slice-simulator"],
    },
  },
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      link: [
        { href: "https://images.prismic.io", rel: "preconnect" },
        { href: "https://fonts.googleapis.com", rel: "preconnect" },
        {
          href: "https://fonts.gstatic.com",
          rel: "preconnect",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  prismic: {
    endpoint: "blokche-les-fabricants",
    clientConfig: {
      routes: [
        {
          type: "home",
          path: "/",
        },
        {
          type: "showcase",
          path: "/showcases/:uid",
        },
        {
          type: "blog_categories",
          path: "/blog/categories/:uid",
        },
        {
          type: "author",
          path: "/blog/auteurs/:uid",
        },
        {
          type: "blog_post",
          path: "/blog/:uid",
        },
      ],
    },
  },
  image: {
    prismic: {},
  },
});
