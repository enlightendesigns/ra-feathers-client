import { Application } from '@feathersjs/feathers'

export default function submitFormData(
  client: Application,
  resource: string,
  formData: FormData,
  method: string,
  id?: string
): Promise<any> {
  const accessToken = client.settings.accessToken
  let baseUrl = client.service(resource).base

  if (id !== undefined) {
    baseUrl = `${baseUrl}/${id}`
  }

  return window
    .fetch(baseUrl, {
      method: method,
      headers: new Headers({
        Authorization: 'Bearer ' + accessToken
      }),
      body: formData
    })
    .then(response => response.json())
}
