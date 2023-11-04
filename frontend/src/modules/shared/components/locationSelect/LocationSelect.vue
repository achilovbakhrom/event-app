<script setup lang="ts">
import useLocationSelect from './useLocationSelect'
import type { Location } from '@/models/location'
defineProps(['modelValue'])

const { data } = useLocationSelect()
const itemProps = (item: Location) => ({ title: `(${item.longitude},${item.lattitude})` })
</script>

<template>
  <v-select
    variant="outlined"
    label="Select"
    clearable
    :items="data"
    :item-props="itemProps"
    :model-value="modelValue"
    @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
  >
  </v-select>
</template>
