import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/tailwin.css";
import "./assets/style/global.css";
import { registerGlobalComponents } from "./utils/import";
import VueAwesomePaginate from "vue-awesome-paginate";
import Cookies from "js-cookie";
import { refreshAccessToken } from "./utils/axiosFetchApi";

const app = createApp(App);

registerGlobalComponents(app);
const axios = require("axios");

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
      refreshAccessToken();
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

app.use(store);
app.use(router);
app.use(VueAwesomePaginate);
app.mount("#app");
