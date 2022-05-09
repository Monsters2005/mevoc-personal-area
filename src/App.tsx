import React from 'react';
import { EditSecurityForm } from './components/Settings/EditSecurityForm/EditSecurityForm/EditSecurityForm';
import { options } from './constants/two-auth';
import { user } from './mocks/user';

function App() {
  return (
    <div className="App">
      <EditSecurityForm user={user} options={options} />
    </div>
  );
}

export default App;
