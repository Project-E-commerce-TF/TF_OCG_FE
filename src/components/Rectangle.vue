<template>
  <div
    class="bg-gray_rectangle w-1/4 py-10 ml-6 flex flex-col items-center"
    v-show="showSide"
  >
    <router-link to="/profile" class="row py-10 text-4xl w-full text-center">
      Profile
    </router-link>
    <router-link
      to="/profile"
      class="row py-5 text-xl w-full text-center"
      active-class="bg-gray-500 text-white rounded-lg"
    >
      Overview
    </router-link>
    <router-link
      to="/pending"
      class="row py-5 text-xl w-full text-center"
      active-class="bg-gray-500 text-white rounded-lg"
    >
      Orders
    </router-link>
    <router-link
      to="/wishlist"
      class="row py-5 text-xl w-full text-center"
      active-class="bg-gray-500 text-white rounded-lg"
    >
      Wishlist
    </router-link>
  </div>
  <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      class="w-[25px] h-[25px] bg-gray-50 rounded-lg p-[6px]"
    >
      <path
        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showSide = ref(true);
const toggleSideBar = () => {
  showSide.value = !showSide.value;
};
</script>
