<template>
  <div
    class="p-10 font-bold text-3xl rounded-lg bg-gray_sidebar px-60 py-20 h-[100vh]"
  >
    <div class="mb-20 text-primary">Reset password</div>
    <div class="flex flex-col gap-4 mb-6">
      <label class="text-xl text-primary">New password</label>
      <input
        type="password"
        v-model="newPassword"
        class="border-gray_footer border-solid border rounded-lg p-3"
      />
    </div>
    <div class="flex flex-col gap-4 mb-6">
      <label class="text-xl text-primary">Confirm password</label>
      <input
        type="password"
        v-model="confirmPassword"
        class="border-gray_footer border-solid border rounded-lg p-3"
      />
    </div>
    <div class="flex justify-between">
      <button
        class="text-white text-xl py-4 px-6 rounded-lg bg-primary hover:opacity-80"
        @click="submitPassword"
      >
        Change
      </button>
      <button
        class="font-bold text-primary text-xl py-4 px-6 rounded-lg bg-white border-primary border-solid border hover:opacity-80"
        @click="backToProfile"
      >
        Cancel
      </button>
    </div>
    <div class="text-rose-700 text-xl mt-5">{{ error }}</div>
  </div>
</template>

<script setup>
import { fetchData } from "@/utils/axiosFetchApi";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const newPassword = ref("");
const confirmPassword = ref("");
const error = ref("");
const router = useRouter();
const route = useRoute();

const submitPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = "Password does not match";
    return;
  }
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/auth/reset-password`,
    "POST",
    {
      resetToken: route.query.resetToken,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
    }
  );
  if (res) {
    router.push({ name: "Login" });
  }
  // call api update password
};

const backToProfile = () => {
  router.push({ name: "Profile" });
};
</script>

<style lang="scss" scoped></style>
