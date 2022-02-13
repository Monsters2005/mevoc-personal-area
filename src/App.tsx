import React from 'react';
import { Button } from './components/UI/Button/Button';
import { Tabs } from './components/UI/Tabs/Tabs';

function App() {
  const options = {
    account: {
      value: 'Account',
    },
    appearance: {
      value: 'Appearance',
    },
    notifications: {
      value: 'Notifications',
    },
    about: {
      value: 'About',
    },
  };

  return (
    <div className="App">
      <Tabs
        options={options}
        defaultActive="account"
        onClick={active => console.log(active)}
      />
    </div>
  );
}

export default App;
