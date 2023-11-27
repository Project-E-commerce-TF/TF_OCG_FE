<template>
  <div
    class="p-10 font-bold text-3xl rounded-lg bg-gray_sidebar flex flex-col justify-center gap-8"
  >
    <div class="text-primary text-center">
      You will receive a link to create a new password via email.
    </div>
    <input
      type="email"
      v-model="email"
      placeholder="Email"
      class="border-primary border-solid border rounded-lg px-6 py-3 mx-40"
    />
    <button
      class="text-white text-xl py-4 px-6 rounded-lg bg-primary hover:opacity-80 mx-60"
      @click="getLink"
    >
      Get Link
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const getLink = () => {
  // call api get link to reset password via email
};
</script>

<style lang="scss" scoped></style>
