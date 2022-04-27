import React from 'react';
import { DashboardActiveLists } from './components/Dashboard/ActiveLists/ActiveLists';
import { list } from './mocks/list';

function App() {
  return (
    <div className="App">
      <div style={{ width: '100%' }}>
        <DashboardActiveLists
          lists={[list]}
          onAddList={() => console.log('add')}
        />
      </div>
    </div>
  );
}

export default App;
