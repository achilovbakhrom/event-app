import { computed, reactive, ref, watch } from 'vue'
import useEventListQuery from './query'
import { type Event } from '@/models/event'
import { useRouter } from 'vue-router'
import useRemoveEventMutation from './mutation'

const useEventList = () => {
  const filter = reactive<{ startDate: string; endDate: string; location: any }>({
    startDate: '',
    endDate: '',
    location: null
  })

  const { state, pagination, restart, refetch } = useEventListQuery()
  const { removeEvent, state: removeState } = useRemoveEventMutation(restart)
  const router = useRouter()

  const loading = computed(() => state.loading)
  const events = computed(() => state.data?.getEvents.data ?? [])
  const total = computed(() => state.data?.getEvents.total ?? 0)

  const editItem = (item: Event) => {
    router.push({
      path: '/events/create',
      query: { id: item.id }
    })
  }

  const deleteItem = (item: Event) => {
    if (item.id) {
      removeEvent(Number(item.id))
    }
  }

  watch(filter, () => {
    refetch({
      filter: {
        from: filter.startDate || null,
        to: filter.endDate || null,
        lattitude: filter.location?.lattitude,
        longitude: filter.location?.longitude,
        page: pagination.page - 1,
        size: pagination.size
      }
    })
  })

  return {
    loading,
    events,
    total,
    pagination,
    editItem,
    deleteItem,
    removeState,
    filter
  }
}

export default useEventList
