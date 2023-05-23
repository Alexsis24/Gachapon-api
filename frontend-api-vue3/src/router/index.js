import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/AllGachaponMachinesView.vue"),
    },
    {
      path: "/addGacha",
      name: "addGacha",
      component: () => import("../views/CreateGachaponMachineView.vue"),
    },
    {
      path: "/createItem",
      name: "createItem",
      component: () => import("../views/CreateItemView.vue"),
    },
    {
      path: "/addReward",
      name: "addReward",
      component: () => import("../views/CreateRewardView.vue"),
    },    
    {
      path: "/GachaMachine",
      name: "GachaMachine",
      component: () => import("../views/SpecificGachaponMachineView.vue"),
    },
    {
      path: "/addItems",
      name: "addItems",
      component: () => import("../views/SpecificItemView.vue"),
    },
    
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;