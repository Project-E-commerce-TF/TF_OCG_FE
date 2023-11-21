<template>
  <section class="main flex">
    <!-- sidebar -->
    <div class="sidebar w-1/5">
      <SideBar />
    </div>
    <!-- list product -->
    <div class="w-4/5 px-3 relative">
      <!-- sort -->
      <div class="absolute right-5 top-5">
        <span>Sort by</span>
        <select name="" id="" class="ml-2" @change="handleSort">
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
        <select name="" id="" class="ml-2" @change="handleSort">
          <option value="asc">A -> Z</option>
          <option value="desc">Z -> A</option>
        </select>
      </div>
      <!-- item -->
      <div class="flex flex-wrap justify-around mt-20">
        <div
          v-for="item in productItem"
          :key="item.product_id"
          class="product_item w-1/5 min-w-200 mx-0.5"
        >
          <div class="mb-2 overflow-hidden relative cursor-pointer">
            <router-link :to="{ name: `Login`, params: {} }">
              <img
                :src="item.img"
                alt=""
                class="img_main rounded-lg hover:scale-125 transition-all"
              />
            </router-link>
            <div
              class="w-10 absolute right-2 bottom-2 bg-primary rounded-md border-solid border-2 border-white hover:opacity-50"
            >
              <img
                src="../assets/images/icon_add_to_cart.png"
                alt=""
                class="object-scale-down w-full"
                @click="addToCart"
              />
            </div>
          </div>
          <div class="font-black text-gray_footer mb-3">{{ item.title }}</div>
          <div class="text-2xl font-bold text-primary mb-4">
            {{ item.price }}
          </div>
        </div>
      </div>
      <!-- pagination -->
      <Pagination />
    </div>
  </section>
</template>

<script setup>
import Pagination from "@/components/Pagination.vue";
import SideBar from "@/components/SideBar.vue";
import productItem from "../datajson/productItem.json";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const typeSort = ref("asc");
const fieldSort = ref("title");

const handleSort = (e) => {
  const currentQuery = router.currentRoute.value.query;
  typeSort.value = e.target.value == "asc" ? "asc" : "desc";
  fieldSort.value = e.target.value == "title" ? "title" : "price";

  router.push({
    path: "/products",
    query: {
      ...currentQuery,
      typeSort: typeSort.value,
      fieldSort: fieldSort.value,
    },
  });
};

const addToCart = () => {
  //toast mess
  // add data to vue store
  alert("ok");
};
</script>

<style scoped>
@media only screen and (max-width: 480px) {
  .main {
    justify-content: center;
  }
  .sidebar {
    display: none;
  }
}
</style>
