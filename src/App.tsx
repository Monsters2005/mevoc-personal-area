import React, { useRef } from 'react';
import { useLocation, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { DashboardPage } from './pages/Dashboard/Dashboard';
import { LearningPage } from './pages/Learning/Learning';
import ListManagementPage from './pages/ListManagement/ListManagement';
import 'react-toastify/dist/ReactToastify.css';
import { getLocationName } from './utils/components/getLocationName';
import { useGetCurrentUserQuery } from './store/api/userApi';
import { Notifications } from './components/UI/Notification/Notification';
import Modals from './components/Modals/ModalSelector';
import { PrivateLayout } from './layouts/PrivateLayout/PrivateLayout';
import { Path } from './constants/routes';
import { SettingsPage } from './pages/Settings/Settings';
import SignUpPage from './pages/SignUp/SignUp';
import { actions, pages, visiblePaths } from './constants/sidebar';
import { UserProfilePage } from './pages/UserProfile/UserProfile';
import { SignInPage } from './pages/SignIn/SignIn';

function App() {
  const { pathname } = useLocation();
  const locationName = getLocationName(pathname);
  const { data: currentUser } = useGetCurrentUserQuery();

  const preload = useRef<HTMLDivElement>(null);
  const withSidebar = visiblePaths.includes(pathname.replace('/', '') as Path);

  return (
    <div className="App">
      <ToastContainer />
      <Notifications />
      <Modals />
      <div className="preload" ref={preload}>
        <div className="main_container">
          {withSidebar ? (
            <div className="page_container">
              <PrivateLayout>
                <Sidebar
                  pages={pages}
                  actions={actions}
                  defaultActive={locationName}
                  user={currentUser}
                />
                <div className="page_content">
                  <Routes>
                    <Route
                      path={Path.HOME}
                      element={<DashboardPage user={currentUser} />}
                    />
                    <Route
                      path={Path.LISTS}
                      element={<ListManagementPage />}
                    />
                    <Route
                      path={Path.PROFILE}
                      element={<UserProfilePage user={currentUser} />}
                    />
                    <Route path={Path.SETTINGS} element={<SettingsPage />} />
                  </Routes>
                </div>
              </PrivateLayout>
            </div>
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
