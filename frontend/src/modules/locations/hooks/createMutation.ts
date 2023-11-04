import MUTATION_CREATE_LOCATION from '@/gql/mutations/createLocation'
import MUTATION_REMOVE_LOCATION from '@/gql/mutations/removeLocation'
import { useMutation } from '@vue/apollo-composable'
import { reactive } from 'vue'

type State = {
  data: any
  loading: boolean
  error: string | null
}

const useCreateLocationMutation = (refresh: Function) => {
  const state = reactive<State>({
    data: null,
    loading: false,
    error: null
  })

  const { mutate, onDone, onError } = useMutation<any>(MUTATION_CREATE_LOCATION)

  onDone((response) => {
    state.error = null
    state.data = response.data ?? null
    state.loading = false
    refresh()
  })

  onError((e) => {
    state.data = null
    state.loading = false
    state.error = e.message
    refresh()
  })

  const createLocation = (longitude: string, lattitude: string) => {
    state.error = null
    state.loading = true
    mutate({ location: { longitude, lattitude } })
  }

  return { createLocation, state }
}

export default useCreateLocationMutation
