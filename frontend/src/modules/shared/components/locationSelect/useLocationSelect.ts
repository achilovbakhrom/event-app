import QUERY_LOCATION_SELECT from '@/gql/queries/locationSelect'
import type { Location } from '@/models/location'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'

type LocationSelectResponse = {
  getSelectLocations: Location[]
}

const useLocationSelect = () => {
  const { loading, result, error } = useQuery<LocationSelectResponse>(
    QUERY_LOCATION_SELECT,
    {},
    { fetchPolicy: 'no-cache' }
  )
  const data = computed(() => result.value?.getSelectLocations ?? [])
  const model = ref()
  return { loading, data, error, model }
}

export default useLocationSelect
