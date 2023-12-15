<template>
  <MenuBarForProfile />
  <div v-if="infoUser" class="flex">
    <rectangle-info />
    <slot />
  </div>
  <footer-info />
</template>

<script>
import MenuBarForProfile from "@/components/MenuBarForProfile.vue";
import Footer from "@/components/Footer.vue";
import Rectangle from "@/components/Rectangle.vue";
import { getLocalStorage } from "@/utils/localStorage";
// import { computed } from "vue";

// const checkIfMobile = computed(() => {
//   return window.innerWidth < 1024;
// });

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
