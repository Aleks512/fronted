<template>
  <footer class="footer py-4">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item">
        <router-link to="/" class="nav-link px-3 text-muted">Accueil</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/legal-mentions" class="nav-link px-3 text-muted">Mentions légales</router-link>
      </li>
    </ul>
    <p class="text-center text-muted">© 2024 Végie Bloggers. Tous droits réservés.</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterView'
}
</script>

<style scoped>
.footer {
  background-color: #FFDE59 !important; /* Couleur de fond */
  width: 100%;
  margin-top: auto; /* Assure que le footer reste en bas */
  padding: 20px 0;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1); /* Ajout d'une ombre légère */
}

.nav-link {
  font-weight: bold;
  color: #2c3e50;
  transition: color 0.3s ease; /* Animation de transition */
}

.nav-link:hover {
  color: #E60020 !important; /* Couleur rouge vif au survol */
  text-decoration: underline; /* Souligner les liens au survol */
}

p {
  font-size: 1rem;
  color: #2c3e50; /* Texte plus sombre */
}

.text-muted {
  color: #6c757d !important; /* Texte plus subtil pour le copyright */
}

@media (max-width: 768px) {
  .nav-link {
    font-size: 0.9rem; /* Réduction de la taille des liens sur mobile */
  }
  p {
    font-size: 0.8rem;
  }
}
</style>
