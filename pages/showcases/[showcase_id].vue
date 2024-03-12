<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const route = useRoute("showcases-showcase_id");
const { data: page } = useAsyncData(
  `[showcase-uid-${route.params.showcase_id}]`,
  () => prismic.client.getByUID("showcase", route.params.showcase_id as string)
);

useHead({
  title: page.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: page.value?.data.meta_description,
    },
  ],
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
