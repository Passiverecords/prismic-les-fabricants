<template>
  <footer>
    <div class="wrapper">
      <div class="footer__top">
        <div class="footer__top-inner">
          <div>
            <h2 class="title">Prêt à coopérer ?</h2>
            <p>
              Vous cherchez une équipe pour accompagner votre transition
              digitale et incuber vos projets innovants ? Contactez-nous !
            </p>
          </div>
          <ContactForm @submit_message="handle_message($event)" />
        </div>
      </div>
      <div class="footer__bottom">
        <img src="/fabricants-logo-white.svg" alt="" />
        <p>Copyright @ {{ year }} Les Fabricants. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();

function handle_message(value: any) {
  console.log(value);
}
</script>

<style scoped>
footer {
  background-color: var(--surface-black);
  color: var(--color-white);
  padding-block: 3.6rem;
}

.footer__bottom {
  margin-block-start: 3.6rem;
  padding-block-start: 3.6rem;
  border-block-start: 1px solid rgb(200 200 200 / 0.5);
}

.footer__top {
  container-type: inline-size;
}

.footer__top-inner {
  .title {
    margin-block-start: 0;
    margin-block-end: clamp(1.6rem, 1.6rem + 1cqi, 2.6rem);
    font-size: clamp(2.4rem, 2.4rem + 1cqi, 3.8rem);
  }
  p {
    font-size: clamp(1.6rem, calc(1.1em + 0.2cqi), 2.6rem);
    line-height: calc(150% + 0.5cqi);
  }
}

@container (min-inline-size: 780px) {
  .footer__top-inner {
    display: grid;
    gap: 2.4rem;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
