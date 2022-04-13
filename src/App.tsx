import React from 'react';
import { UserCard } from './components/User/Card/Card';
import { user } from './mocks/user';

function App() {
  return (
    <div className="App">
      <UserCard userData={user} />
    </div>
  );
}

export default App;
