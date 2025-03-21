const AuthTokens = (() => {
  let accessToken: string = "";

  return {
    getAccessToken: () => accessToken,
    getRefreshToken: () => {
      const token = localStorage.getItem("refreshToken");
      return token || "";
    },
    setAccessToken: (token: string) => {
      accessToken = token;
    },
    setRefreshToken: (token: string) => {
      localStorage.setItem("refreshToken", token);
    },
    removeTokens: () => {
      accessToken = "";
      localStorage.removeItem("refreshToken");
    },
    removeAccessToken: () => {
      accessToken = "";
    },
  };
})();

export const {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeTokens,
  removeAccessToken,
} = AuthTokens;
