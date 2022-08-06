import React, { useRef } from 'react';
import { useLocation, Route, Routes } from 'react-router';

import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { Loader } from './components/UI/Loader/Loader';
import { Path } from './constants/routes';
import { actions, pages, visiblePaths } from './constants/sidebar';
import { PrivateLayout } from './layouts/PrivateLayout/PrivateLayout';
import { DashboardPage } from './pages/Dashboard/Dashboard';
import ListManagementPage from './pages/ListManagement/ListManagement';
import { SettingsPage } from './pages/Settings/Settings';
import { SignInPage } from './pages/SignIn/SignIn';
import SignUpPage from './pages/SignUp/SignUp';
import { UserProfilePage } from './pages/UserProfile/UserProfile';
import { centeredLoader } from './shared/styles/loader-variations';
import { useSignoutMutation } from './store/api/authApi';
import { useGetCurrentUserQuery } from './store/api/userApi';
import { getLocationName } from './utils/getLocationName';

function App() {
  const { pathname } = useLocation();
  const locationName = getLocationName(pathname);

  const preload = useRef<HTMLDivElement>(null);
  //! Change this "any" below to a normal type 😠
  const withSidebar = visiblePaths.includes(pathname.replace('/', '') as Path);
  // const { data: currentUser } = useGetCurrentUserQuery();

  //! Use effect below is supposed to remove a class which hides all animations on preload
  //! But it's not working so I'll fix that later 😠
  // useEffect(() => {
  //   const node = preload.current; // corresponding DOM node
  //   if (node) node.className = '';
  // }, [location]);

  const { data: currentUser } = useGetCurrentUserQuery();

  return (
    <div className="App">
      <div className="preload" ref={preload}>
        <div className="main_container">
          {withSidebar ? (
            <div className="page_container">
              {/* <PrivateLayout> */}
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
                  <Route path={Path.LISTS} element={<ListManagementPage />} />
                  <Route path={Path.PROFILE} element={<UserProfilePage />} />
                  <Route path={Path.SETTINGS} element={<SettingsPage />} />
                </Routes>
              </div>
              {/* </PrivateLayout> */}
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
