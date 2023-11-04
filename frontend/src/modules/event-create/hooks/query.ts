import QUERY_GET_EVENT from '@/gql/queries/eventById'
import { useLazyQuery } from '@vue/apollo-composable'
import { onMounted, reactive } from 'vue'
import type { GetEventResponse } from '../types'

type State = {
  data: GetEventResponse | null
  loading: boolean
  error: string | null
}

const useGetEventById = (id?: number) => {
  const state = reactive<State>({
    data: null,
    loading: false,
    error: null
  })

  const { load, refetch, onResult, onError } = useLazyQuery<GetEventResponse>(
    QUERY_GET_EVENT,
    {},
    { fetchPolicy: 'no-cache' }
  )

  onResult((response) => {
    state.error = null
    state.data = response.data
    state.loading = false
  })

  onError((e) => {
    state.error = e.message
    state.loading = false
    state.data = null
  })

  onMounted(() => {
    if (id) {
      state.error = null
      state.loading = true
      const variables = { id: Number(id) }
      load(null, variables) ?? refetch(variables)
    }
  })

  return { state }
}

export default useGetEventById
