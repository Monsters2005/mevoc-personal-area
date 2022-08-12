import React, { useRef } from 'react';
import { useLocation, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { Notifications } from './components/UI/Notification/Notification';
import { Path } from './constants/routes';
import { actions, pages, visiblePaths } from './constants/sidebar';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { PrivateLayout } from './layouts/PrivateLayout/PrivateLayout';
import { DashboardPage } from './pages/Dashboard/Dashboard';
import ListManagementPage from './pages/ListManagement/ListManagement';
import { SettingsPage } from './pages/Settings/Settings';
import { SignInPage } from './pages/SignIn/SignIn';
import SignUpPage from './pages/SignUp/SignUp';
import { UserProfilePage } from './pages/UserProfile/UserProfile';
import { useGetCurrentUserQuery } from './store/api/userApi';
import { getLocationName } from './utils/getLocationName';
import 'react-toastify/dist/ReactToastify.css';
import AddListModal from './components/Modals/ListsManagement/AddList';
import Modals from './components/Modals/ModalSelector';

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
