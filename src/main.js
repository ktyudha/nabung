import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import "./assets/css/main.css";
// import setAuthHeader from "./utils/setAuthHeader";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// axios.defaults.baseURL =
//   "https://celenga-berkah-default-rtdb.firebaseio.com/banks.json";
// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("token");
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxR54qd8Rg5BcAfGYd8Rh61_ctBNtZ58w",
  authDomain: "celenga-berkah.firebaseapp.com",
  databaseURL: "https://celenga-berkah-default-rtdb.firebaseio.com",
  projectId: "celenga-berkah",
  storageBucket: "celenga-berkah.appspot.com",
  messagingSenderId: "900568963957",
  appId: "1:900568963957:web:b8975d51e018a4075cd13c",
  measurementId: "G-9N1CDT0DX0",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = createApp(App);
app.use(router);
app.use(FontAwesomeIcon);
app.use(bootstrap);
app.mount("#app");

// createApp(App).use(router).use(bootstrap).mount("#app");
