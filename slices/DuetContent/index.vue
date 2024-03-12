<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.DuetContentSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const { slice } = toRefs(props);
const title_level = computed(() => {
  return `h${slice.value.primary.title_level}`;
});

const title = computed(() => {
  const term = slice.value.items.map((item) => item.highlight_term);
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
    class="c-duet-content"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div class="c-duet-content__inner">
      <div class="c-duet-content__panel">
        <component class="title" :is="title_level"
          ><span v-html="title"></span
        ></component>
        <PrismicRichText
          class="c-duet-content__content"
          :field="slice.primary.content"
        />
        <template v-if="slice.variation === 'wIthCallToAction'">
          <PrismicLink
            width="90"
            height="90"
            class="c-duet-content__cta"
            :field="slice.primary.call_to_action_destination"
          >
            {{ slice.primary.call_to_action_label }}
          </PrismicLink>
        </template>
      </div>
      <div class="c-duet-content__panel">
        <PrismicImage :field="slice.primary.image" />
      </div>
    </div>
  </section>
</template>
