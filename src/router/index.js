import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    meta: {
      layout: "main",
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/mainLandingPage.vue"),
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
      layout: "cart",
    },
    component: () =>
      import(/* webpackChunkName: "CartEmpty" */ "../views/cartCheckout.vue"),
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
    path: "/cart",
    name: "Cart",
    meta: {
      layout: "cart",
    },
    component: () => import("../views/cartCheckout.vue"),
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
        component: () => import("../views/userDashboard.vue"),
      },
      {
        path: "product",
        name: "ProductDashboard",
        meta: {
          layout: "default",
        },
        component: () => import("../views/productDashboard.vue"),
      },
      {
        path: "order",
        name: "OrderDashboard",
        meta: {
          layout: "default",
        },
        component: () => import("../views/orderDashboard.vue"),
      },
      {
        path: "variant",
        name: "VariantDashboard",
        meta: {
          layout: "default",
        },
        component: () => import("../views/variantDashboard.vue"),
      },
      {
        path: "discount",
        name: "DiscountDashboard",
        meta: {
          layout: "default",
        },
        component: () => import("../views/discountDashboard.vue"),
      },
      {
        path: "product/edit/:id",
        name: "ProductEdit",
        meta: {
          layout: "default",
        },
        component: () => import("../views/productEditDashboard.vue"),
      },
    ],
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
  {
    path: "/dashboard/add-discount",
    name: "AddDiscount",
    meta: {
      layout: "default",
    },
    component: () => import("../views/addDiscount.vue"),
  },
  {
    path: "/phone-number",
    name: "PhoneNumber",
    meta: {
      layout: "default",
    },
    component: () => import("../views/addPhoneNumber.vue"),
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    meta: {
      layout: "default",
    },
    component: () => import("../views/changePassword.vue"),
  },
  {
    path: "/map",
    name: "Map",
    meta: {
      layout: "main",
    },
    component: () => import("../views/map.vue"),
  },
  {
    path: "/orderdetail/:orderId",
    name: "OrderDetail",
    meta: {
      layout: "personal",
    },
    component: () => import("../views/orderDetail.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    meta: {
      layout: "default",
    },
    component: () => import("../views/forgotPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    meta: {
      layout: "default",
    },
    component: () => import("../views/resetPassword.vue"),
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
