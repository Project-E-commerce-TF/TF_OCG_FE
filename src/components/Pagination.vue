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
import { ref } from "vue";
import { useRouter } from "vue-router";

const totalItem = ref(100);
const itemPerPage = ref(16);
const currentPage = ref(1);

const router = useRouter();

const onClickHandler = () => {
  const currentQuery = router.currentRoute.value.query;

  router.push({
    path: "/products",
    query: { ...currentQuery, page: currentPage.value },
  });
};
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
