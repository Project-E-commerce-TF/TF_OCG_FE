<template>
  <div
    class="header bg-slate-200 flex justify-between items-center border-b-8 border-primary h-[86px] px-6"
  >
    <div class="w-1/6 text-center">
      <router-link to="/">
        <img
          :src="require('@/assets/images/logo_header.png')"
          alt="logo_brand"
          class="w-full object-cover rounded-2xl my-1"
        />
      </router-link>
    </div>
    <div class="relative w-2/6 flex justify-center items-center my-4">
      <input
        type="text"
        class="p-2 border border-gray-300 pl-10 focus:outline-none focus:border-blue-500 w-full rounded-xl"
        placeholder="Search for product..."
        v-model="searchText"
      />

      <router-link to="/search">
        <button
          class="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 bg-transparent border-none"
        >
          <img
            :src="require('@/assets/images/icon_search.png')"
            alt="Icon"
            class="w-full h-full"
          />
        </button>
      </router-link>
    </div>
    <div class="text-center w-2/6 flex justify-end items-center gap-5 mr-4">
      <router-link to="/profile" class="flex">
        <button class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_user.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
        <div class="ml-2 font-bold">{{ authen ? "Profile" : "Login" }}</div>
      </router-link>
      <router-link to="/map" class="flex">
        <button class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_location.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
        <div class="ml-2 font-bold">Map</div>
      </router-link>
      <router-link to="/wishlist" class="flex">
        <button class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_wishlist.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
        <div class="ml-2 font-bold">Wishlist</div>
      </router-link>
      <router-link to="/cart" class="flex">
        <button class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_cart.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
        <div class="ml-2 font-bold">Cart</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "../store/index.js";

const Cookies = require("js-cookie");
const router = useRouter();
const route = useRoute();
const searchText = ref("");
const authen = ref(false);
onMounted(() => {
  Cookies.get("accessToken") ? (authen.value = true) : (authen.value = false);
});
watch(searchText, async () => {
  console.log(1);
  const currentQuery = route.query;
  await router.push({
    path: "/products",
    query: { ...currentQuery, searchText: searchText.value },
  });

  const updateCurrentQuery = route.query;
  await store.dispatch("fetchProductList", updateCurrentQuery);
});
</script>

<style>
@media screen and (max-width: 480px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  .header > div {
    width: 100%;
    margin: 3px 0;
  }
  .header > div:first-child {
    display: none;
  }
}
</style>
