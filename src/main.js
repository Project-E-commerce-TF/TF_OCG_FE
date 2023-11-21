import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/tailwin.css";
import "./assets/style/global.css";
import { registerGlobalComponents } from "./utils/import";
import VueAwesomePaginate from "vue-awesome-paginate";

const app = createApp(App);
registerGlobalComponents(app);

app.use(store);
app.use(router);
app.use(VueAwesomePaginate);
app.mount("#app");
