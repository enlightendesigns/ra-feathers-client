import { ServiceMethods } from '@feathersjs/feathers'

declare module '@feathersjs/feathers' {
  interface ServiceMethods<T> {
    base: string
    connection(input?: Request | string, init?: RequestInit): Promise<Response>
  }
}
