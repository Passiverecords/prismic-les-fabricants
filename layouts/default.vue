<template>
  <div class="layout">
    <NuxtLoadingIndicator />
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script lang="ts" setup>
const config = useAppConfig();

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
</script>

<style scoped></style>
