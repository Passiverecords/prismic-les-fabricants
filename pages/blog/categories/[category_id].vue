<template>
  <div class="page wrapper">
    <header>
      <h1 class="title">
        Articles associés à la catégorie &laquo;&nbsp;{{
          category_name
        }}&nbsp;&raquo;
      </h1>
      <template v-if="data?.posts.length">
        <ul>
          <li v-for="post in data.posts" :key="post.id">
            <NuxtLink :to="{ name: 'blog-slug', params: { slug: post.uid } }">
              {{ post.data.title }}</NuxtLink
            >
            par
            <NuxtLink
              :to="{
                name: 'blog-auteurs-author_id',
                params: {
                  author_id: get_author_data(post.data.author as IAuthorData)
                    .uid,
                },
              }"
            >
              {{
                get_author_data(post.data.author as IAuthorData).fullname
              }}</NuxtLink
            >
          </li>
        </ul>
      </template>
      <template v-else>
        <p>Aucun article dans la catégorie {{ data?.category.data.label }}</p>
      </template>
    </header>
  </div>
</template>

<script lang="ts" setup>
interface IAuthorData {
  uid: string;
  data: {
    firstname: string;
    lastname: string;
  };
}

const prismic = usePrismic();
const route = useRoute("blog-categories-category_id");

function get_author_data(value: IAuthorData) {
  return {
    uid: value.uid,
    fullname: `${value.data.firstname} ${value.data.lastname}`,
  };
}

const { data, error } = await useAsyncData(
  `blog-category-${route.params.category_id}`,
  async () => {
    const category = await prismic.client.getByUID(
      "blog_categories",
      route.params.category_id
    );

    const posts = await prismic.client.getAllByType("blog_post", {
      filters: [
        prismic.filter.at("my.blog_post.categories.category", category.id),
      ],
      graphQuery: `{
        blog_post {
          title
          uid
          author {
            ...on author {
              firstname
              lastname
            }
          }
        }
      }`,
    });

    return { category, posts };
  }
);

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Catégorie invalide",
  });
}

const category_name = computed(() => {
  return data.value?.category.data.label;
});

const title = computed(() => {
  return `Articles associés à la catégorie ${category_name.value}`;
});

useSeoMeta({ title });
</script>

<style scoped>
.page {
  margin-block-end: 100px;
}
</style>
