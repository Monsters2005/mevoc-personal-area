import React, { useEffect, useRef } from 'react';
import {
  useLocation, Route, Routes, useNavigate,
} from 'react-router';
import { ToastContainer } from 'react-toastify';

import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { DashboardPage } from './pages/Dashboard/Dashboard';
import { LearningPage } from './pages/Learning/Learning';
import ListManagementPage from './pages/ListManagement/ListManagement';
import 'react-toastify/dist/ReactToastify.css';
import { Notifications } from './components/UI/Notification/Notification';
import Modals from './components/Modals/ModalSelector';
import { PrivateLayout } from './layouts/PrivateLayout/PrivateLayout';
import { Path } from './constants/routes';
import { SettingsPage } from './pages/Settings/Settings';
import SignUpPage from './pages/SignUp/SignUp';
import { actions, pages, visiblePaths } from './constants/sidebar';
import { UserProfilePage } from './pages/UserProfile/UserProfile';
import { SignInPage } from './pages/SignIn/SignIn';
import SelectedWordsProvider from './providers/SelectedWordsProvider';
import PersonalizationLayout from './layouts/PersonalizationLayout/PersonalizationLayout';

function App() {
  const { pathname } = useLocation();
  const path = pathname.replace('/', '');

  const navigate = useNavigate();

  const preload = useRef<HTMLDivElement>(null);
  const withSidebar = visiblePaths.includes(path as Path);

  useEffect(() => {
    if (pathname === '/') navigate(Path.HOME);
  }, [pathname]);

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
                <PersonalizationLayout>
                  <Sidebar pages={pages} actions={actions} />
                  <div className="page_content">
                    <Routes>
                      <Route path={Path.HOME} element={<DashboardPage />} />
                      <Route
                        path={Path.LISTS}
                        element={(
                          <SelectedWordsProvider>
                            <ListManagementPage />
                          </SelectedWordsProvider>
                        )}
                      />
                      <Route
                        path={Path.PROFILE}
                        element={<UserProfilePage />}
                      />
                      <Route path={Path.SETTINGS} element={<SettingsPage />} />
                    </Routes>
                  </div>
                </PersonalizationLayout>
              </PrivateLayout>
            </div>
          ) : (
            <Routes>
              <Route path="/learning" element={<LearningPage />} />
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
