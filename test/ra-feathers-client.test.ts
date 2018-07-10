import { feathersDataProvider, feathersAuthProvider } from '../src/ra-feathers-client'
describe('RA feathers client', () => {
  it('data and auth providers are correctly exposed', () => {
    expect(feathersDataProvider).toBeDefined()
    expect(feathersAuthProvider).toBeDefined()
  })
})
