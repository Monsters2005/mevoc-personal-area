import React, { RefObject, useEffect, useRef } from 'react';
import { useLocation, Route, Routes } from 'react-router';

import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { actions, pages } from './constants/sidebar';
import { DashboardPage } from './pages/Dashboard/Dashboard';
import ListManagementPage from './pages/ListManagement/ListManagement';
import { SettingsPage } from './pages/Settings/Settings';
import { UserProfilePage } from './pages/UserProfile/UserProfile';
import { getLocationName } from './utils/getLocationName';

function App() {
  const location = useLocation();
  const locationName = getLocationName(location);
  const preload = useRef<HTMLDivElement>(null);

  //! Use effect below is supposed to remove a class which hides all animations on preload
  //! But it's not working so I'll fix that later 😠
  // useEffect(() => {
  //   const node = preload.current; // corresponding DOM node
  //   if (node) node.className = '';
  // }, [location]);

  return (
    <div className="App">
      <div className="preload" ref={preload}>
        <div className="main_container">
          <Sidebar
            pages={pages}
            actions={actions}
            defaultActive={locationName}
          />
          <div className="page_content">
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                path="/lists-management"
                element={<ListManagementPage />}
              />
              <Route path="/user-profile" element={<UserProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
