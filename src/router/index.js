import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    meta: {
      layout: "main",
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/MainLandingPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/login-dashboard",
    name: "LoginDashboard",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginDashboard.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      layout: "personal",
    },
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/Profile.vue"),
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      layout: "main",
    },
    component: () =>
      import(
        /* webpackChunkName: "Landing page" */ "../views/MainLandingPage.vue"
      ),
  },
  {
    path: "/cart",
    name: "CartEmpty",
    meta: {
      layout: "cart",
    },
    component: () =>
      import(/* webpackChunkName: "CartEmpty" */ "../views/CartCheckout.vue"),
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
        /* webpackChunkName: "product" */ "../views/ProductCollection.vue"
      ),
  },
  {
    path: "/products/:handle",
    name: "Variant",
    meta: {
      layout: "main",
    },
    component: () => import("../views/VariantItem.vue"),
  },
  {
    path: "/phone",
    name: "Phone",
    meta: {
      layout: "default",
    },
    component: () => import("../views/AddPhoneNumber.vue"),
  },
  {
    path: "/pending",
    name: "Pending",
    meta: {
      layout: "order",
    },
    component: () => import("../views/Pending.vue"),
  },
  {
    path: "/order-being-delivered",
    name: "Order-being-delivered",
    meta: {
      layout: "order",
    },
    component: () => import("../views/OrderBeingDelivered.vue"),
  },
  {
    path: "/complete-the-order",
    name: "Complete-the-order",
    meta: {
      layout: "order",
    },
    component: () => import("../views/CompleteTheOrder.vue"),
  },
  {
    path: "/request-to-cancel-order",
    name: "Request-to-cancel-order",
    meta: {
      layout: "order",
    },
    component: () => import("../views/RequestToCancelOrder.vue"),
  },
  {
    path: "/cancelled",
    name: "Cancelled",
    meta: {
      layout: "order",
    },
    component: () => import("../views/Cancelled.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    meta: {
      layout: "cart",
    },
    component: () => import("../views/CartCheckout.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      layout: "default",
    },
    children: [
      {
        path: "user",
        name: "UserDashboard",
        meta: {
          layout: "default",
        },
        component: () => import("../views/UserDashboard.vue"),
      },
      {
        path: "product",
        name: "ProductDashboard",
        meta: {
          layout: "default",
        },
        component: () => import("../views/ProductDashboard.vue"),
      },
      {
        path: "order",
        name: "OrderDashboard",
        meta: {
          layout: "default",
        },
        component: () => import("../views/OrderDashboard.vue"),
      },
      {
        path: "variant",
        name: "VariantDashboard",
        meta: {
          layout: "default",
        },
        component: () => import("../views/VariantDashboard.vue"),
      },
      {
        path: "discount",
        name: "DiscountDashboard",
        meta: {
          layout: "default",
        },
        component: () => import("../views/DiscountDashboard.vue"),
      },
      {
        path: "product/edit/:id",
        name: "ProductEdit",
        meta: {
          layout: "default",
        },
        component: () => import("../views/ProductEditDashboard.vue"),
      },
      {
        path: "discount/edit/:id",
        name: "DiscountEdit",
        meta: {
          layout: "default",
        },
        component: () => import("../views/DiscountEditDashboard.vue"),
      },
      {
        path: "order/edit/:id",
        name: "OrderEdit",
        meta: {
          layout: "default",
        },
        component: () => import("../views/OrderEditDashboard.vue"),
      },
      {
        path: "/add-discount",
        name: "AddDiscount",
        meta: {
          layout: "default",
        },
        component: () => import("../views/AddDiscount.vue"),
      },
    ],
    component: () => import("../views/DashBoard.vue"),
  },
  {
    path: "/dashboard/add-product",
    name: "AddProduct",
    meta: {
      layout: "default",
    },
    component: () => import("../views/AddProduct.vue"),
  },

  {
    path: "/phone-number",
    name: "PhoneNumber",
    meta: {
      layout: "default",
    },
    component: () => import("../views/AddPhoneNumber.vue"),
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    meta: {
      layout: "default",
    },
    component: () => import("../views/ChangePassword.vue"),
  },
  {
    path: "/map",
    name: "Map",
    meta: {
      layout: "main",
    },
    component: () => import("../views/Map.vue"),
  },
  {
    path: "/orderdetail/:orderId",
    name: "OrderDetail",
    meta: {
      layout: "personal",
    },
    component: () => import("../views/OrderDetail.vue"),
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    meta: {
      layout: "personal",
    },
    component: () => import("../views/Wishlist.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    meta: {
      layout: "default",
    },
    component: () => import("../views/ForgotPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    meta: {
      layout: "default",
    },
    component: () => import("../views/ResetPassword.vue"),
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // Nếu đã lưu vị trí cuộn, sử dụng nó
      return savedPosition;
    } else {
      // Nếu không có vị trí cuộn lưu trước đó, cuộn lên đầu trang
      return { top: 0 };
    }
  },
});

export default router;
