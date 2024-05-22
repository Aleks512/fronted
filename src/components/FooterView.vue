<template>
  <footer class="py-3 my-4">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item">
        <router-link to="/" class="nav-link px-2 text-muted">Accueil</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/legal-mentions" class="nav-link px-2 text-muted">Mentions légales</router-link>
      </li>
    </ul>
    <p class="text-center text-body-secondary">© 2024 Végie Bloggers. Tous droits réservés.</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterView'
}
</script>

<style scoped>
footer {
  background-color: #FFDE59 !important;
  padding: 1rem 0;
  width: 100%;
}
</style>
