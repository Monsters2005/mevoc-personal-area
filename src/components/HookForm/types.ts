import { Moment } from 'moment';
import {
  ControllerFieldState,
  ControllerRenderProps,
  Ref,
  UseFormStateReturn,
} from 'react-hook-form';

export type DatePickerState = {
  date: Moment | null;
};

export type DatePickerField = {
  name: string;
  onBlur: () => void;
  onChange: (e: Event) => void;
  ref: Ref;
  value: string;
};

export type Render = {
  [x: string]: any;
  field: ControllerRenderProps<
    {
      select: string;
      input: string;
    },
    'select'
  >;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<{
    select: string;
    input: string;
  }>;
};
