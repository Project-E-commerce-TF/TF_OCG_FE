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
            <form
              action="https://gottago.cyou/api/auth/login-google"
              method="get"
            >
              <button
                type="submit"
                class="py-3 justify-center w-full bg-grey_white text-mouse_gray font-bold rounded-lg flex"
              >
                Login or Signup using
                <img
                  src="../assets/images/logo_gg.png"
                  alt="Logo"
                  class="ml-2 w-6 h-full"
                />
              </button>
            </form>
          </div>
        </form>

        <div v-if="error" class="text-left text-red-700 mt-4">
          <span>{{ error }}</span>
        </div>

        <!-- Start Direction -->
        <div class="w-full text-center mt-6">
          <span class="font-semibold">I'm a new user -></span>
          <span class="ml-1">
            <router-link
              :to="{ name: `Register`, params: {} }"
              class="text-primary font-bold hover:text-blue-200"
              >Sign up</router-link
            >
          </span>
          <span
            class="ml-3 cursor-pointer text-rose-700 font-bold hover:text-rose-200"
            ><router-link :to="{ name: 'ForgotPassword' }"
              >Forgot Password</router-link
            ></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLogin } from "@/composables/useLogin";
import Cookies from "js-cookie";
import { getLocalStorage } from "@/utils/localStorage";

const { error, isPending, login } = useLogin();
const route = useRoute();
const router = useRouter(),
  email = ref(""),
  password = ref("");
const tartget = {
  userId: 0,
  userName: "",
  email: "",
  role: "",
  userType: "",
  accessToken: "",
  refreshToken: "",
};

async function onSubmit() {
  await login(email.value, password.value);
  if (!error.value) router.push({ name: "Home" });
}

// check khi login google redirect về url này
if (route.query.accessToken) {
  const routeQuery = {
    userId: route.query.userID,
    userName: route.query.userName,
    email: route.query.email,
    role: route.query.role,
    phoneNumber: route.query.phoneNumber,
    userType: route.query.userType,
    accessToken: route.query.accessToken,
    refreshToken: route.query.refreshToken,
  };
  console.log("pone", route.query.phoneNumber);
  console.log("type", typeof route.query.phoneNumber);
  const returnedTarget = Object.assign(tartget, routeQuery);
  localStorage.setItem("infoUser", JSON.stringify(returnedTarget));
  Cookies.set("accessToken", returnedTarget.accessToken, { expires: 1 / 24 });
  Cookies.set("refreshToken", returnedTarget.refreshToken, { expires: 1 });
  if (!getLocalStorage("infoUser").phoneNumber)
    router.push({ name: "PhoneNumber" });
}
</script>
