<template>
  <div class="layout">
    <NuxtLoadingIndicator />
    <SiteHeader />
    <main ref="main_element" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script lang="ts" setup>
const config = useAppConfig();
const router = useRouter();
const main_element = ref<HTMLElement>();

function generate_title(value?: string): string {
  return `${value ?? "Document sans titre"} | ${config.name}`;
}

useHead({
  titleTemplate: (value) => generate_title(value),
  link: [
    {
      type: "image/x-icon",
      rel: "shortcut icon",
      href: "/logo-webclip.svg",
    },
    {
      type: "apple-touch-icon",
      href: "/logo-webclip-large.svg",
    },
  ],
});

router.afterEach((to, from) => {
  if (to.fullPath !== from.fullPath) {
    main_element.value?.focus?.({ preventScroll: true });
  }
});
</script>

<style scoped>
main {
  outline: none;
  flex: 1;
}
.layout {
  display: flex;
  flex-flow: column nowrap;
  min-block-size: 100dvh;
  min-block-size: 100dvd;
}
</style>
