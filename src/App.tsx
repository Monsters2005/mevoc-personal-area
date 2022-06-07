import React from 'react';
import { useLocation, Route, Routes } from 'react-router';

import { DashboardActiveLists } from './components/Dashboard/ActiveLists/ActiveLists';
import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { Pages } from './components/Sidebar/Sidebar/types';
import { actions, pages } from './constants/sidebar';
import { list } from './mocks/list';
import { lists } from './mocks/lists';
import { DashboardPage } from './pages/Dashboard/Dashboard';
import ListManagementPage from './pages/ListManagement/ListManagement';
import { UserProfilePage } from './pages/UserProfile/UserProfile';
import { getLocationName } from './utils/getLocationName';

function App() {
  const location = useLocation();
  const locationName = getLocationName(location);
  return (
    <div className="App">
      <div className="main_container">
        <Sidebar
          pages={pages}
          actions={actions}
          defaultActive={locationName}
        />
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/lists-management" element={<ListManagementPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
