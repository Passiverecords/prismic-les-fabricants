<script setup lang="ts">
import { type Content, type RichTextField } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.TestimonialsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const limit = 500;

function is_long_content(value: RichTextField, limit = 300) {
  const result = value.reduce((acc, curr) => {
    return acc + (curr as { text: string }).text.length;
  }, 0);
  return result > limit;
}
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <template v-if="slice.variation === 'withTitle'">
      <Heading class="title" :level="slice.primary.level">{{
        slice.primary.title
      }}</Heading>
    </template>
    <ul>
      <li
        v-for="item in slice.items"
        class="testimonial"
        :class="{ 'is-long': is_long_content(item.content, limit) }"
      >
        <PrismicRichText class="content" :field="item.content" />
        <footer>
          <PrismicImage class="avatar" :field="item.author_image" />
          <div>
            <p>{{ item.author_name }}</p>
            <p>{{ item.author_role }}</p>
            <p>{{ item.author_company }}</p>
          </div>
        </footer>
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  container: testimonials / inline-size;
}

.avatar {
  aspect-ratio: 1;
  width: 100%;
  max-inline-size: 90px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1.6rem;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
}

.testimonial {
  font-size: clamp(1.6rem, 1.6rem +0.25cqi, 1.7rem);
  padding: 2.4rem;
  background-color: var(--color-gray);
  border-radius: 8px;
  display: grid;
  gap: 1.6rem;

  @container testimonials (min-inline-size: 680px) {
    &.is-long {
      grid-column: auto / span 2;
    }
  }

  .content {
    font-size: 1.1em;

    &:deep(> *) {
      margin-block: 0;
    }
  }

  footer {
    align-self: end;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.6rem;

    > div {
      display: grid;
      align-content: center;
    }

    p {
      font-size: 0.95em;
      margin-block: 0;
    }
  }
}

.title {
  font-size: clamp(2.4rem, 2.4rem + 2cqi, 4.8rem);
  margin-block: 1em min(3.6rem, 0.5em);
}
</style>
