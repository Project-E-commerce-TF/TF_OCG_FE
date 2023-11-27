<template>
  <div
    class="p-10 font-bold text-3xl rounded-lg bg-gray_sidebar flex items-center flex-col gap-6"
  >
    <div>
      <img src="../assets/images/teenyicons_tick-circle-outline.png" alt="" />
    </div>
    <div class="text-xl text-green-600">Product added to cart</div>
    <button
      class="text-white text-xl py-4 px-10 rounded-lg bg-primary hover:opacity-80"
      @click="backToProduct"
    >
      Continue shopping
    </button>
    <div class="hover:text-rose-700 flex cursor-pointer" @click="backToCart">
      <div class="text-xl mr-2">View cart</div>
      <img src="../assets/images/icon_cart2.png" alt="" class="" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const backToCart = () => {
  // redirect về view cart
  //   router.push({ name: "CartEmpty" });
};

const backToProduct = () => {
  router.push({ name: "Products" });
};
</script>

<style lang="scss" scoped></style>
