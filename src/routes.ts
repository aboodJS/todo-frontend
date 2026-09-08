import { createMemoryHistory, createRouter } from "vue-router";

import Home from "./pages/Home.vue";
import Tasks from "./pages/Tasks.vue";
import Signup from "./pages/Signup.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/tasks", component: Tasks },
  { path: "/signup", component: Signup },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
