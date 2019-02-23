import { Dispatch, AnyAction } from 'redux'
import { getInitialState } from 'core/store/state.utils'
import { AppState } from 'core/store/state.types'

import { SampleService } from 'app/services/sample/sample.service'
import { mockUrl, mockRest } from 'app/services/sample/sample.service.test.mocks'

import selectors from 'app/store/sample/sample.selectors'
import actions from 'app/store/sample/sample.actions'

import { DispatchProps } from './HomePage'

import {
  mapStateToProps,
  mapDispatchToProps,
} from './index'

const mockService = new SampleService(mockUrl, mockRest)

describe('Pages/HomePage (redux wireup)', () => {
  describe('mapStateToProps', () => {
    const spies = {
      getSampleNumber: jest.spyOn(selectors, 'getSampleNumber'),
      getSampleThunking: jest.spyOn(selectors, 'getSampleThunking'),
      getSampleCountries: jest.spyOn(selectors, 'getSampleCountries'),
      getSampleCountry: jest.spyOn(selectors, 'getSampleCountry'),
    }
    const state: AppState = getInitialState()
    const stateProps = mapStateToProps(state)

    it('calls selectors.getSampleNumber to yield sampleNumber prop', () => {
      expect(spies.getSampleNumber).toHaveBeenCalled()
      expect(stateProps.sampleNumber).toEqual(selectors.getSampleNumber(state))
    })

    it('calls selectors.getSampleThunking to yield sampleThunking prop', () => {
      expect(spies.getSampleThunking).toHaveBeenCalled()
      expect(stateProps.sampleThunking).toEqual(selectors.getSampleThunking(state))
    })

    it('calls selectors.getSampleCountries to yield sampleCountries prop', () => {
      expect(spies.getSampleCountries).toHaveBeenCalled()
      expect(stateProps.sampleCountries).toEqual(selectors.getSampleCountries(state))
    })

    it('calls selectors.getSampleCountry to yield sampleCountry prop', () => {
      expect(spies.getSampleCountry).toHaveBeenCalled()
      expect(stateProps.sampleCountry).toEqual(selectors.getSampleCountry(state))
    })
  })

  describe('mapDispatchToProps', () => {
    const spies = {
      incrementSampleNumber: jest.spyOn(actions, 'incrementSampleNumber'),
      decrementSampleNumber: jest.spyOn(actions, 'decrementSampleNumber'),
      setSampleNumber: jest.spyOn(actions, 'setSampleNumber'),
      fetchSampleCountries: jest.spyOn(actions, 'fetchSampleCountries'),
      fetchSampleCountry: jest.spyOn(actions, 'fetchSampleCountry'),
    }
    const dispatch: Dispatch<AnyAction> = (action: AnyAction) => action.type

    const dispatchProps: DispatchProps = mapDispatchToProps(mockService)(dispatch)

    it('maps a dispatch to incrementSampleNumber action as incrementSampleNumber prop', () => {
      expect(dispatchProps.incrementSampleNumber()).toEqual(dispatch(actions.incrementSampleNumber()))
      expect(spies.incrementSampleNumber).toHaveBeenCalled()
    })

    it('maps a dispatch to decrementSampleNumber action as decrementSampleNumber prop', () => {
      expect(dispatchProps.decrementSampleNumber()).toEqual(dispatch(actions.decrementSampleNumber()))
      expect(spies.decrementSampleNumber).toHaveBeenCalled()
    })

    it('maps a dispatch to setSampleNumber action as setSampleNumber prop', () => {
      const value: number = 42
      expect(dispatchProps.setSampleNumber(value)).toEqual(dispatch(actions.setSampleNumber(value)))
      expect(spies.setSampleNumber).toHaveBeenCalled()
      expect(spies.setSampleNumber).toHaveBeenLastCalledWith(value)
    })

    it('maps a thunk dispatch to fetchSampleCountries action as fetchSampleCountries prop', () => {
      expect(
        dispatchProps.fetchSampleCountries()
      ).toEqual(dispatch(actions.fetchSampleCountries(mockService)(dispatch)))
      expect(spies.fetchSampleCountries).toHaveBeenCalled()
      expect(spies.fetchSampleCountries).toHaveBeenLastCalledWith(mockService)
    })

    it('maps a thunk dispatch to fetchSampleCountry action as fetchSampleCountry prop', () => {
      const value: string = 'US'
      expect(
        dispatchProps.fetchSampleCountry(value)
      ).toEqual(dispatch(actions.fetchSampleCountry(value, mockService)(dispatch)))
      expect(spies.fetchSampleCountry).toHaveBeenCalled()
      expect(spies.fetchSampleCountry).toHaveBeenLastCalledWith(value, mockService)
    })
  })
})
