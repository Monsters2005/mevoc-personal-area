import React from 'react';
import { DashboardWordPacks } from './components/Dashboard/WordPacks/WordPacks';
import { packs } from './mocks/packs';

function App() {
  return (
    <div className="App">
      <DashboardWordPacks packs={packs} />
    </div>
  );
}

export default App;
