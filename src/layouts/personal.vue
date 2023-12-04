<template>
  <MenuBarForProfile />
  <div v-if="infoUser" class="flex">
    <rectangle-info />
    <slot />
  </div>
  <h1 v-else class="text-4xl font-bold text-center m-40 text-rose-700">
    <router-link :to="{ name: `Login` }"> You have to Login </router-link>
  </h1>
  <footer-info />
</template>

<script>
import MenuBarForProfile from "@/components/MenuBarForProfile.vue";
import Footer from "@/components/Footer.vue";
import Rectangle from "@/components/Rectangle.vue";
import { getLocalStorage } from "@/utils/localStorage";

const infoUser = getLocalStorage("infoUser");
export default {
  data() {
    return {
      infoUser,
    };
  },
  components: {
    MenuBarForProfile,
    FooterInfo: Footer,
    RectangleInfo: Rectangle,
  },
};
</script>
