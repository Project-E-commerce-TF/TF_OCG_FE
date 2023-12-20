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
      <div class="flex flex-wrap mt-20 gap-2 w-full">
        <div
          v-for="item in productList"
          :key="item.product_id"
          class="product_item w-1/5 min-w-[285px] mx-0.5 border-2 rounded-xl"
        >
          <div class="mb-2 overflow-hidden relative cursor-pointer">
            <router-link
              :to="{ name: `Variant`, params: { handle: item.handle } }"
            >
              <img
                :src="
                  item.image ||
                  'https://akko.vn/wp-content/uploads/2023/08/ban-phim-khong-day-akko-mx108-01-247x247.png'
                "
                :alt="item.handle"
                class="img_main hover:scale-125 transition-all rounded-xl w-full max-w-[283px] max-h-[283px] object-contain m-auto"
              />
            </router-link>
          </div>
          <div class="bg-grey_white p-3">
            <div class="text-2xl font-bold text-primary mb-6">
              {{ numberToCurrencyVND(item.price) }} VND
            </div>
            <div class="font-black text-gray_footer">
              <div class="clamp-2-lines text-sm">{{ item.title }}</div>
            </div>
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
  console.log(Object.keys(route.query).length == 0);
  if (Object.keys(route.query).length == 0) {
    await store.dispatch("fetchProductList");
    productList.value = store.state.productList;
  }
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
    console.log("collec");
    await store.dispatch("fetchProductList", updateCurrentQuery);
  }
  // { immediate: true }
);
</script>

<style scoped>
.clamp-2-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  max-height: 3em;
}

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
  }
  .img_main {
    width: 100%;
  }
}
.min-h-24 {
  min-height: 100px;
}
</style>
