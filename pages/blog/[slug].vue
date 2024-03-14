<template>
  <div class="page wrapper">
    <header>
      <h1 class="title">{{ title }}</h1>
    </header>
    <div class="content">
      <PrismicRichText v-if="content" :field="content" />
    </div>
    <footer class="meta">
      <div class="c-pills">
        <NuxtLink
          class="c-pill"
          v-for="category in data?.categories"
          :to="{
            name: 'blog-categories-category_id',
            params: { category_id: category.uid },
          }"
        >
          {{ category.data.label }}
        </NuxtLink>
      </div>
      <p v-if="author" class="author">
        Par
        <NuxtLink
          :to="{
            name: 'blog-auteurs-author_id',
            params: { author_id: author.uid },
          }"
          >{{ author.fullname }}</NuxtLink
        >,
        <span v-if="data?.post.first_publication_date"
          >le {{ dateFormatter(data?.post.first_publication_date) }}</span
        >
      </p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute("blog-slug");
const prismic = usePrismic();

const { data, error } = await useAsyncData(
  `blog-post-${route.params.slug}`,
  async () => {
    const post = await prismic.client.getByUID("blog_post", route.params.slug);

    const author_id = (post.data.author as any)?.uid;
    const author = author_id
      ? await prismic.client.getByUID("author", author_id)
      : undefined;
    const categories = await prismic.client.getAllByUIDs(
      "blog_categories",
      post.data.categories.map((item) => (item.category as any)?.uid)
    );
    return { post, author, categories };
  }
);

if (error.value) {
  throw createError({
    fatal: true,
    cause: error.value?.cause,
    statusCode: 404,
  });
}

const author = computed(() => {
  return data.value?.author
    ? {
        fullname: `${data.value.author.data.firstname} ${data.value.author.data.lastname}`,
        uid: data.value.author.uid,
      }
    : undefined;
});

const title = computed(() => {
  return data.value?.post.data.title ?? "";
});

const content = computed(() => {
  return data.value?.post.data.content;
});

useSeoMeta({
  title,
  description: data.value?.post.data.meta_description,
  ogImage: data.value?.post.data.social_image.url,
});
</script>

<style scoped>
.content :deep(:where(h1, h2, h3, h4)) {
  font-family: "Crimson Pro", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.content :deep(a) {
  color: inherit;
}

.author {
  a {
    color: inherit;
  }
}

.content :deep(:where(p, ul, li):not(.block-img)) {
  max-inline-size: 65ch;
  text-wrap: pretty;
}

.meta {
  margin-block-start: 4.8rem;
}

.page {
  padding-block-end: 10rem;
}
</style>
