import axios from "axios";
import { Storage } from "@/shared/lib/util/storage-util.ts";
import {
  REFRESH_TOKEN_KEY,
  AUTH_TOKEN_KEY,
} from "@/shared/reducers/authentication.ts";

const TIMEOUT = 1 * 60 * 10000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = "https://backend-1-yz0k.onrender.com";
// axios.defaults.baseURL = "http://localhost:8080";

const setupAxiosInterceptors = (clearAuth) => {
      const refreshTokenAction = async (): Promise<undefined | string> => {
        try {
          const localStorageToken = Storage.local.get(REFRESH_TOKEN_KEY) || null;
          const sessionStorageToken = Storage.session.get(REFRESH_TOKEN_KEY) || null;
          const refreshToken = localStorageToken || sessionStorageToken;

          if (refreshToken) {
            const requestBody = {
              refreshToken,
            };

            const response = await axios.post("/refresh", requestBody);

            const newAccessToken = response?.data?.token;
            const newRefreshToken = response?.data?.refreshToken;

            if (newAccessToken) {
              if (localStorageToken) {
                Storage.local.set(AUTH_TOKEN_KEY, newAccessToken);
                Storage.local.set(REFRESH_TOKEN_KEY, newRefreshToken);
              } else {
                Storage.session.set(AUTH_TOKEN_KEY, newAccessToken);
                Storage.session.set(REFRESH_TOKEN_KEY, newRefreshToken);
              }
              return newAccessToken;
            }
          }
        } catch (error) {
          console.log(error, "Error refreshing token: ");
          clearAuth();
        }
      };

      const onResponseError = async (err) => {
        const status = err.status || (err.response ? err.response.status : 0);
        if (status === 403 || status === 401 && !err.config.url.endsWith("/refresh") ) {
          try {
            const newAccessToken = await refreshTokenAction();
            if (newAccessToken) {
              err.config.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios(err.config);
            }
          } catch (error) {
            console.log("error refreshing token2: ", error);
            clearAuth();
          }
        }

        return Promise.reject(err);
      };

      const onRequestSuccess = (config) => {
        const token =
          Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      };

      const onResponseSuccess = (response) => response;

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
