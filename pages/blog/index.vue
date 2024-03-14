<template>
  <div class="page wrapper">
    <header>
      <h1 class="title">Nos derniers articles</h1>
    </header>
    <template v-if="articles?.posts?.length">
      <ul class="flow">
        <li v-for="item in posts" :key="item.post.uid">
          <h2 class="post-title">
            <NuxtLink
              :to="{ name: 'blog-slug', params: { slug: item.post.uid } }"
            >
              {{ item.post.data.title }}
            </NuxtLink>
          </h2>
          <footer>
            <p>
              Par
              <NuxtLink
                class="post-author"
                :to="{
                  name: 'blog-auteurs-author_id',
                  params: {
                    author_id: getAuthorValue(item.post.data.author as IAuthor)
                      .id,
                  },
                }"
                >{{
                  getAuthorValue(item.post.data.author as IAuthor).name
                }}</NuxtLink
              >
            </p>
            <div class="c-pills">
              <NuxtLink
                :to="{
                  name: 'blog-categories-category_id',
                  params: {
                    category_id: category.uid ?? '',
                  },
                }"
                class="c-pill"
                v-for="category in item.categories"
                >{{ category.label }}</NuxtLink
              >
            </div>
          </footer>
        </li>
      </ul>
    </template>
    <template v-else>
      <p>Aucun article pour le moment. Un peu de patience...</p>
    </template>
  </div>
</template>

<script lang="ts" setup>
const prismic = usePrismic();

interface IAuthor {
  uid: string;
  data: {
    firstname: string;
    lastname: string;
  };
}

const { data: articles } = await useAsyncData("blog-posts", async () => {
  const posts = await prismic.client.getAllByType("blog_post", {
    fetchLinks: ["author.firstname", "author.lastname"],
    pageSize: 9,
  });
  const categories = posts.flatMap((post) => post.data.categories);
  const ids = Array.from(
    new Set(categories.map((item) => (item.category as any)?.id))
  );
  const categories_data = await prismic.client.getAllByIDs(ids);
  return { posts, categories: categories_data };
});

const posts = computed(() => {
  const data = articles.value;
  return data?.posts.map((item) => {
    return {
      post: item,
      categories: item.data.categories.map((item) =>
        getCategory((item.category as any)?.uid, data.categories as any)
      ),
    };
  });
});

function getCategory(
  uid: string,
  categories: Array<{ uid: string; data: { label: string } }>
) {
  const match = categories.find((i) => i.uid === uid);
  return {
    label: match?.data.label,
    uid: match?.uid,
  };
}

function getAuthorValue(author: IAuthor) {
  return {
    name: `${author.data.firstname} ${author.data.lastname}`,
    id: author.uid,
  };
}

useSeoMeta({
  title: "Nos derniers articles",
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2.6rem 0 10rem;
  padding: 0;
  --spacing: 3.8rem;

  .post-author {
    color: var(--surface-black);
  }

  .post-title {
    color: var(--surface-black);
    margin: 0;
    line-height: 1.25;
    a {
      color: inherit;
    }
  }

  li {
    display: grid;
    gap: 1rem;
    footer {
      display: grid;
      gap: inherit;
    }

    p {
      margin: 0;
    }
  }
}
</style>
