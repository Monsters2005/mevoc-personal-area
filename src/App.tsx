import React from 'react';
import { useLocation, Route, Routes } from 'react-router';

import { Sidebar } from './components/Sidebar/Sidebar/Sidebar';
import { actions, pages } from './constants/sidebar';
import { DashboardPage } from './pages/Dashboard/Dashboard';
import ListManagementPage from './pages/ListManagement/ListManagement';
import { UserProfilePage } from './pages/UserProfile/UserProfile';
import { getLocationName } from './utils/getLocationName';

function App() {
  return <div className="App" />;
}

export default App;
