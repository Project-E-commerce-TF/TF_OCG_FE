<template>
  <div class="row w-full flex justify-around">
    <router-link to="/pending" class="row font-bold">Pending</router-link>
    <router-link to="/order-being-delivered" class="row font-bold"
      >Order Being Delivered</router-link
    >
    <router-link to="/complete-the-order" class="row font-bold"
      >Complete The Order</router-link
    >
    <router-link to="/request-to-cancel-order" class="row font-bold"
      >Request To Cancel Order</router-link
    >
    <router-link to="/cancelled" class="row font-bold">Cancelled</router-link>
    <button class="col">
      <img
        :src="require('@/assets/images/Filter.png')"
        alt="icon_search"
        class="w-6 h-6"
      />
    </button>
  </div>
</template>
