<template>
  <header>
    <div class="wrapper">
      <nav>
        <NuxtLink to="/">
          <img src="/les-fabricants-logo-black.svg" alt="Les Fabricants" />
        </NuxtLink>
        <a class="contact-anchor" href="#contact-form">Contact</a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup></script>

<style scoped>
header {
  padding-block: 2.4rem;
}

nav {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}

.contact-anchor {
  display: inline-block;
  padding: 0.6rem 1.6rem;
  font-size: 1.8rem;
  text-decoration: none;
  color: var(--color-white);
  background-color: var(--surface-black);
  border-radius: 6px;
  border: solid 1px var(--surface-black);
  &:hover,
  &:focus-visible {
    background-color: var(--color-white);
    color: var(--surface-black);
  }
}
</style>
