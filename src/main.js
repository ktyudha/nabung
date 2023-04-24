import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import "./assets/css/main.css";
// import setAuthHeader from "./utils/setAuthHeader";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { faPhone } from "@fortawesome/vue-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";

// library.add(faPhone);
// import store from "./store";

axios.defaults.baseURL = "https://nabungapi.inbework.site/api";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

const app = createApp(App);
app.use(router);
app.use(FontAwesomeIcon);
app.use(bootstrap);
app.mount("#app");

// createApp(App).use(router).use(bootstrap).mount("#app");
