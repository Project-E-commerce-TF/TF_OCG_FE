<template>
  <menu-bar />
  <div class="flex">
    <rectangle-info />
    <div class="w-full m-14">
      <status-order />
      <slot />
    </div>
  </div>
  <footer-info />
</template>

<script>
import MenuBar from "@/components/MenuBar.vue";
import Footer from "@/components/Footer.vue";
import Rectangle from "@/components/Rectangle.vue";
import StatusOrder from "@/components/StatusOrder.vue";
export default {
  components: {
    MenuBar,
    FooterInfo: Footer,
    RectangleInfo: Rectangle,
    StatusOrder,
  },
};
</script>
