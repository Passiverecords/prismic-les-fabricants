<template>
  <div class="page wrapper">
    <header>
      <h1 class="title">{{ author?.fullname }}</h1>
      <NuxtImg
        v-if="author?.avatar.url"
        :src="author.avatar.url"
        :alt="author.fullname"
        :width="author.avatar.dimensions.width"
        :height="author.avatar.dimensions.height"
        sizes="160px"
        class="avatar"
      />
      <PrismicRichText :field="author?.biography" />
      <ul v-if="author?.socials?.length">
        <li v-for="social in author?.socials">
          <PrismicLink :field="social.link">{{ social.type }}</PrismicLink>
        </li>
      </ul>
    </header>
    <template v-if="data?.posts?.length">
      <h2>Les articles postés par {{ author?.fullname }}</h2>
      <ul v-if="data?.posts?.length">
        <li v-for="post in data.posts" :key="post.id">
          <NuxtLink :to="{ name: 'blog-slug', params: { slug: post.uid } }">{{
            post.data.title
          }}</NuxtLink>
        </li>
      </ul>
    </template>
    <template v-else>
      <p>
        Aucun article n'a encore été posté par {{ author?.fullname }}. Un peu de
        patience...
      </p>
    </template>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute("blog-auteurs-author_id");
const prismic = usePrismic();

const { data, error } = await useAsyncData(
  `auteur-${route.params.author_id}`,
  async () => {
    const author = await prismic.client.getByUID(
      "author",
      route.params.author_id
    );

    try {
      const posts = await prismic.client.getAllByType("blog_post", {
        filters: [prismic.filter.at("my.blog_post.author", author.id)],
        orderings: [{ field: "first_publication_date", direction: "asc" }],
        graphQuery: `{
        blog_post {
          title
          categories {
           category {
            uid
            label
            description
           }
          }
          author {
            ...on author {
              uid
              firstname
              lastname
            }
          }
        }
      }`,
      });
      return { author, posts };
    } catch (error) {
      console.error(error);
    }

    return { author };
  }
);

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Auteur introuvable",
  });
}

const author = computed(() => {
  if (data.value?.author) {
    return {
      fullname: `${data.value?.author.data.firstname} ${data.value?.author.data.lastname}`,
      biography: data.value.author.data.biography,
      socials: data.value.author.data.social_links,
      avatar: data.value.author.data.avatar,
    };
  }
});

useSeoMeta({
  title: author.value?.fullname,
});
</script>

<style scoped>
.avatar {
  width: 100%;
  max-width: 160px;
  height: 160px;
  object-fit: cover;
}

.page {
  margin-block-end: 10rem;
}
</style>
