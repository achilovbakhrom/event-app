import MUTATION_REMOVE_EVENT from '@/gql/mutations/removeEvent'
import { useMutation } from '@vue/apollo-composable'
import { reactive } from 'vue'

type State = {
  data: any
  loading: boolean
  error: string | null
}

const useRemoveEventMutation = (refresh: Function) => {
  const state = reactive<State>({
    data: null,
    loading: false,
    error: null
  })

  const { mutate, onDone, onError } = useMutation<any>(MUTATION_REMOVE_EVENT)

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
  })

  const removeEvent = (id: number) => {
    state.error = null
    state.loading = true
    mutate({ id })
  }

  return { removeEvent, state }
}

export default useRemoveEventMutation
