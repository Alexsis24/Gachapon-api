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
      path: "/allItems",
      name: "allItems",
      component: () => import("../views/AllItemsView.vue"),
    },
    {
      path: "/viewSingleItem/:itemId",
      name: "viewSingleItem",
      component: () => import("../views/SpecificItemView.vue"),
      props: route => { return { itemDetailId: Number(route.params.itemId)}}
    },
    {
      path: "/viewGacha/:gachaId",
      name: "viewGacha",
      component: () => import("../views/SpecificGachaponMachineView.vue"),
      props: route => { return { gachaDetailId: Number(route.params.gachaId)}}
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