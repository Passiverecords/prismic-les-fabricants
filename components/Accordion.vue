<template>
  <div class="accordion" :class="{ '-is-open': open }">
    <button
      @click="toggle"
      :aria-expanded="open"
      :aria-controls="id"
      type="button"
    >
      <span><slot name="label"></slot></span>
      <svg
        width="32"
        height="32"
        :class="{ expanded: open }"
        viewBox="0 0 512 512"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="48"
          d="m112 184l144 144l144-144"
        />
      </svg>
    </button>
    <div v-show="open" :id="id" class="accordion-panel">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const id = useId();
const open = ref<boolean>(false);

function toggle() {
  open.value = !open.value;
}
</script>

<style lang="scss" scoped>
.accordion {
  --padding-inline: 1.6rem;
  border: solid 1px transparent;
  transition: background-color 200ms linear;
  border-radius: 0.6rem;
  &.-is-open {
    border-color: rgb(255 255 255 / 8%);
    padding-block: 0.6rem;
    background-color: rgb(255 255 255 / 8%);
    &:not(:last-child) {
      margin-block-end: 1.6rem;
    }
  }
  &-panel {
    animation: appear 0.2s linear;
    font-size: 1.8rem;
    padding-inline: var(--padding-inline);
  }
  button {
    appearance: none;
    background-color: transparent;
    color: var(--color-white);
    border-color: transparent;
    text-align: start;
    line-height: 1.25;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    width: 100%;
    justify-content: space-between;
    padding-inline: var(--padding-inline);
    font-size: 1.25em;
    &:focus-visible {
      outline-color: var(--color-green-soft);
    }

    svg {
      color: var(--color-green-soft);
      transition: rotate 0.2s ease-out;
      &.expanded {
        rotate: 0.5turn;
      }
      flex: 0 0 1.4em;
    }
  }
}

:deep(ul) {
  list-style-type: square;
  padding-inline: 2.4rem;
}

:deep(li) {
  margin-block-start: 1rem;
}

:deep(li::marker) {
  color: var(--color-green-soft);
  font-size: 1.05em;
}

@keyframes appear {
  from {
    opacity: 0;
  }
}
</style>
