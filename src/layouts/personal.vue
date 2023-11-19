<template>
  <menu-bar />
  <div class="flex">
    <rectangle-info />
    <slot />
  </div>
  <footer-info />
</template>

<script>
import MenuBar from "@/components/MenuBar.vue";
import Footer from "@/components/Footer.vue";
import Rectangle from "@/components/Rectangle.vue";
export default {
  components: {
    MenuBar,
    FooterInfo: Footer,
    RectangleInfo: Rectangle,
  },
};
</script>
