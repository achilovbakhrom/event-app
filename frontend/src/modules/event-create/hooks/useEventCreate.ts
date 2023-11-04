import { computed, reactive, watch } from 'vue'
import { required, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useRoute, useRouter } from 'vue-router'
import useEventCreateMutation from './mutation'
import useGetEventById from './query'
import type { Location } from '@/models/location'

const initialState: {
  id?: number
  name: string
  startDate: string
  endDate: string
  description?: string
  location?: Location
} = {
  name: '',
  startDate: '',
  endDate: '',
  description: ''
}

const useEventCreate = () => {
  const route = useRoute()
  const router = useRouter()
  const state = reactive({ ...initialState })
  const rules = reactive({
    name: { required, minLength: minLength(5) },
    startDate: { required },
    endDate: { required }
  })

  const { createOrUpdateEvent, state: mutationState } = useEventCreateMutation(
    Boolean(route.query.id)
  )
  const id = computed(() => route.query.id)
  const { state: getEventState } = useGetEventById(id.value ? Number(id.value) : undefined)
  const loading = computed(() => mutationState.loading)
  const error = computed(() => mutationState.error)
  const form$ = useVuelidate(rules, state)

  watch(getEventState, () => {
    if (getEventState.data && getEventState.data.getEvent) {
      const currentEvent = getEventState.data.getEvent
      state.id = currentEvent.id
      state.name = currentEvent.name
      state.startDate = currentEvent.startDate
      state.endDate = currentEvent.endDate
      state.description = currentEvent.description
      state.location = currentEvent.location
    }
  })

  watch(mutationState, () => {
    if (!mutationState.error && mutationState.data) {
      router.back()
    }
  })

  const submit = async () => {
    await form$.value.$validate()
    const isValid = !form$.value.$invalid
    if (isValid) {
      createOrUpdateEvent({
        id: id.value ? Number(id.value) : undefined,
        name: state.name,
        startDate: state.startDate,
        endDate: state.endDate,
        description: state.description,
        location: state.location
      })
    }
  }

  return {
    submit,
    state,
    loading,
    error,
    form$
  }
}

export default useEventCreate
