import React, { RefObject, useEffect, useRef } from 'react';
import { useLocation, Route, Routes } from 'react-router';

import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { actions, pages, visiblePaths } from './constants/sidebar';
import { DashboardPage } from './pages/Dashboard/Dashboard';
import ListManagementPage from './pages/ListManagement/ListManagement';
import { SettingsPage } from './pages/Settings/Settings';
import { SignInPage } from './pages/SignIn/SignIn';
import SignUpPage from './pages/SignUp/SignUp';
import { UserProfilePage } from './pages/UserProfile/UserProfile';
import { useGetCurrentUserQuery } from './store/api/userApi';
import { getLocationName } from './utils/getLocationName';

function App() {
  const location = useLocation();
  const locationName = getLocationName(location);
  const preload = useRef<HTMLDivElement>(null);
  const withSidebar = visiblePaths.includes(locationName as any);
  // const { data: currentUser } = useGetCurrentUserQuery();

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
          {withSidebar ? (
            <>
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
            </>
          ) : (
            <Routes>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
