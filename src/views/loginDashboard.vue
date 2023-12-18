<template>
  <div class="h-[100vh] flex bg_image text-white">
    <div class="container w-full md:w-[45%] px-4 sm:px-8 m-auto bg">
      <h1 class="m-auto w-[50%] text-center text-2xl font-bold mb-20">
        Admin Dashboard
      </h1>
      <!-- Start Form -->
      <form
        class="flex flex-col justify-start space-y-6"
        @submit.prevent="onSubmit"
      >
        <div class="row">
          <label class="flex flex-col" for="email">
            <span class="font-semibold">Email Address</span>
            <input
              id="email"
              class="px-2 sm:px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white text-black"
              type="email"
              placeholder="abc@gmail.com"
              autocomplete="username"
              v-model="email"
            />
          </label>
        </div>
        <div class="row">
          <label class="flex flex-col" for="password">
            <span class="font-semibold">Password</span>
            <input
              id="password"
              class="px-2 sm:px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white text-black"
              type="password"
              placeholder="Example"
              autocomplete="current-password"
              v-model="password"
            />
          </label>
        </div>
        <div class="row">
          <button
            v-if="!isPending"
            type="submit"
            class="py-3 text-center w-full bg-primary text-white font-bold rounded-lg"
          >
            Login
          </button>
          <button
            v-else
            type="button"
            class="py-3 text-center w-full bg-black text-white font-bold rounded-lg cursor-not-allowed disabled"
          >
            Loading...
          </button>
        </div>
      </form>

      <div v-if="error" class="text-left text-red-700 mt-4">
        <span>{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLoginDashboard } from "../composables/useLoginDashboard";

const router = useRouter();
const email = ref("");
const password = ref("");
const { error, isPending, loginDashboard } = useLoginDashboard();

async function onSubmit() {
  await loginDashboard(email.value, password.value);
  if (!error.value) router.push({ name: "UserDashboard" });
}
</script>
<style scoped>
.bg_image {
  background: linear-gradient(
    112deg,
    rgba(6, 11, 38, 0.94) 59.3%,
    rgba(26, 31, 55, 0) 100%
  );
}
</style>
