<template>
  <div class="row w-full flex justify-around bg-grey_white">
    <router-link
      to="/pending"
      :class="{ 'active-link': $route.path === '/pending' }"
      class="row w-full font-bold border-2 rounded-lg text-center bg-primary text-white p-1"
      >Pending</router-link
    >

    <router-link
      to="/order-being-delivered"
      :class="{ 'active-link': $route.path === '/order-being-delivered' }"
      class="row w-full font-bold border-2 rounded-lg bg-primary text-center text-white p-1"
      >Order Being Delivered</router-link
    >

    <router-link
      to="/complete-the-order"
      :class="{ 'active-link': $route.path === '/complete-the-order' }"
      class="row w-full font-bold border-2 rounded-lg bg-primary text-center text-white p-1"
      >Complete The Order</router-link
    >

    <router-link
      to="/cancelled"
      :class="{ 'active-link': $route.path === '/cancelled' }"
      class="row w-full font-bold border-2 rounded-lg bg-primary text-center text-white p-1"
      >Cancelled</router-link
    >
  </div>
</template>

<style scoped>
.active-link {
  background: rgb(3, 3, 150);
  font-weight: bold;
}
</style>
