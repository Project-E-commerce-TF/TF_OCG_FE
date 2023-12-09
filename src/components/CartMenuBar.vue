CartMenuBar
<template>
  <div
    class="header flex bg-slate-200 justify-between items-center h-28 border-b-8 border-primary px-6"
  >
    <div class="w-1/6 text-center">
      <router-link to="/home">
        <img
          :src="require('@/assets/images/logo_header.png')"
          alt="logo_brand"
          class="w-full object-cover rounded-full my-1"
        />
      </router-link>
    </div>
    <div class="flex">
      <div class="doc1 font-bold text-gray_footer">....................</div>
      <div class="cart text-xl m-1 px-2 border-b-2 font-bold border-primary">
        Cart
      </div>
      <div class="doc1 font-bold text-gray_footer">....................</div>
    </div>
    <router-link to="/products" class="flex mr-6">
      <img
        :src="require('@/assets/images/arrow-left.png')"
        alt="icon_search"
        class="w-5"
      />
      <routerlink>Back to shopping</routerlink>
    </router-link>
  </div>
</template>
