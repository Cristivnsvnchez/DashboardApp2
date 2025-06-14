export const msalConfig = {
  auth: {
    clientId: "fd57a5c4-d82e-40f7-9940-72a3486cc75f",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
