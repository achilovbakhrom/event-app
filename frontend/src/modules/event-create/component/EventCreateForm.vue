<script setup lang="ts">
import { computed } from 'vue'
import useEventCreate from '../hooks/useEventCreate'
import VueDatePicker from '@vuepic/vue-datepicker'
import LocationSelect from '@/modules/shared/components/locationSelect/LocationSelect.vue'

const { submit, form$, state, loading, error } = useEventCreate()
const startDateError = computed(() => !!form$.value.startDate.$errors.length)
const endDateError = computed(() => !!form$.value.endDate.$errors.length)
</script>
<template>
  <div class="d-flex align-center justify-center h-100">
    <v-sheet class="w-50 pa-4" elevation="4" rounded>
      <form @submit.prevent="submit">
        <v-container>
          <v-row>
            <v-col class="d-flex justify-center">
              <h1>Create Event Form</h1>
            </v-col>
          </v-row>
          <v-row v-if="error">
            <v-col class="d-flex justify-center">
              <h5 :style="{ color: 'red' }">{{ error }}</h5>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" class="mt-6">
              <v-text-field
                label="Event Name"
                v-model="state.name"
                variant="outlined"
                :error-messages="form$.name.$errors.map((item) => item.$message).join(', ')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-n6">
            <v-col md="6">
              <vue-date-picker
                format="yyyy-MM-dd HH:mm:ss"
                v-model="state.startDate"
                placeholder="Start Date"
                :class="{ error: startDateError }"
              ></vue-date-picker>
            </v-col>
            <v-col md="6">
              <vue-date-picker
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="End Date"
                v-model="state.endDate"
                :class="{ error: endDateError }"
              ></vue-date-picker>
            </v-col>
          </v-row>
          <v-row class="mt-6">
            <v-col md="12">
              <v-textarea
                label="Description"
                variant="outlined"
                v-model="state.description"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4>Location</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <location-select v-model="state.location"></location-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-center">
              <v-btn color="info" width="30%" h="45" type="submit" :disabled="loading">
                Create
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </form>
    </v-sheet>
  </div>
</template>

<style>
.dp__input {
  height: 50px;
  border-color: #555;
}
.error .dp__input {
  border-color: red !important;
}
</style>
