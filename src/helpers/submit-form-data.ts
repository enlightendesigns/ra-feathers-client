import { Application } from '@feathersjs/feathers'

export function submitFormData(
  client: Application,
  resource: string,
  formData: FormData,
  method: string,
  id?: string
): Promise<any> {
  let headers = {}
  if ('accessToken' in client.settings) {
    const accessToken = client.settings.accessToken
    headers = {
      headers: new Headers({
        Authorization: 'Bearer ' + accessToken
      })
    }
  }

  let baseUrl = client.service(resource).base

  if (id !== undefined) {
    baseUrl = `${baseUrl}/${id}`
  }

  return window
    .fetch(baseUrl, {
      method: method,
      ...headers,
      body: formData
    })
    .then(response => response.json())
}
