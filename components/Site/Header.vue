<template>
  <header>
    <div class="container">
      <nav>
        <NuxtLink to="/">
          <img
            width="227"
            height="41"
            src="/les-fabricants-logo-black.svg"
            alt="Les Fabricants"
          />
        </NuxtLink>
        <a class="c-call-to-action" href="#contact-form">Contact</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  padding-block: 3.6rem;
}

nav {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
}
</style>
