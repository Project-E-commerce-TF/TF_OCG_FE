<template>
  <section>
    <!-- category -->
    <div class="category px-6 py-8 bg-gray_sidebar rounded-lg">
      <div class="mb-10 font-bold text-primary">Category</div>
      <div>
        <div v-for="category in data" :key="category.id">
          <input
            :id="category.categoryId"
            type="checkbox"
            :value="category.handle"
            class="mr-2 mb-2.5"
            @change="handleChecked($event, category.handle)"
          />
          <label :for="category.categoryId" class="text-gray_footer">{{
            category.name
          }}</label>
        </div>
      </div>
    </div>
    <!-- pricing slider -->
    <div class="price px-6 py-8 bg-gray_sidebar rounded-lg">
      <CustomMinMaxSlider />
    </div>
  </section>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import CustomMinMaxSlider from "./CustomMinMaxSlider.vue";
import { onMounted, ref, watch } from "vue";
import store from "../store/index.js";
import { fetchData } from "@/utils/axiosFetchApi";

const router = useRouter();
const route = useRoute();
const cateList = ref([]);
const data = ref([]);

onMounted(async () => {
  const res = await fetchData(`${process.env.VUE_APP_URL}/category`);
  if (res) {
    data.value = res.categories;
  }
});

const handleChecked = (e, value) => {
  e.target.checked
    ? cateList.value.push(value)
    : (cateList.value = cateList.value.filter((cate) => cate != value));
};

watch(
  cateList,
  async () => {
    const currentQuery = route.query;
    await router.push({
      path: "/products",
      query: { ...currentQuery, category: cateList.value.join() },
    });

    const updateCurrentQuery = route.query;
    await store.dispatch("fetchProductList", updateCurrentQuery);
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped></style>
