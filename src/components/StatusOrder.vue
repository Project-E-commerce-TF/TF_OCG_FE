<template>
  <div class="row w-full flex justify-around">
    <router-link
      to="/pending"
      active-class="active-link"
      class="row w-full font-bold border-2 rounded-lg text-center bg-primary text-white p-1"
      >Pending</router-link
    >

    <router-link
      to="/order-being-delivered"
      active-class="active-link"
      class="row w-full font-bold border-2 rounded-lg bg-primary text-center text-white p-1"
      >Order Being Delivered</router-link
    >

    <router-link
      to="/complete-the-order"
      active-class="active-link"
      class="row w-full font-bold border-2 rounded-lg bg-primary text-center text-white p-1"
      >Complete The Order</router-link
    >

    <router-link
      to="/cancelled"
      active-class="active-link"
      class="row w-full font-bold border-2 rounded-lg bg-primary text-center text-white p-1"
      >Cancelled</router-link
    >
  </div>
</template>

<style scoped>
.active-link {
  background-color: rgb(52, 42, 146);
}
</style>
