type Notification = {
  text: string;
  date: string;
  createdAt: string;
};

type Response = {
  status: string;
  data: Notification;
};

export default class NotificationService {
  static route = 'notifications';
}
