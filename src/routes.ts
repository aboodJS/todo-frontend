import { createMemoryHistory, createRouter } from "vue-router";

import Home from "./pages/Home.vue";
import Signup from "./pages/Signup.vue";
import Login from "./pages/Login.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
