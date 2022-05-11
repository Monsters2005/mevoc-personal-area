import React from 'react';
import { SignUpForm } from './components/Auth/SignUpForm/SignUpForm';

function App() {
  return (
    <div className="App">
      <SignUpForm onSubmit={() => console.log('fine')} />
    </div>
  );
}

export default App;
