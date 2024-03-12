<template>
  <component class="title" :is="tag"><slot></slot></component>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    level?: 1 | 2 | 3 | 4 | 5 | 6 | "1" | "2" | "3" | "4" | "5" | "6";
  }>(),
  {
    level: 2,
  }
);

const level = toRef(props, "level");

const tag = computed(() => {
  return `h${level.value}`;
});
</script>
