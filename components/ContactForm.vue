<template>
  <form id="contact-form" ref="form" method="post" action="/contact">
    <label for="email">Votre email <sup aria-hidden="true">*</sup></label>
    <input required type="email" id="email" name="email" />
    <label for="message">Votre message <sup aria-hidden="true">*</sup></label>
    <textarea required name="message" id="message"></textarea>
    <button type="submit">Envoyer</button>
  </form>
</template>

<script lang="ts" setup>
const form = ref<HTMLFormElement>();
const emit = defineEmits<{
  (e: "submit_message", message: { email: string; content: string }): void;
}>();
</script>

<style scoped>
form {
  max-inline-size: 420px;
  display: grid;
  gap: 0.5em;
  justify-self: center;
  inline-size: 100%;
}

input,
textarea {
  border-radius: 8px;
  color-scheme: dark;
  border: solid 1px rgb(200 200 200 / 0.4);
}

textarea {
  min-block-size: 10ch;
  resize: vertical;
}

sup {
  font-size: 0.9em;
}

button {
  justify-self: start;
  background-color: var(--color-green-soft);
  border-radius: 6px;
  min-inline-size: 140px;
  border: none;
  margin-block-start: 2rem;
}
</style>
