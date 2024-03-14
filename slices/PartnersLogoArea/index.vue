<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.PartnersLogoAreaSlice>([
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
    <div class="partners-area">
      <div class="partners-area__grid">
        <template v-for="image in slice.items">
          <NuxtPicture
            class="picture"
            v-if="image.partner_logo.url"
            :alt="image.partner_logo.alt ?? ''"
            decoding="async"
            :src="image.partner_logo.url"
            :width="image.partner_logo.dimensions.width"
            :height="image.partner_logo.dimensions.height"
            :img-attrs="{ class: 'partners-area__img' }"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners-area {
  container: partners / inline-size;
  padding: 3.2rem;
}

:deep(.partners-area__img) {
  filter: grayscale(1);
  opacity: 0.4;
  transition: all 200ms linear;
  height: auto;
}

:deep(.partners-area__img:hover) {
  filter: grayscale(0);
  opacity: 0.9;
}

.partners-area__grid {
  display: grid;
  max-inline-size: 980px;
  margin-inline: auto;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  align-items: center;
  @container partners (min-inline-size: 520px) {
    grid-template-columns: repeat(4, 1fr);

    .partners-area__img {
      scale: 0.9;
    }
  }

  @container partners (min-inline-size: 720px) {
    grid-template-columns: repeat(6, 1fr);
    .partners-area__img {
      scale: 1;
    }
  }
}
</style>
