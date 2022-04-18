import React from 'react';
import { DashboardActiveLists } from './components/Dashboard/ActiveLists/ActiveLists';
import { DashboardDailyProgress } from './components/Dashboard/DailyProgress/DailyProgress';
import { DashboardGreeting } from './components/Dashboard/Greeting/Greeting';
import { DashboardWordPacks } from './components/Dashboard/WordPacks/WordPacks';
import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { list } from './mocks/list';
import { wordPack } from './mocks/pack';

function App() {
  return (
    <div className="App">
      <Sidebar
        pages={{
          dashboard: {
            icon: 'house',
            name: 'Dashboard',
            path: '/',
          },
          listManagement: {
            icon: 'list',
            name: 'Lists Management',
            path: '/lists-management',
          },
          userProfile: {
            icon: 'user',
            name: 'User Profile',
            path: '/user-profile',
          },
          settings: {
            icon: 'settings',
            name: 'Settings',
            path: '/settings',
          },
        }}
        actions={[
          {
            label: 'Sign Out',
            action: () => console.log('sign out'),
            icon: 'signout',
            key: 'sign_out',
          },
          {
            label: 'Help',
            action: () => console.log('help'),
            icon: 'question',
            key: 'help',
          },
        ]}
        defaultActive="dashboard"
      />
      <div
        style={{
          left: '400px',
          position: 'absolute',
          top: '50px',
          display: 'flex',
        }}
      >
        <div>
          <DashboardGreeting name="Karina" />
          <div style={{ marginTop: '20px' }}>
            <DashboardActiveLists
              lists={[list]}
              onAddList={() => console.log('add')}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <DashboardWordPacks packs={[wordPack]} />
          </div>
        </div>
        <div style={{ marginTop: '100px', marginLeft: '40px' }}>
          <DashboardDailyProgress words={14} wordsLearned={7} />
        </div>
      </div>
    </div>
  );
}

export default App;
