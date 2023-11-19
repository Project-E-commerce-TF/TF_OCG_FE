import { defineAsyncComponent } from "vue";

export function registerGlobalComponents(app) {
  app.component(
    "auth-layout",
    defineAsyncComponent(() => import("@/layouts/auth"))
  );
  app.component(
    "default-layout",
    defineAsyncComponent(() => import("@/layouts/default"))
  );
  app.component(
    "personal-layout",
    defineAsyncComponent(() => import("@/layouts/personal"))
  );
  app.component(
    "main-layout",
    defineAsyncComponent(() => import("@/layouts/main"))
  );
}
