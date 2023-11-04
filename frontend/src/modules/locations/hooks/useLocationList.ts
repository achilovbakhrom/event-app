import { computed, reactive } from 'vue'
import useLocationListQuery from './query'
import { type Location } from '@/models/location'
import useRemoveLocationMutation from './removeMutation'
import { ref } from 'vue'
import { required, numeric } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import useCreateLocationMutation from './createMutation'

const useLocationList = () => {
  const formState = reactive<Location>({
    longitude: '',
    lattitude: ''
  })

  const rules = reactive({
    longitude: { required, numeric },
    lattitude: { required, numeric }
  })
  const dialog = ref(false)
  const { state, pagination, restart } = useLocationListQuery()
  const { removeLocation, state: removeState } = useRemoveLocationMutation(restart)
  const { createLocation } = useCreateLocationMutation(() => {
    dialog.value = false
    restart()
  })

  const loading = computed(() => state.loading)
  const events = computed(() => state.data?.getLocations.data ?? [])
  const total = computed(() => state.data?.getLocations.total ?? 0)
  const form$ = useVuelidate(rules, formState)

  const createItem = async () => {
    await form$.value.$validate()
    const isValid = !form$.value.$invalid
    if (isValid) {
      createLocation(formState.longitude, formState.lattitude)
    }
  }

  const deleteItem = (item: Location) => {
    if (item.id) {
      removeLocation(Number(item.id))
    }
  }

  const closeDialog = () => {
    dialog.value = false
  }

  return {
    loading,
    events,
    total,
    pagination,
    createItem,
    deleteItem,
    removeState,
    dialog,
    form$,
    formState,
    closeDialog
  }
}

export default useLocationList
