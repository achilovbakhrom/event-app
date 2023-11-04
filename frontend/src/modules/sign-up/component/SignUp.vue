<template>
  <div class="d-flex justify-center align-center h-100">
    <v-sheet class="pa-8 flex-column w-25 text-center" elevation="4" rounded>
      <form @submit.prevent="submit">
        <h1 class="font-weight-bold">Sign Up</h1>
        <p :style="{ color: 'red' }" v-if="error">{{ error }}</p>
        <v-text-field
          class="mt-8"
          variant="outlined"
          label="Email"
          v-model="state.email"
          :error-messages="form$.email.$errors.map((item) => item.$message).join(', ')"
        ></v-text-field>
        <v-text-field
          variant="outlined"
          label="Password"
          type="password"
          v-model="state.password"
          :error-messages="form$.password.$errors.map((item) => item.$message).join(', ')"
        ></v-text-field>
        <v-text-field
          variant="outlined"
          label="Confirm Password"
          type="password"
          v-model="state.confirmPassword"
          :error-messages="form$.confirmPassword.$errors.map((item) => item.$message).join(', ')"
        ></v-text-field>
        <v-btn :disabled="loading" type="submit" color="primary w-100 mt-2" height="40"
          >Sign Up</v-btn
        >
        <div class="mt-4">
          Do you have an account already? <router-link to="/auth/sign-in">Login</router-link>
        </div>
      </form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import useSignUp from '../hooks/useSignUp'

const { submit, state, loading, form$, error } = useSignUp()
</script>
