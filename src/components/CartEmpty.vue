<template>
  <div class="flex flex-col items-center w-full justify-center my-60">
    <div class="row mb-7">
      <img
        :src="require('@/assets/images/icon_empty_cart.png')"
        alt="icon_search"
        class="w-full h-full"
      />
    </div>
    <div class="row font-bold text-2xl mb-5">Hey, The cart feels light !</div>
    <div class="row mb-16">Explore products and add your favorite items</div>
    <div class="row">
      <router-link to="/products">
        <button
          type="button"
          class="bg-primary text-white border-2 text-center px-9 py-3 font-bold rounded-lg"
        >
          Explore →
        </button>
      </router-link>
    </div>
  </div>
</template>
