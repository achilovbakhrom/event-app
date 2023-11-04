import type { Location } from '@/models/location'

export type LocationListResponse = {
  getLocations: {
    total: number
    data: Location[]
  }
}
