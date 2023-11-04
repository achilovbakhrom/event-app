import { onMounted, reactive, watch } from 'vue'
import type { EventListResponse } from '../types'
import { useLazyQuery } from '@vue/apollo-composable'
import QUERY_EVENT_LIST from '@/gql/queries/eventList'

type State = {
  data: EventListResponse | null
  loading: boolean
  error: string | null
}

const useEventListQuery = () => {
  const state = reactive<State>({
    data: null,
    loading: false,
    error: null
  })

  const pagination = reactive<{ page: number; size: number }>({
    page: 1,
    size: 20
  })

  const { load, refetch, onResult, onError, restart } = useLazyQuery<EventListResponse>(
    QUERY_EVENT_LIST,
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
    load(QUERY_EVENT_LIST, { filter: { page: pagination.page - 1, size: pagination.size } })
  })

  watch(pagination, () => {
    refetch({ filter: { page: pagination.page - 1, size: pagination.size } })
  })

  return { state, pagination, restart, refetch }
}

export default useEventListQuery
