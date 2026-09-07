import { createMemoryHistory, createRouter } from "vue-router";

import Home from "./pages/Home.vue";
import Tasks from "./pages/Tasks.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/tasks", component: Tasks },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
