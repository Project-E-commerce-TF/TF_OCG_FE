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
      <div class="flex flex-wrap mt-20 gap-6">
        <div
          v-for="item in productList"
          :key="item.product_id"
          class="product_item w-1/5 min-w-200 mx-0.5"
        >
          <div class="mb-2 overflow-hidden relative cursor-pointer">
            <router-link
              :to="{ name: `Variant`, params: { handle: item.handle } }"
            >
              <img
                :src="item.image"
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
                @click="
                  () => {
                    addToCart(item.productId);
                  }
                "
              />
            </div>
          </div>
          <div class="font-black text-gray_footer mb-3 min-h-24">
            {{ item.title }}
          </div>
          <div class="text-2xl font-bold text-primary mb-6">
            {{ numberToCurrencyVND(item.price) }}
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
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import store from "../store/index.js";
import { numberToCurrencyVND } from "@/utils/currencyVND";

const route = useRoute();
const router = useRouter();
const typeSort = ref("asc");
const fieldSort = ref("title");

onMounted(async () => {
  await store.dispatch("fetchProductList");
  productList.value = store.state.productList;
});
const productList = computed(() => {
  return store.state.productList;
});

watch(
  [typeSort, fieldSort],
  async () => {
    const currentQuery = route.query;
    await router.push({
      path: "/products",
      query: {
        ...currentQuery,
        typeSort: typeSort.value,
        fieldSort: fieldSort.value,
      },
    });
    const updateCurrentQuery = route.query;
    await store.dispatch("fetchProductList", updateCurrentQuery);
  },
  { immediate: true }
);
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
