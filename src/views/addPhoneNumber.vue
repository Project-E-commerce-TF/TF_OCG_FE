<template>
  <div
    class="main p-10 font-bold text-3xl rounded-lg bg-gray_sidebar w-[50%] m-auto mt-20"
  >
    <div>
      <div class="flex gap-2">
        <label class="text-primary text--sm">Phone </label>
        <input
          type="text"
          v-model="phoneNumber"
          class="border-primary border-solid border rounded-lg grow"
        />
      </div>
      <div class="text-rose-700 text-xl text-center">{{ error }}</div>
      <div class="flex justify-center mt-5">
        <button
          class="text-white text-xl py-2 px-6 rounded-lg bg-primary hover:opacity-80"
          @click="submitNumber"
        >
          Submit
        </button>
      </div>
    </div>
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
        phoneNumber: Number(phoneNumber.value),
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
  height: 30vh;
}
</style>
