<template>
  <menu-bar-for-profile />
  <div class="flex">
    <rectangle-info />
    <div class="w-full p-14">
      <status-order />
      <slot />
    </div>
  </div>
  <footer-info />
</template>

<script>
import MenuBarForProfile from "@/components/MenuBarForProfile.vue";
import Footer from "@/components/Footer.vue";
import Rectangle from "@/components/Rectangle.vue";
import StatusOrder from "@/components/StatusOrder.vue";
export default {
  components: {
    FooterInfo: Footer,
    RectangleInfo: Rectangle,
    StatusOrder,
    MenuBarForProfile,
  },
};
</script>
