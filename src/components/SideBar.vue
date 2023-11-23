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
import { useRouter } from "vue-router";
import data from "../datajson/categories";
import CustomMinMaxSlider from "./CustomMinMaxSlider.vue";
import { ref } from "vue";

const router = useRouter();
const cateList = ref([]);

const handleChecked = (e, value) => {
  const currentQuery = router.currentRoute.value.query;

  e.target.checked
    ? cateList.value.push(value)
    : (cateList.value = cateList.value.filter((cate) => cate != value));

  router.push({
    path: "/products",
    query: { ...currentQuery, category: cateList.value.join() },
  });
};
</script>

<style lang="scss" scoped></style>
