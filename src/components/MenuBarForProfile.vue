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

    <div class="text-center w-2/6 flex justify-end items-center gap-5 mr-4">
      <router-link v-if="authen" to="/profile" class="flex">
        <button class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_user.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
        <div class="ml-2 font-bold">Profile</div>
      </router-link>
      <router-link v-else to="/login" class="flex">
        <button class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_user.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
        <div class="ml-2 font-bold">Login</div>
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
      <button class="flex" @click="handleWishlistLinkClick">
        <div class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_wishlist.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </div>
        <div class="ml-2 font-bold">Wishlist</div>
      </button>
      <button class="flex" @click="handleCartLinkClick">
        <div class="w-5 h-6 bg-transparent border-none relative">
          <img
            :src="require('@/assets/images/icon_cart.png')"
            alt="icon_search"
            class="w-full h-full"
          />
          <div
            class="absolute bg-rose-600 text-white rounded-full text-xs px-1 top-[-10px] right-[-10px]"
          >
            {{ cartListNoti?.length }}
          </div>
        </div>
        <div class="ml-2 font-bold">Cart</div>
      </button>
    </div>
  </div>
  <div v-if="alertMessage" class="alert-message font-bold mt-2">
    {{ alertMessage }}
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "../store/index.js";
import Cookies from "js-cookie";

const cartListNoti = computed(() => store.state.cartList);
const authen = ref(false);
const router = useRouter();
const route = useRoute();
const alertMessage = ref(null);
const searchText = ref("");

onMounted(async () => {
  Cookies.get("accessToken") ? (authen.value = true) : (authen.value = false);
  if (authen.value) {
    await store.dispatch("fetchCartList");
  }
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
  if (authen.value) {
    await store.dispatch("fetchCartList");
  }
});

const showAlert = (message) => {
  alertMessage.value = `${message}`;
  setTimeout(() => {
    alertMessage.value = null;
  }, 2000);
};

const handleCartLinkClick = () => {
  if (!authen.value) {
    showAlert("Please login to view your cart.");
  } else {
    router.push("/cart");
  }
};

const handleWishlistLinkClick = () => {
  if (!authen.value) {
    showAlert("Please login to view your wishlist.");
  } else {
    router.push("/wishlist");
  }
};
</script>

<style scoped>
.alert-message {
  position: fixed;
  top: 11%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: rgba(0, 37, 68, 0.8);
  color: white;
  border-radius: 5px;
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
}

.alert-message.hide {
  opacity: 0;
}

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
