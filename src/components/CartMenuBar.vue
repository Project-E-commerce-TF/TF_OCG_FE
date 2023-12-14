CartMenuBar
<template>
  <div
    class="header flex flex-col sm:flex-row bg-slate-200 justify-between items-center h-auto sm:h-28 border-b-8 border-primary px-2 sm:px-6"
  >
    <div class="w-full md:w-1/6 md:block text-center hidden">
      <router-link to="/home">
        <img
          :src="require('@/assets/images/logo_header.png')"
          alt="logo_brand"
          class="w-full object-cover rounded-full my-1"
        />
      </router-link>
    </div>
    <div class="flex justify-center mt-2 sm:mt-0">
      <div class="doc1 font-bold text-gray_footer">....................</div>
      <div class="cart text-xl m-1 px-2 border-b-2 font-bold border-primary">
        Cart
      </div>
      <div class="doc1 font-bold text-gray_footer">....................</div>
    </div>
    <router-link
      to="/products"
      class="flex justify-center mt-2 sm:mt-0 sm:mr-6"
    >
      <img
        :src="require('@/assets/images/arrow-left.png')"
        alt="icon_search"
        class="w-5"
      />
      <routerlink>Back to shopping</routerlink>
    </router-link>
  </div>
</template>
