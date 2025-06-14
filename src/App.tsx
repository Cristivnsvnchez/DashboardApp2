import { MsalProvider, useIsAuthenticated } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import React from 'react';

const msalInstance = new PublicClientApplication(msalConfig);

function AppContent() {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <Dashboard /> : <LoginPage />;
}

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AppContent />
    </MsalProvider>
  );
}
