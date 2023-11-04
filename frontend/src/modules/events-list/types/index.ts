import type { Event } from '@/models/event'

export type EventListResponse = {
  getEvents: {
    total: number
    data: Event[]
  }
}
