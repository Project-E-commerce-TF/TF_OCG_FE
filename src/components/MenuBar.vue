<template>
  <div class="flex justify-between items-center h-28 border-b-8 border-primary">
    <div class="w-1/6 text-center flex justify-center">
      <router-link to="/">
        <button class="w-38 h-12 border-none bg-transparent">
          <img
            :src="require('@/assets/images/logo_header.png')"
            alt="logo_brand"
            class="w-full h-full object-cover"
          />
        </button>
      </router-link>
    </div>
    <div class="relative w-2/6 h-1/2 flex justify-center items-center">
      <input
        type="text"
        class="border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 w-full"
        placeholder="Search for product, categories, etc..."
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
    <div class="text-center w-2/6 flex justify-between mx-20 items-center">
      <router-link to="/language">
        <button class="w-28 h-5 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_language.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
      </router-link>
      <router-link to="/user">
        <button class="w-5 h-6 bg-transparent border-none">
          <img
            :src="require('@/assets/images/icon_user.png')"
            alt="icon_search"
            class="w-full h-full"
          />
        </button>
      </router-link>
      <router-link to="/location">
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
      <div>AED 24.98</div>
    </div>
  </div>
</template>
