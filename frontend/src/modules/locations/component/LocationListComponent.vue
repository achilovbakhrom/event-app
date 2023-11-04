<script setup lang="ts">
import AppHeader from '@/modules/header/component/AppHeader.vue'
import useLocationList from '../hooks/useLocationList'

const {
  loading,
  events,
  pagination,
  total,
  createItem,
  deleteItem,
  removeState,
  dialog,
  form$,
  formState,
  closeDialog
} = useLocationList()

const headers: any = [
  {
    title: 'ID',
    align: 'start',
    sortable: false,
    key: 'id'
  },
  { title: 'Lattitude', align: 'center', sortable: false, key: 'lattitude' },
  { title: 'Longitude', align: 'center', sortable: false, key: 'longitude' },
  { title: 'Actions', align: 'center', sortable: false, key: 'actions' }
]
</script>

<template>
  <app-header></app-header>
  <div class="pa-4">
    <v-sheet class="w-100 pa-3" elevation="4" rounded>
      <div class="d-flex row align-center">
        <h3 class="pa-4">Location List</h3>

        <v-spacer></v-spacer>
        <v-dialog width="500" v-model="dialog" persistent>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" color="success" variant="outlined">+ Add</v-btn>
          </template>
          <template #default>
            <v-card title="Create Location">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      label="Longitude"
                      variant="outlined"
                      v-model="formState.longitude"
                      :error-messages="
                        form$.longitude.$errors.map((item) => item.$message).join(', ')
                      "
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      label="Lattitude"
                      variant="outlined"
                      v-model="formState.lattitude"
                      :error-messages="
                        form$.lattitude.$errors.map((item) => item.$message).join(', ')
                      "
                    ></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Close" @click="closeDialog"></v-btn>
                <v-btn text="Save" @click="createItem"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
      <v-data-table
        :headers="headers"
        :items="events"
        item-key="name"
        :items-per-page="pagination.size"
        :loading="loading"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon size="small" :disabled="removeState.loading" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:bottom>
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
