<script setup lang="ts">
import { type Content, isFilled } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.ImagesSequenceSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const { slice } = toRefs(props);

const is_data_valid = computed(() => {
  return (
    slice.value.items.length === 5 &&
    slice.value.items.every((item) => isFilled.image(item.image))
  );
});
</script>

<template>
  <section
    class="pictures-sequence"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-if="is_data_valid"
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
          sizes="300px"
          decoding="async"
          loading="lazy"
        />
      </template>
    </div>
  </section>
  <p
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-else
  >
    Assurez-vous d'ajouter 5 images pour la section.
  </p>
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
    max-height: 300px;
  }
}

@media (min-width: 980px) {
  .pictures-sequence__inner {
    grid-template-columns: repeat(5, 1fr);
    gap: clamp(2.4rem, 2.4rem + 1vw, 3.6rem);
    max-inline-size: 1240px;
  }
  .picture:nth-child(4),
  .picture:nth-child(5) {
    display: block;
  }
}
</style>
