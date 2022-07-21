import React, { useEffect } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { Notification } from '../../../@types/entities/Notification';
import { notificationTitle } from '../../../constants/notifications';
import { eventBus, EventTypes } from '../../../packages/EventBus';
import s from './Notification.module.scss';
import { NotficationsSvgSelector } from './NotificationsSvgSelector';

const baseNotification: ToastOptions = {
  icon: false,
  theme: 'dark',
  autoClose: 5000,
  hideProgressBar: true,
  style: {
    width: '400px',
    background: '#2A2B38',
    borderRadius: '20px',
    padding: '10px 10px',
    marginLeft: '-100px',
  },
};

export function Notifications() {
  useEffect(() => {
    const getNoticationTitle = (type: string) => notificationTitle[type as keyof typeof notificationTitle];

    function toastNotify(res: Notification) {
      const message = (
        <div className={s.notification_container}>
          <div className={s.notification_icon}>
            <NotficationsSvgSelector id={res.type} />
          </div>
          <div className={s.notification_content}>
            <h5 className={s.notification_title}>{res.title}</h5>
            <p className={s.notification_text}>{res.message}</p>
          </div>
        </div>
      );

      toast(res?.message ? message : getNoticationTitle(res.type), {
        ...baseNotification,
        ...res,
        type: res.type,
      });
    }

    function dismissNotify(id: number | string) {
      if (id) toast.dismiss(id);
    }

    eventBus.on(EventTypes.notification, toastNotify);
    eventBus.on(EventTypes.removeNotification, dismissNotify);

    return () => {
      eventBus.off(EventTypes.notification, toastNotify);
      eventBus.off(EventTypes.removeNotification, dismissNotify);
    };
  }, []);

  return <div />;
}
