import { Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { AppState } from 'core/store/state.types'

import sampleService from 'app/services/sample/sample.service'
import { SampleServiceInterface } from 'app/services/sample/sample.service.types'

import selectors from 'app/store/sample/sample.selectors'
import actions from 'app/store/sample/sample.actions'

import HomePage, {
  DispatchProps,
} from './HomePage'

export const mapStateToProps = (
  state: AppState,
) => ({
  sampleNumber: selectors.getSampleNumber(state),
  sampleThunking: selectors.getSampleThunking(state),
  sampleCountries: selectors.getSampleCountries(state),
  sampleCountry: selectors.getSampleCountry(state),
  sampleError: selectors.getSampleError(state),
})

export const mapDispatchToProps = (
  service: SampleServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
): DispatchProps => ({
  incrementSampleNumber: () => dispatch(actions.incrementSampleNumber()),
  decrementSampleNumber: () => dispatch(actions.decrementSampleNumber()),
  setSampleNumber: (value: number) => dispatch(actions.setSampleNumber(value)),
  fetchSampleCountries: () => dispatch(actions.fetchSampleCountries(service)(dispatch)),
  fetchSampleCountry: (code: string) => dispatch(actions.fetchSampleCountry(code, service)(dispatch)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps(sampleService),
)(withImmutablePropsToJS(HomePage))
