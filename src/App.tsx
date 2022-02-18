import React from 'react';
import { DashboardWordPacks } from './components/Dashboard/WordPacks/WordPacks';
import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { Button } from './components/UI/Button/Button';
import { Logo } from './components/UI/Logo/Logo';
import { Switch } from './components/UI/Switch/Switch';
import { packs } from './mocks/packs';

function App() {
  return (
    <div className="App">
      <DashboardWordPacks packs={packs} />
    </div>
  );
}

export default App;
