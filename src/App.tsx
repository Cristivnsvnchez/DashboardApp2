import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from './authConfig';
import Dashboard from './Dashboard';
import React from 'react';

const msalInstance = new PublicClientApplication(msalConfig);

function SignInButton() {
  const { instance } = useMsal();
  return (
    <button
      onClick={() => instance.loginPopup(loginRequest)}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Sign in with Microsoft
    </button>
  );
}

function AppContent() {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <Dashboard /> : <div className="flex items-center justify-center min-h-screen"><SignInButton /></div>;
}

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AppContent />
    </MsalProvider>
  );
}
