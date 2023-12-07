<template>
  <div class="bg-gray_rectangle w-1/4 px-32 py-20 flex flex-col">
    <router-link
      to="/"
      class="row mb-10 text-3xl"
      :class="{ 'text-blue-500': $route.path === '/' }"
    >
      Profile
    </router-link>
    <router-link
      to="/profile"
      class="row mb-10"
      :class="{ 'font-bold text-blue-500': $route.path === '/profile' }"
    >
      Overview
    </router-link>
    <router-link
      to="/pending"
      class="row mb-10"
      :class="{ 'font-bold text-blue-500': $route.path === '/pending' }"
    >
      Orders
    </router-link>
    <router-link
      to="/wishlist"
      class="row mb-10"
      :class="{ 'font-bold text-blue-500': $route.path === '/wishlist' }"
    >
      Wishlist
    </router-link>
  </div>
</template>
