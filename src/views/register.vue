<template>
  <div class="max-w-[800px] mx-auto">
    <div class="flex flex-col pt-10">
      <div class="w-40 text-center mx-auto">
        <img
          :src="require('@/assets/images/logo.png')"
          alt="logo_brand"
          class="w-full h-auto object-cover rounded-full"
        />
      </div>
      <div class="text-center mt-12">
        <h1 class="font-bold text-xl text-mouse_gray">
          Bring great experience to users!
        </h1>
      </div>
    </div>
    <div class="mt-8">
      <div class="container mx-auto px-8">
        <!-- Start Form -->
        <form
          class="flex flex-col justify-start space-y-6"
          @submit.prevent="onSubmit"
        >
          <div class="row">
            <label class="flex flex-col" for="username">
              <span class="font-semibold">Username</span>
              <input
                id="username"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white"
                type="text"
                placeholder="Le Duy Cuong"
                v-model="username"
              />
            </label>
          </div>
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
            <label class="flex flex-col" for="repeatPassword">
              <span class="font-semibold">Repeat Password</span>
              <input
                id="repeatPassword"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white"
                type="password"
                placeholder="Example"
                v-model="repeatPassword"
              />
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col" for="phoneNumber">
              <span class="font-semibold">Phone number</span>
              <input
                id="phoneNumber"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white"
                type="text"
                placeholder="090xxxxxxx"
                autocomplete="phoneNumber"
                v-model="phoneNumber"
              />
            </label>
          </div>
          <div class="row">
            <button
              v-if="!isPending"
              type="submit"
              class="py-3 text-center w-full bg-primary text-white font-bold rounded-lg"
            >
              Sign up
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

        <div v-if="error" class="text-left text-red-700 mt-4 font-bold text-xl">
          <span>{{ error }}</span>
        </div>

        <!-- Start Direction -->
        <div class="w-full text-center my-8 text-xl">
          <span class="font-semibold">I'm a already a member.</span>
          <span class="ml-1">
            <router-link
              :to="{ name: `Login`, params: {} }"
              class="text-primary font-bold hover:text-amber-400"
              >Login</router-link
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSignUp } from "@/composables/useSignUp";
import { useRouter } from "vue-router";
const { error, isPending, signup } = useSignUp();
const router = useRouter(),
  username = ref(""),
  email = ref(""),
  password = ref(""),
  phoneNumber = ref(""),
  repeatPassword = ref("");

async function onSubmit() {
  await signup(
    username.value,
    email.value,
    password.value,
    repeatPassword.value,
    phoneNumber.value
  );
  if (!error.value) router.push({ name: "Login" });
}
</script>
