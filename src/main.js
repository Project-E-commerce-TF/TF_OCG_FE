// Other imports and configurations for your Vue app
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/tailwin.css";
import "./assets/style/global.css";
import { registerGlobalComponents } from "./utils/import";
import VueAwesomePaginate from "vue-awesome-paginate";
import Cookies from "js-cookie";

const app = createApp(App);
const axios = require("axios");

registerGlobalComponents(app);

axios.interceptors.request.use(
  (config) => {
    const cookieValue = Cookies.get("accessToken");
    if (cookieValue) {
      config.headers["Authorization"] = `Bearer ${cookieValue}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      originalRequest.headers["Authorization"] = `Bearer ${refreshToken}`;
      // router.push("/login");
      // try {
      //   // Make an API call to refresh the access token
      //   const response = await axios.post(
      //     "http://localhost:8080/refreshToken",
      //     {},
      //     {
      //       headers: {
      //         Authorization: `Bearer ${refreshToken}`,
      //       },
      //     }
      //   );

      //   // If the API call is successful, update the access token in the original request and retry it
      //   if (response.status === 200) {
      //     const newAccessToken = response.data.accessToken;
      //     originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      //     return axios(originalRequest);
      //   }
      // } catch (err) {
      //   // Handle the error from the API call
      //   console.error(err);
      // }
    }
    return Promise.reject(error);
  }
);

app.use(store);
app.use(router);
app.use(VueAwesomePaginate);
app.mount("#app");
