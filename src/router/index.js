// import { NavbarPlugin } from "bootstrap-vue";
import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../components/HomeView.vue";
import HomeView from "../views/HomeOneView.vue";
import HistoryOneViewVue from "@/views/HistoryOneView.vue";
import LoginView from "../views/LoginOneView.vue";

const routes = [
  {
    path: "/",
    name: "nabung.index",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      authPage: true,
    },
  },
  {
    path: "/history",
    name: "nabung.history",
    component: HistoryOneViewVue,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      next({
        name: "login",
      });
      return;
    }
    next();
    return;
  }
  next();
  return;
});

export default router;
