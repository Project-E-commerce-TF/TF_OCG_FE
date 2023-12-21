<template>
  <div
    class="font-bold text-3xl rounded-xl bg-gray_sidebar w-[50%] m-auto mt-10 p-20 h-[90vh]"
  >
    <div class="mb-20 text-primary text-center">Change password</div>
    <div class="flex flex-col gap-4 mb-6">
      <label class="text-xl text-primary">New password</label>
      <input
        type="password"
        v-model="newPassword"
        class="border-gray_footer border-solid border rounded-lg px-1"
      />
    </div>
    <div class="flex flex-col gap-4 mb-6">
      <label class="text-xl text-primary">Confirm password</label>
      <input
        type="password"
        v-model="confirmPassword"
        class="border-gray_footer border-solid border rounded-lg px-1"
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
import { getLocalStorage } from "@/utils/localStorage";
import { ref } from "vue";
import { useRouter } from "vue-router";

const newPassword = ref("");
const confirmPassword = ref("");
const error = ref("");
const router = useRouter();

const submitPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = "Password does not match";
    return;
  }
  console.log(getLocalStorage("infoUser").email);
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/users/change-password`,
    "POST",
    {
      email: getLocalStorage("infoUser").email,
      Password: newPassword.value,
    }
  );
  if (res) {
    router.push({ name: "Profile" });
  }
  // call api update password
};

const backToProfile = () => {
  router.push({ name: "Profile" });
};
</script>

<style lang="scss" scoped></style>
