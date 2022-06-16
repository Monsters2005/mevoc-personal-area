import React from 'react';
import { useLocation, Route, Routes } from 'react-router';

import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { actions, pages } from './constants/sidebar';
import { DashboardPage } from './pages/Dashboard/Dashboard';
import { LearningPage } from './pages/Learning/Learning';
import ListManagementPage from './pages/ListManagement/ListManagement';
import { UserProfilePage } from './pages/UserProfile/UserProfile';
import { getLocationName } from './utils/getLocationName';

function App() {
  const location = useLocation();
  const locationName = getLocationName(location);
  return (
    <div className="App">
      <div className="main_container">
        {location.pathname !== '/learning' && (
          <Sidebar
            pages={pages}
            actions={actions}
            defaultActive={locationName}
          />
        )}

        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/lists-management" element={<ListManagementPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/learning" element={<LearningPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
