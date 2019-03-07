import { Path, Paths } from 'core/store/paths.types'

const paths: Paths = {
  currentRoute: () => [
    'router',
    'location',
    'pathname',
  ] as Path,
}

export default paths
