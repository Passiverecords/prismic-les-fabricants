<script setup lang="ts">
import type { Heading } from "#build/components";
import { type Content, isFilled } from "@prismicio/client";

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
        "<br /><span class='mark'>$&</span>"
      )
    : slice.value.primary.title;
});

function next_title_level(
  level: InstanceType<typeof Heading>["$props"]["level"]
): InstanceType<typeof Heading>["$props"]["level"] {
  return (
    (
      {
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
      } as any
    )[level ?? 2] ?? 2
  );
}
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <Heading class="heading" :level="slice.primary.niveau_de_titre"
      ><span v-html="title"></span
    ></Heading>
    <ul v-if="slice.variation === 'default'">
      <li v-for="item of slice.items">
        <Heading
          v-if="isFilled.keyText(item.title)"
          :level="next_title_level(slice.primary.niveau_de_titre)"
          class="title project-title"
          >{{ item.title }}</Heading
        >
        <p v-if="isFilled.keyText(item.short_description)">
          {{ item.short_description }}
        </p>
        <PrismicImage :field="item.image"></PrismicImage>
        <NuxtPicture
          v-if="isFilled.image(item.image)"
          class="picture"
          :alt="item.image.alt ?? ''"
          format="avif,webp"
          :height="item.image.dimensions?.height ?? 100"
          :width="item.image.dimensions?.width ?? 0"
          :src="item.image.url"
        />
      </li>
    </ul>
    <ul v-if="slice.variation === 'withLinks'">
      <li v-for="item of slice.items">
        <Heading
          v-if="isFilled.keyText(item.title)"
          :level="next_title_level(slice.primary.niveau_de_titre)"
          class="title project-title"
        >
          <PrismicLink :field="item.link">
            {{ item.title }}
          </PrismicLink>
        </Heading>
        <p>{{ item.short_description }}</p>
        <NuxtPicture
          v-if="isFilled.image(item.image)"
          class="picture"
          :alt="item.image.alt ?? ''"
          format="avif,webp"
          :height="item.image.dimensions?.height ?? 100"
          :width="item.image.dimensions?.width ?? 0"
          :src="item.image.url"
          sizes="100vw md:460px"
        />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
section {
  container: project-container / inline-size;
}

.picture :deep(img) {
  height: auto;
}

.heading {
  font-size: clamp(3.6rem, 3.6rem + 6cqi, 9.6rem);
  margin-block-start: 3.6rem;
  margin-block-end: 3.6rem;
}

a {
  text-decoration: none;
  color: inherit;
  &::after {
    content: "";
    position: absolute;
    display: block;
    inset: 0;
  }
}

.project-title {
  margin: 0;
  font-size: clamp(2.6rem, 2.6rem + 1cqi, 3.6rem);
}

li {
  position: relative;
}

ul {
  margin: 0;
  padding: 0;
  display: grid;
  gap: 3.6rem;
  list-style: none;
}

img {
  aspect-ratio: 1;
  object-fit: cover;
}

@container project-container (min-inline-size: 680px) {
  ul {
    margin-block-start: 10rem;
    gap: 5.6rem clamp(2.4rem, 2.4rem + 2cqi, 5.2rem);
    grid-template-columns: repeat(2, 1fr);
    max-inline-size: 960px;
    margin-inline: auto;

    li:nth-child(2n) {
      transform: translateY(-4.2rem);
    }
  }
}
</style>
