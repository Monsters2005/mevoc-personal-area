import { ReactNode } from 'react';
import { ToastProps } from 'react-toastify/dist/types';

export enum NotificationType {
  DANGER = 'error',
  INFO = 'info',
  SUCCESS = 'success',
}

export interface Notification extends Partial<ToastProps> {
  type: NotificationType;
  message: string | ReactNode;
  title?: string;
}
