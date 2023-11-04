<script setup lang="ts">
import AppHeader from '@/modules/header/component/AppHeader.vue'
import useEventList from '../hooks/useEventList'
import { RouterLink } from 'vue-router'
import VueDatePicker from '@vuepic/vue-datepicker'
import LocationSelect from '@/modules/shared/components/locationSelect/LocationSelect.vue'
import moment from 'moment'

const { loading, events, pagination, total, editItem, deleteItem, removeState, filter } =
  useEventList()

const headers: any = [
  {
    title: 'EventName',
    align: 'start',
    sortable: false,
    key: 'name'
  },
  { title: 'Start Date', align: 'center', sortable: false, key: 'startDate' },
  { title: 'End Date', align: 'center', sortable: false, key: 'endDate' },
  { title: 'Description', align: 'center', sortable: false, key: 'description' },
  { title: 'Location (Lon, Lat)', align: 'center', sortable: false, key: 'location' },
  { title: 'Actions', align: 'center', sortable: false, key: 'actions' }
]
</script>

<template>
  <app-header></app-header>
  <div class="pa-4">
    <v-sheet class="w-100" elevation="4" rounded>
      <div class="d-flex row align-center">
        <h3 class="pa-4">Event List</h3>
        <v-row class="mt-2">
          <v-col md="3">
            <vue-date-picker
              format="yyyy-MM-dd HH:mm:ss"
              v-model="filter.startDate"
              placeholder="Start Date"
              class="ml-2"
            ></vue-date-picker>
          </v-col>
          <v-col md="3">
            <vue-date-picker
              format="yyyy-MM-dd HH:mm:ss"
              v-model="filter.endDate"
              placeholder="End Date"
              class="ml-2"
            ></vue-date-picker>
          </v-col>
          <v-col md="3">
            <location-select v-model="filter.location"></location-select>
          </v-col>
        </v-row>

        <v-spacer></v-spacer>
        <router-link to="/events/create" class="mr-3">
          <v-btn color="success" variant="outlined">+ Add</v-btn>
        </router-link>
      </div>
      <v-data-table
        :headers="headers"
        :items="events"
        item-key="name"
        :items-per-page="pagination.size"
        :loading="loading"
      >
        <template #item.startDate="{ item }">
          {{ moment(item.startDate).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #item.endDate="{ item }">
          {{ moment(item.endDate).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #item.location="{ item }">
          <div class="font-weight-regular">
            ({{ (item.location?.longitude ?? '-') + ', ' + (item.location?.lattitude ?? '-') }})
          </div>
        </template>
        <template #item.actions="{ item }">
          <v-icon size="small" :disabled="removeState.loading" class="me-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" :disabled="removeState.loading" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template #bottom>
          <v-pagination
            v-model="pagination.page"
            :length="Math.ceil(total / pagination.size)"
          ></v-pagination>
        </template>
      </v-data-table>
    </v-sheet>
  </div>
</template>

<style>
.v-table__wrapper thead {
  background-color: #fafafa;
}

.dp__input {
  height: 56px;
  border-color: #555;
}
</style>
