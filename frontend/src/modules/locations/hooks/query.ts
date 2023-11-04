import { onMounted, reactive, watch } from 'vue'
import type { LocationListResponse } from '../types'
import { useLazyQuery } from '@vue/apollo-composable'
import QUERY_LOCATION_LIST from '@/gql/queries/locationList'

type State = {
  data: LocationListResponse | null
  loading: boolean
  error: string | null
}

const useLocationListQuery = () => {
  const state = reactive<State>({
    data: null,
    loading: false,
    error: null
  })

  const pagination = reactive<{ page: number; size: number }>({
    page: 1,
    size: 20
  })

  const { load, refetch, onResult, onError, restart } = useLazyQuery<LocationListResponse>(
    QUERY_LOCATION_LIST,
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
    load(QUERY_LOCATION_LIST, { filter: { page: pagination.page - 1, size: pagination.size } })
  })

  watch(pagination, () => {
    refetch({ filter: { page: pagination.page - 1, size: pagination.size } })
  })

  return { state, pagination, restart, refetch }
}

export default useLocationListQuery
