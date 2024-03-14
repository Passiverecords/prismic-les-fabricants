<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.HeroShowcaseSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <PrismicImage
      :field="slice.primary.showcasepicture"
      class="break-through"
    />

    <div class="showcase-content">
      <Heading level="2">{{ slice.primary.showcasetitle }}</Heading>
      <Heading level="3" v-if="slice.primary.showcaseBaseline">
        {{ slice.primary.showcaseBaseline }}
      </Heading>
      <p v-if="slice.primary.showcaseDescription">
        {{ slice.primary.showcaseDescription }}
      </p>
      <ul v-if="slice.items?.length" class="tags">
        <li class="tag" v-for="item in slice.items">
          {{ item.showcasetags }}
        </li>
      </ul>
      <PrismicLink class="c-call-to-action" :field="slice.primary.showcaseLink">
        {{ slice.primary.showcasetitle }}
      </PrismicLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.break-through {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-inline-size: revert;
}

.showcase-content {
  max-inline-size: 80ch;
}

img {
  margin-block: 3.6rem;
  object-fit: cover;
  min-block-size: max(420px, 50dvh);
}

.tags {
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  padding: 0;
  gap: 1.6rem;

  margin-block: 2.4rem;
  .tag {
    font-size: 0.9em;
    display: inline-block;
    padding: 0.6rem 1rem;
    border-radius: 100vw;
    border: solid 1px var(--surface-black);
    &::before {
      content: "# ";
    }
  }
}
</style>
