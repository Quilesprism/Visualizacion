
export const saveToken = (accessToken, refreshToken) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};


export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};


export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};


export const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
