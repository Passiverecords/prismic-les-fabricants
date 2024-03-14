<template>
  <NuxtLayout>
    <div class="wrapper">
      <template v-if="error.statusCode === 404">
        <header>
          <h1 class="title">
            La page à cette adresse semble ne pas / plus exister...
          </h1>
        </header>
        <NuxtLink @click="clearError({ redirect: '/' })" to="/"
          >Retourner en lieu sûr</NuxtLink
        >
      </template>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();
</script>

<style scoped>
.wrapper {
  padding-block: 2.4rem 10rem;
}
</style>
