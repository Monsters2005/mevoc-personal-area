import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Notifications } from './components/UI/Notification/Notification';
import { NotificationType } from './@types/entities/Notification';
import { eventBus, EventTypes } from './packages/EventBus';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Notifications />
    </div>
  );
}

export default App;
