// import { NavbarPlugin } from "bootstrap-vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeOneView.vue";
// import LoginView from "../views/LoginOneView.vue";

import TesLogin from "../views/TesLogin.vue";
import Pocket from "../views/PocketOneView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/pockets/:id",
    name: "nabung.pockets",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: TesLogin,
    meta: {
      authPage: true,
    },
  },
  {
    path: "/",
    name: "nabung.index",
    component: Pocket,
    meta: {
      reload: true,
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next({
        name: "login",
      });
    }
  } else {
    next();
  }
});

export default router;
