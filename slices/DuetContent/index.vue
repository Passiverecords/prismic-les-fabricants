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
    <div
      class="c-duet-content__inner"
      :class="{
        reversed: slice.variation === 'default' && slice.primary.image_first,
      }"
    >
      <div class="c-duet-content__panel">
        <Heading class="title" :level="slice.primary.title_level">
          <span
            v-if="slice.variation === 'textOnly'"
            class="c-duet-content__subheader"
            >{{ slice.primary.sub_title }}</span
          >
          <span v-html="title"></span
        ></Heading>
        <PrismicRichText
          v-if="slice.variation !== 'textOnly'"
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
      <template v-if="slice.variation !== 'textOnly'">
        <div class="c-duet-content__panel">
          <PrismicImage :field="slice.primary.image" />
        </div>
      </template>
      <template v-else>
        <div class="c-duet-content__panel">
          <PrismicRichText
            class="c-duet-content__content"
            :field="slice.primary.content"
          />
        </div>
      </template>
    </div>
  </section>
</template>
