import { Dispatch, AnyAction } from 'redux'

export const mockDispatch: Dispatch<AnyAction> = (
  action: AnyAction,
) => action.type
