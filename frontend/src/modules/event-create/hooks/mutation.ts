import { reactive } from 'vue'
import type { Event } from '@/models/event'
import type { EventCreateResponse, EventUpdateResponse } from '../types'
import { useMutation } from '@vue/apollo-composable'
import MUTATION_CREATE_EVENT from '@/gql/mutations/createEvent'
import MUTATION_UPDATE_EVENT from '@/gql/mutations/updateEvent'
import moment from 'moment'

type State = {
  data: EventCreateResponse | EventUpdateResponse | null
  loading: boolean
  error: string | null
}

const useEventCreateMutation = (isUpdate: boolean) => {
  const state = reactive<State>({
    data: null,
    loading: false,
    error: null
  })

  const { mutate, onDone, onError } = useMutation<EventCreateResponse | EventUpdateResponse>(
    isUpdate ? MUTATION_UPDATE_EVENT : MUTATION_CREATE_EVENT
  )

  onDone((response) => {
    state.error = null
    state.data = response.data ?? null
    state.loading = false
  })

  onError((e) => {
    state.data = null
    state.loading = false
    state.error = e.message
  })

  const createOrUpdateEvent = (event: Event) => {
    state.error = null
    state.loading = true
    mutate({
      ...event,
      startDate: moment(event.startDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z',
      endDate: moment(event.endDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z'
    })
  }

  return { createOrUpdateEvent, state }
}

export default useEventCreateMutation
