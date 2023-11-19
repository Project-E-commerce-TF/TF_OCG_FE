<template>
  <menu-bar />
  <slot />
  <footer-info />
</template>

<script>
import MenuBar from "@/components/MenuBar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    MenuBar,
    FooterInfo: Footer,
  },
};
</script>
