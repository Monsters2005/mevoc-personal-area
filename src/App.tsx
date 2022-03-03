import React from 'react';
import { DashboardWordList } from './components/ListsManagement/WordList/WordList';
import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { Button } from './components/UI/Button/Button';
import { Logo } from './components/UI/Logo/Logo';
import { Switch } from './components/UI/Switch/Switch';
import { PageLayout } from './layouts/PageLayout/PageLayout';

function App() {
  return (
    <div className="App">
      <Logo />
      <PageLayout title="Lists Management">
        <DashboardWordList />
      </PageLayout>
    </div>
  );
}

export default App;
