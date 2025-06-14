import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';

export default function LoginPage() {
  const { instance } = useMsal();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-blue-300 to-blue-500 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <button
        onClick={() => instance.loginPopup(loginRequest)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Sign in with Microsoft
      </button>
    </div>
  );
}
