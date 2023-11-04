<script setup lang="ts">
import useHeader from '../hooks/useHeader'
import { RouterLink } from 'vue-router'
const { signOutFn, loading } = useHeader()
</script>

<template>
  <v-toolbar prominent color="deep-purple">
    <v-toolbar-title class="font-weight-bold"> Events App </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="d-flex">
      <router-link to="/events">Events</router-link>
      <router-link class="ml-4 mr-8" to="/locations">Locations</router-link>
    </div>
    <v-btn icon @click="signOutFn" :disabled="loading">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<style scoped>
a {
  color: white;
  text-decoration: none;
  font-size: 22px;
}
.router-link {
  color: white;
}
.router-link-active {
  color: yellow;
}
</style>
