<template>
  <div class="bg-gray_rectangle w-1/4 py-10 ml-6 flex flex-col items-center">
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
</template>
