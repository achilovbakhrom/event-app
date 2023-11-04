import type { Event } from '@/models/event'

export type EventCreateResponse = {
  createEvent: Event
}

export type EventUpdateResponse = {
  updateEvent: Event
}

export type GetEventResponse = {
  getEvent: Event
}
