<template>
    <div class="dashboard">
      <h1>Utilisateurs</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Actif</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.is_active ? 'Oui' : 'Non' }}</td>
            <td>
              <button @click="toggleActiveStatus(user)">{{ user.is_active ? 'Désactiver' : 'Activer' }}</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import api from '@/axios-api';
  
  export default {
    name: 'DashboardView',
    data() {
      return {
        users: [],
        error: null
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        api.get('/users')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            this.error = 'Erreur lors de la récupération des données des utilisateurs.';
            console.error('Error fetching users:', error);
          });
      },
      toggleActiveStatus(user) {
        // const updatedStatus = !user.is_active;
        // api.patch(`/users/${user.id}`, { is_active: updatedStatus })
        //   .then(response => {
        //     user.is_active = updatedStatus;  // Update the local user state to reflect changes
        //   })
        //   .catch(error => {
        //     console.error('Error updating user status:', error);
        //     this.error = 'Erreur lors de la mise à jour du statut de l\'utilisateur.';
        //   });
      }
    }
  };
  </script>
  
  <style>
  /* Styles optionnels */
  .error {
    color: red;
  }
  </style>
  