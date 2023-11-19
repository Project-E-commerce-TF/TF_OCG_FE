<template>
  <div class="mt-8">
    <div class="container mx-auto px-8">
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
              class="px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white"
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
              class="px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white"
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
        <div class="row">
          <button
            type="submit"
            class="py-3 justify-center w-full bg-grey_white text-mouse_gray font-bold rounded-lg flex"
          >
            Login or Sign up using
            <img
              src="../assets/images/logo_gg.png"
              alt="Logo"
              class="ml-2 w-6 h-full"
            />
          </button>
        </div>
      </form>

      <div v-if="error" class="text-left text-red-700 mt-4">
        <span>{{ error }}</span>
      </div>

      <!-- Start Direction -->
      <div class="w-full text-center mt-6">
        <span class="font-semibold">I'm a new user.</span>
        <span class="ml-1">
          <router-link
            :to="{ name: `Register`, params: {} }"
            class="text-primary font-bold"
            >Sign up</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useLogin } from "@/composables/useLogin";
export default {
  setup() {
    const { error, isPending, login } = useLogin();
    const router = useRoute();
    const email = ref("");
    const password = ref("");
    async function onSubmit() {
      await login(email.value, password.value);
      if (!error.value) router.push({ name: "Home", params: {} });
    }
    return { email, password, error, isPending, onSubmit };
  },
};
</script>
