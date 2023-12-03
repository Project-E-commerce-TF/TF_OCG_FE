import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    meta: {
      layout: "main",
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/login-dashboard",
    name: "LoginDashboard",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/loginDashboard.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      layout: "personal",
    },
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/profile.vue"),
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      layout: "main",
    },
    component: () =>
      import(
        /* webpackChunkName: "Landing page" */ "../views/mainLandingPage.vue"
      ),
  },
  {
    path: "/cart",
    name: "CartEmpty",
    meta: {
      layout: "main",
    },
    component: () =>
      import(/* webpackChunkName: "cartEmpty" */ "../views/cartCheckout.vue"),
  },
  {
    path: "/category/:handle",
    name: "Category",
    component: () =>
      import(
        /* webpackChunkName: "category " */ "../components/CategoryBox.vue"
      ),
    props: true,
  },
  {
    path: "/products",
    name: "Products",
    meta: {
      layout: "main",
    },
    component: () =>
      import(
        /* webpackChunkName: "product" */ "../views/productCollection.vue"
      ),
  },
  {
    path: "/products/:handle",
    name: "Variant",
    meta: {
      layout: "main",
    },
    component: () => import("../views/variantItem.vue"),
  },
  {
    path: "/phone",
    name: "Phone",
    meta: {
      layout: "default",
    },
    component: () => import("../views/addPhoneNumber.vue"),
  },
  {
    path: "/pending",
    name: "Pending",
    meta: {
      layout: "order",
    },
    component: () => import("../views/pending.vue"),
  },
  {
    path: "/order-being-delivered",
    name: "Order-being-delivered",
    meta: {
      layout: "order",
    },
    component: () => import("../views/orderBeingDelivered.vue"),
  },
  {
    path: "/complete-the-order",
    name: "Complete-the-order",
    meta: {
      layout: "order",
    },
    component: () => import("../views/completeTheOrder.vue"),
  },
  {
    path: "/request-to-cancel-order",
    name: "Request-to-cancel-order",
    meta: {
      layout: "order",
    },
    component: () => import("../views/requestToCancelOrder.vue"),
  },
  {
    path: "/cancelled",
    name: "Cancelled",
    meta: {
      layout: "order",
    },
    component: () => import("../views/cancelled.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      layout: "default",
    },
    component: () => import("../views/dashBoard.vue"),
  },
  {
    path: "/dashboard/add-product",
    name: "AddProduct",
    meta: {
      layout: "default",
    },
    component: () => import("../views/addProduct.vue"),
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "not_found",
  //   component: () => import("../views/notFound.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
