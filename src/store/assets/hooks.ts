import {
  useDispatch as useDispatchBase,
  useSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { DispatchType } from './types';
import { RootState } from '../rootReducer';

export const useDispatch: () => DispatchType = useDispatchBase;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
