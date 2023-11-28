<template>
  <cart-menu-bar />
  <slot />
  <cart-footer />
</template>

<script>
import CartMenuBar from "@/components/CartMenuBar.vue";
import CartFooter from "@/components/CartFooter.vue";
export default {
  components: {
    CartMenuBar,
    CartFooter,
  },
};
</script>
