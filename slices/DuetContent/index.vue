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
        'text-only': slice.variation === 'textOnly',
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

<style scoped lang="scss">
.c-duet-content {
  container: duet-content / inline-size;
  .c-duet-content__inner {
    display: grid;
    gap: 2.4rem;

    &.reversed {
      .c-duet-content__panel:first-child {
        order: 2;
      }
    }

    &.text-only {
      gap: 1.6rem;
      .title {
        font-size: clamp(5.4rem, 4.2rem + 3cqi, 7.2rem);
        margin-block-end: 0;
        line-height: 1;

        .c-duet-content__subheader {
          display: block;
          color: var(--color-blue);
          font-size: 0.5em;
          line-height: 1;
        }
      }
    }

    .c-duet-content__content {
      text-wrap: pretty;
      font-size: clamp(1.6rem, 1.6rem + 1cqi, 2rem);
    }

    .title {
      font-weight: 400;
      margin-block-start: 0;
      font-size: clamp(2.4rem, 2.4rem + 2cqi, 4.6rem);
    }

    .c-duet-content__cta {
      display: inline-block;
      color: var(--color-white);
      background-color: var(--surface-black);
      padding: 1.2rem 1.4rem;
      font-size: 1.1em;
      text-decoration: none;
      border-radius: 0.6rem;
      text-align: center;
      border: solid 1px var(--surface-black);
      transition: all 200ms linear;
      &:hover,
      &:focus-visible {
        background-color: var(--color-white);
        color: var(--surface-black);
      }
    }

    @container duet-content (min-inline-size: 820px) {
      display: grid;
      grid-template-columns: 1.2fr 1.1fr;
      gap: 3.6rem;
      padding: 1.6rem;

      .c-duet-content__content {
        line-height: clamp(150%, calc(150% + 1cqi), 2%);
      }
    }

    @container duet-content (min-inline-size: 1140px) {
      .title {
        grid-column: 1 / -1;
      }
    }
  }
}
</style>
