export const msalConfig = {
  auth: {
    clientId: 'YOUR_CLIENT_ID',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};
