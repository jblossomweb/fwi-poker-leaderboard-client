import { RestInterface } from 'core/services/rest.types'

export interface SampleRestInterface extends Partial<RestInterface> {
  post: RestInterface['post'],
}

export interface SampleServiceInterface {
  getAllSampleCountries: () => Promise<any>,
  getSampleCountryByCode: (code: string) => Promise<any>,
}
