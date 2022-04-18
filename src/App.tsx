import React from 'react';
import { Statistics } from './components/User/Statistics/Statistics';
import { list } from './mocks/list';

function App() {
  return (
    <div className="App">
      <Statistics list={list} />
    </div>
  );
}

export default App;
