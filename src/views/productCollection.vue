<template>
  <section class="main flex">
    <!-- sidebar -->
    <div class="sidebar w-1/5">
      <SideBar />
    </div>
    <!-- list product -->
    <div class="list_pro w-4/5 px-3 relative">
      <!-- sort -->
      <div class="absolute right-5 top-5">
        <span>Sort by</span>
        <select
          name=""
          id=""
          class="ml-2"
          @change="handleSort"
          v-model="fieldSort"
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
        <select
          name=""
          id=""
          class="ml-2"
          @change="handleSort"
          v-model="typeSort"
        >
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
            <router-link
              :to="{ name: `Variant`, params: { handle: item.handle } }"
            >
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
          <div class="font-black text-gray_footer mb-3 min-h-24">
            {{ item.title }}
          </div>
          <div class="text-2xl font-bold text-primary mb-6">
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
// import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import store from "../store/index.js";

// const route = useRoute();
// const router = useRouter();
const typeSort = ref("asc");
const fieldSort = ref("title");

// async function getProducts(queryString) {
//   const result = await fetchData(
//     `${process.env.VUE_APP_URL}/product/search/list?${queryString}`
//   );
//   productItem.value = result;
// }
// getProducts();

const productItem = computed(() => {
  return store.state.productItem;
});

const addToCart = () => {
  //toast mess
  // add data to vue store
  alert("ok");
};

// watch([typeSort, fieldSort], async () => {
//   const currentQuery = route.currentRoute.value.query;
//   await router.push({
//     path: "/products",
//     query: {
//       ...currentQuery,
//       typeSort: typeSort.value,
//       fieldSort: fieldSort.value,
//     },
//   });
//   await store.dispatch("fetchProductItem");
// });
</script>

<style scoped>
@media only screen and (max-width: 480px) {
  .main {
    justify-content: center;
  }
  .sidebar {
    display: none;
  }
  .list_pro {
    width: 100%;
  }
  .product_item {
    width: 100%;
    padding: 0 15px;
  }
  .img_main {
    width: 100%;
  }
}
.min-h-24 {
  min-height: 100px;
}
</style>
