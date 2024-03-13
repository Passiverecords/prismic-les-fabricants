<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.ProjectsListSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const { slice } = toRefs(props);

const title = computed(() => {
  const term =
    slice.value.primary.highlight_terms
      ?.split(",")
      .map((item) => item.trim()) ?? [];
  return term.length > 0
    ? slice.value.primary.title?.replaceAll(
        new RegExp(`${term.join("|")}`, "gi"),
        "<span class='mark'>$&</span>"
      )
    : slice.value.primary.title;
});
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <Heading class="heading" level="2"><span v-html="title"></span></Heading>
    <ul v-if="slice.variation === 'default'">
      <li v-for="item of slice.items">
        <p class="title">{{ item.title }}</p>
        <p>{{ item.short_description }}</p>
        <PrismicImage :field="item.image"></PrismicImage>
      </li>
    </ul>
    <ul v-if="slice.variation === 'withLinks'">
      <li v-for="item of slice.items">
        <PrismicLink :field="item.link">
          <p class="title">{{ item.title }}</p>
          <p>{{ item.short_description }}</p>
          <PrismicImage :field="item.image"></PrismicImage>
        </PrismicLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  padding: 2.4rem;
  container: project-container / inline-size;
}

.heading {
  font-size: clamp(2.4rem, 2.4rem + 1cqi, 4.8rem);
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
