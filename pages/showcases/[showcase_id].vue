<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const route = useRoute("showcases-showcase_id");
const { data: page } = await useAsyncData(
  `[showcase-uid-${route.params.showcase_id}]`,
  () => prismic.client.getByUID("showcase", route.params.showcase_id as string)
);

useSeoMeta({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
});
</script>

<template>
  <div class="page wrapper">
    <header>
      <Heading level="1" class="title">{{ page?.data.meta_title }}</Heading>
    </header>
    <SliceZone
      wrapper="main"
      :slices="page?.data.slices ?? []"
      :components="components"
    />
  </div>
</template>

<style scoped>
.page {
  margin-block-end: 10rem;
}
</style>
