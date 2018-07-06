import { Application } from '@feathersjs/feathers'

export default function submitFormData(
  client: Application,
  resource: string,
  formData: FormData
): Promise<any> {
  const baseUrl = client.service(resource).base
  const accessToken = client.settings.accessToken

  return window
    .fetch(baseUrl, {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + accessToken
      }),
      body: formData
    })
    .then(response => response.json())
}
