MenuBar

<template>
  <div class="header flex justify-between items-center h-28">
    <div class="w-1/6 text-center">
      <router-link to="/">
        <img
          :src="require('@/assets/images/logo_header.png')"
          alt="logo_brand"
          class="w-full object-cover"
        />
      </router-link>
    </div>
    <div class="relative w-2/6 flex justify-center items-center">
      <input
        type="text"
        class="border border-gray-300 pl-10 focus:outline-none focus:border-blue-500 w-full rounded-md"
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
      <router-link to="/profile">
        <button class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_user.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
      </router-link>
      <router-link to="/map">
        <button class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_location.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
      </router-link>
      <router-link to="/wishlist">
        <button class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_wishlist.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
      </router-link>
      <router-link to="/cart">
        <button class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_cart.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "../store/index.js";

const router = useRouter();
const route = useRoute();
const searchText = ref("");

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
