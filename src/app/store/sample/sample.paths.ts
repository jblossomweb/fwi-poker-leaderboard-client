import { Path, Paths } from 'core/store/paths.types'

const samplePaths: Paths = {
  number: () => [
    'sample',
    'number',
  ] as Path,
  country: () => [
    'sample',
    'country',
  ] as Path,
  countries: () => [
    'sample',
    'countries',
  ] as Path,
  thunking: () => [
    'sample',
    'thunking',
  ] as Path,
  error: () => [
    'sample',
    'error',
  ] as Path,
}

export default samplePaths
