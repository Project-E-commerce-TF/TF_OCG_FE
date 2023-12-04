<template>
  <div
    class="main p-10 font-bold text-3xl rounded-lg bg-gray_sidebar flex flex-col justify-center gap-8"
  >
    <div class="text-primary text-center">Your phone number</div>
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
import { fetchData } from "@/utils/axiosFetchApi";
import { getLocalStorage } from "@/utils/localStorage";
import { regexPhoneNumberVn } from "@/utils/regexPhoneNumberVn";
import { ref } from "vue";
import { useRouter } from "vue-router";

const phoneNumber = ref("");
const error = ref("");
const router = useRouter();

const submitNumber = async () => {
  try {
    if (!regexPhoneNumberVn(phoneNumber.value)) {
      error.value = "Invalid phone number";
      return;
    }
    const userId = getLocalStorage("infoUser").userId;
    const res = await fetchData(
      `${process.env.VUE_APP_URL}/users/${userId}`,
      "PUT",
      {
        phoneNumber: phoneNumber.value,
      }
    );
    if (res) {
      router.push({ name: "Home" });
    }
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped>
.main {
  height: 100vh;
}
</style>
