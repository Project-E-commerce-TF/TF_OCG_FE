CartMenuBar
<template>
  <div
    class="header flex justify-between items-center h-28 border-b-8 border-primary"
  >
    <div class="w-1/6 text-center">
      <router-link to="/home">
        <img
          :src="require('@/assets/images/logo_header.png')"
          alt="logo_brand"
          class="w-full object-cover"
        />
      </router-link>
    </div>
    <div class="flex">
      <div class="cart font-bold m-1 border-b-2 border-primary">Cart</div>
      <div class="doc1 font-bold text-gray_footer">....................</div>
      <div class="payment font-bold m-1 text-gray_footer">Payment</div>
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
