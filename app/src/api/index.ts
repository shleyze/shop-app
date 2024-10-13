import axios from "axios";
import qs from "query-string";

export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_ADMIN_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // if ([401, 403].includes(error.response.status) && !originalRequest._retry) {
    //   console.log("error", error);
    //   // originalRequest._retry = true;
    //   // const accessToken = document.cookie("accessToken");
    //   //   if (accessToken) {
    //   //     try {
    //   //       const response = await axios.post(
    //   //         `http://localhost:3000/api/users/refresh-token`,
    //   //         {},
    //   //         { headers: { Authorization: `JWT ${accessToken}` } },
    //   //       );
    //   //       //     // don't use axious instance that already configured for refresh token api call
    //   //       const newAccessToken = response.data.token;
    //   //       localStorage.setItem("accessToken", newAccessToken); //set new access token
    //   //       originalRequest.headers.Authorization = `JWT ${newAccessToken}`;
    //   //       return axios(originalRequest); //recall Api with new token
    //   //     } catch (error) {
    //   //       //     // Handle token refresh failure
    //   //       //     // mostly logout the user and re-authenticate by login again
    //   //     }
    //   //   }
    // }
    return Promise.reject(error);
  },
);

export const openRouteClient = axios.create({
  baseURL: "https://api.openrouteservice.org",
  params: {
    api_key: process.env.EXPO_PUBLIC_OPEN_ROUTE_SERVICE_API_TOKEN,
    lang: "ru",
    sources: "openstreetmap",
  },
  headers: {
    Authorization: process.env.EXPO_PUBLIC_OPEN_ROUTE_SERVICE_API_TOKEN,
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "comma" });
  },
});
