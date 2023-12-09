<template>
  <div class="bg-gray_rectangle w-1/4 py-10 ml-6 flex flex-col items-center">
    <router-link
      to="/"
      class="row py-10 text-6xl w-full text-center"
      :class="{ 'text-blue-500': $route.path === '/' }"
    >
      Profile
    </router-link>
    <router-link
      to="/profile"
      class="row py-5 text-2xl w-full text-center"
      :class="{
        'font-bold text-white bg-gray-500': $route.path === '/profile',
      }"
    >
      Overview
    </router-link>
    <router-link
      to="/pending"
      class="row py-5 text-2xl w-full text-center"
      :class="{
        'font-bold text-white bg-gray-500': $route.path === '/pending',
      }"
    >
      Orders
    </router-link>
    <router-link
      to="/wishlist"
      class="row py-5 text-2xl w-full text-center"
      :class="{
        'font-bold text-white bg-gray-500': $route.path === '/wishlist',
      }"
    >
      Wishlist
    </router-link>
  </div>
</template>
