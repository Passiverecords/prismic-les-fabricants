<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ImagesSequenceSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section
    class="pictures-sequence"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-if="slice.items.length === 5"
  >
    <div class="pictures-sequence__inner">
      <template v-for="item in slice.items">
        <NuxtPicture
          class="picture"
          v-if="item.image.url"
          :alt="item.image.alt ?? ''"
          :src="item.image.url"
          :width="item.image.dimensions.width"
          :height="item.image.dimensions.height"
        />
      </template>
    </div>
  </section>
  <p v-else>Assurez-vous d'ajouter 5 images !</p>
</template>

<style scoped lang="scss">
.picture:nth-child(4),
.picture:nth-child(5) {
  display: none;
}

.picture {
  margin-inline: auto;
  overflow: hidden;
}

.pictures-sequence {
  width: 100vw;
  left: 50%;
  position: relative;
  translate: -50% 0;
}

.picture:nth-child(3n + 1) {
  height: 100%;
}
.picture:nth-child(3n + 2) {
  height: 96%;
}
.picture:nth-child(3n + 3) {
  height: 92%;
}

.pictures-sequence__inner {
  display: grid;
  align-items: center;
  gap: 1.6rem;
  max-inline-size: 1040px;
  margin-inline: auto;
  grid-template-columns: repeat(3, 1fr);

  :deep(img) {
    aspect-ratio: 3 / 4;
    object-fit: cover;
  }
}

@media (min-width: 980px) {
  .pictures-sequence__inner {
    grid-template-columns: repeat(5, 1fr);
    gap: clamp(2.4rem, 2.4rem + 1vw, 3.6rem);
  }
  .picture:nth-child(4),
  .picture:nth-child(5) {
    display: block;
  }
}
</style>
