<template>
  <div class="row w-full flex justify-around">
    <router-link
      to="/pending"
      :class="{ 'active-link': $route.path === '/pending' }"
      class="row font-bold border-2 rounded-lg bg-primary text-white p-1"
      >Pending</router-link
    >

    <router-link
      to="/order-being-delivered"
      :class="{ 'active-link': $route.path === '/order-being-delivered' }"
      class="row font-bold border-2 rounded-lg bg-primary text-white p-1"
      >Order Being Delivered</router-link
    >

    <router-link
      to="/complete-the-order"
      :class="{ 'active-link': $route.path === '/complete-the-order' }"
      class="row font-bold border-2 rounded-lg bg-primary text-white p-1"
      >Complete The Order</router-link
    >

    <router-link
      to="/cancelled"
      :class="{ 'active-link': $route.path === '/cancelled' }"
      class="row font-bold border-2 rounded-lg bg-primary text-white p-1"
      >Cancelled</router-link
    >

    <button class="col">
      <img
        :src="require('@/assets/images/Filter.png')"
        alt="icon_search"
        class="w-6 h-6"
      />
    </button>
  </div>
</template>

<style scoped>
.active-link {
  background: rgb(2, 2, 124);
  font-weight: bold;
}
</style>
