import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';
import { useState } from 'react';
import { LogIn, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { instance } = useMsal();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await instance.loginPopup(loginRequest);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-accent)] to-[var(--color-primary)] dark:from-gray-800 dark:via-gray-900 dark:to-black p-4">
      <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to continue</p>
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="flex items-center justify-center w-full px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              Sign in with Microsoft
            </>
          )}
        </button>
      </div>
    </div>
  );
}
