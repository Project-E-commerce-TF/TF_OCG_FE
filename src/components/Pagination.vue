<template>
  <div class="flex justify-center my-6">
    <vue-awesome-paginate
      :total-items="totalItem"
      :items-per-page="itemPerPage"
      :max-pages-shown="2"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "../store/index.js";

const router = useRouter();
const route = useRoute();
const itemPerPage = ref(12);
const currentPage = ref(1);

onMounted(async () => {
  currentPage.value = Number(route.query.page) || 1;
  // console.log("pagi");
  // await store.dispatch("fetchProductList");
  // totalItem.value = store.state.totalItems;
});

const totalItem = computed(() => store.state.totalItems);
watch(route.query, () => {
  currentPage.value = Number(route.query.page) || 1;
});
watch(
  currentPage,
  async () => {
    const currentQuery = route.query;

    await router.push({
      path: "/products",
      query: { ...currentQuery, page: currentPage.value },
    });

    const updateCurrentQuery = route.query;
    console.log("pagi");
    await store.dispatch("fetchProductList", updateCurrentQuery);
    totalItem.value = store.state.totalItems;
  }
  // { immediate: true }
);
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
