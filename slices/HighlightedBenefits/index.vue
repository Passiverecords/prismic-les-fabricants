<script setup lang="ts">
import { type Content, isFilled } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.HighlightedBenefitsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const { slice } = toRefs(props);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="break-through c-hightlighted-benefits"
  >
    <div class="wrapper">
      <PrismicRichText
        class="title"
        :class="{ '-with-subtitle': isFilled.keyText(slice.primary.subtitle) }"
        :field="slice.primary.title"
      ></PrismicRichText>

      <p class="subtitle" v-if="isFilled.keyText(slice.primary.subtitle)">
        {{ slice.primary.subtitle }}
      </p>

      <div class="c-hightlighted-benefits__items">
        <template v-for="item in slice.items">
          <Accordion>
            <template #label>
              {{ item.label }}
            </template>
            <PrismicRichText :field="item.content" />
          </Accordion>
        </template>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.c-hightlighted-benefits {
  background-color: var(--surface-black);
  color: white;
  padding-block: 7.2rem;
  container-type: inline-size;
  &__items {
    display: grid;
    gap: 0.8rem;
  }
}

.title {
  font-size: max(3.2rem, 3.2rem + 1cqi);
  span {
    display: block;
    margin-block-start: 0.8rem;
    font-size: 0.825em;
    font-family: var(--font-base);
  }
}

.title:deep(*) {
  margin-block-start: 0;
  font-weight: 400;
}

.title.-with-subtitle:deep(*) {
  margin-block-end: 0;
}

.subtitle {
  margin-block-start: 0.4em;
  display: block;
  font-size: max(2.4rem, 2.4rem + 1cqi);
  color: var(--color-green-soft);
}
</style>
