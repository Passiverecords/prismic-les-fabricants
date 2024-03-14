<template>
  <NuxtLayout>
    <div class="wrapper">
      <template v-if="error.statusCode === 404">
        <header>
          <h1 class="title">
            La page à cette adresse semble ne pas / plus exister...
          </h1>
        </header>
        <NuxtLink @click="clear()" to="/">Retourner en lieu sûr</NuxtLink>
      </template>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const { error } = toRefs(props);

function clear() {
  clearError();
}

const title = computed(() => {
  switch (error.value.statusCode) {
    case 404:
      return "Page introuvable";
    default:
      return "Une erreur est survenue";
  }
});

useSeoMeta({
  title,
});
</script>

<style scoped>
.wrapper {
  padding-block: 2.4rem 10rem;
}
</style>
