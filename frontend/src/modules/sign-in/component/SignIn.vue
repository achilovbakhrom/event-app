<template>
  <div class="d-flex justify-center align-center h-100">
    <v-sheet class="pa-8 flex-column w-25" elevation="4" rounded>
      <form @submit.prevent="submit">
        <h1 class="font-weight-bold text-center">Sign In</h1>
        <v-text-field
          v-model="state.email"
          :error-messages="form$.email.$errors.map((item) => item.$message).join(', ')"
          class="mt-8"
          variant="outlined"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="state.password"
          :error-messages="form$.password.$errors.map((item) => item.$message).join(', ')"
          class="mt-4"
          variant="outlined"
          label="Password"
          type="password"
        ></v-text-field>
        <v-btn type="submit" color="primary w-100 mt-2" height="40" :disabled="loading"
          >Sign In</v-btn
        >
        <div class="mt-4 text-center">
          Don't have an account? <router-link to="/auth/sign-up">Register</router-link>
        </div>
      </form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import useSignIn from '../hooks/useSignIn'
const { loading, form$, state, submit } = useSignIn()
</script>
