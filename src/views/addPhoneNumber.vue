<template>
  <div
    class="main p-10 font-bold text-3xl rounded-lg bg-gray_sidebar flex flex-col justify-center gap-8"
  >
    <div class="text-primary text-center">You phone number</div>
    <input
      type="text"
      v-model="phoneNumber"
      class="border-primary border-solid border rounded-lg px-6 py-3 mx-40"
    />
    <div class="text-rose-700 text-xl text-center">{{ error }}</div>
    <button
      class="text-white text-xl py-4 px-6 rounded-lg bg-primary hover:opacity-80 mx-60"
      @click="submitNumber"
    >
      Get Link
    </button>
  </div>
</template>

<script setup>
import { regexPhoneNumberVn } from "@/utils/regexPhoneNumberVn";
import { ref } from "vue";

const phoneNumber = ref("");
const error = ref("");

const submitNumber = () => {
  if (!regexPhoneNumberVn(phoneNumber)) {
    error.value = "Invalid phone number";
    return;
  } else {
    // call api get link to reset password via email
  }
};
</script>

<style scoped>
.main {
  height: 100vh;
}
</style>
