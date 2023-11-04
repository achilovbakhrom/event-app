import type { Location } from './location'

export type Event = {
  id?: number
  name: string
  startDate: string
  endDate: string
  description?: string
  location?: Location
}
