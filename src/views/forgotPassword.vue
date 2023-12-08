<template>
  <form
    @submit.prevent="submitEmail"
    class="p-10 font-bold text-3xl rounded-lg bg-gray_sidebar px-60 py-20 h-[100vh]"
  >
    <div class="mb-20 text-primary">Forgot password</div>
    <div class="flex flex-col gap-4 mb-6">
      <label class="text-xl text-primary">Your email</label>
      <input
        v-model="email"
        class="text-xl border-gray_footer border-solid border rounded-lg p-3"
      />
    </div>
    <div class="flex justify-between">
      <button
        type="submit"
        class="text-white text-xl py-4 px-6 rounded-lg bg-primary hover:opacity-80"
        @click="submitEmail"
      >
        Get link
      </button>
      <button
        type="button"
        class="font-bold text-primary text-xl py-4 px-6 rounded-lg bg-white border-primary border-solid border hover:opacity-80"
        @click="router.push({ name: 'Login' })"
      >
        Cancel
      </button>
    </div>
    <div class="text-rose-700 text-xl mt-5">{{ error }}</div>
  </form>
</template>

<script setup>
import { fetchData } from "@/utils/axiosFetchApi";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const error = ref("");

const submitEmail = async () => {
  try {
    if (!email.value) {
      error.value = "Email is required";
      return;
    }
    const res = await fetchData(
      `${process.env.VUE_APP_URL}/auth/forget-password`,
      "POST",
      { email: email.value }
    );
    if (res) {
      router.push({ name: "Login" });
    }
  } catch (err) {
    console.log(err);
    error.value = err;
  }
};
</script>

<style scoped></style>
