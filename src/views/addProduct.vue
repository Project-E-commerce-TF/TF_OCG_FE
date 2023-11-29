<template>
  <div>
    <form
      v-if="!disabledAddProduct"
      class="product m-auto rounded-lg bg-gray_sidebar w-[70%] p-20"
      @submit.prevent="submitProduct"
    >
      <div class="w-[30%] m-auto text-center text-3xl font-bold text-primary">
        Product
      </div>
      <div class="flex my-5 items-center">
        <label for="title" class="min-w-[100px]">Title</label>
        <input
          type="text"
          id="title"
          class="grow rounded-md border border-solid p-2"
          v-model="title"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="desc" class="min-w-[100px]">Description</label>
        <textarea
          id="desc"
          class="grow rounded-md border border-solid p-2"
          v-model="description"
        ></textarea>
      </div>
      <div class="flex my-5 items-center">
        <label for="price" class="min-w-[100px]">Price</label>
        <input
          type="text"
          id="price"
          class="grow rounded-md border border-solid p-2"
          v-model="price"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="category" class="min-w-[100px]">Category</label>
        <select
          id="category"
          class="grow rounded-md border border-solid p-2"
          v-model="category"
        >
          <option disabled value="">Choose category</option>
          <option
            v-for="cate in categoryList"
            :key="cate.categoryId"
            :value="cate.categoryId"
          >
            {{ cate.name }}
          </option>
        </select>
      </div>
      <div class="text-rose-700">{{ error }}</div>
      <div class="flex justify-around mt-10">
        <button
          type="submit"
          class="text-white text-xl py-4 px-10 rounded-lg bg-primary hover:opacity-80 min-w-[190px]"
        >
          Continue ->
        </button>
        <router-link :to="{ name: `Dashboard` }">
          <button
            class="font-bold text-primary text-xl py-4 px-6 rounded-lg bg-white border-primary border-solid border hover:opacity-80 min-w-[190px]"
          >
            Cancel
          </button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { fetchData } from "@/utils/axiosFetchApi";
import { onMounted, ref } from "vue";

const categoryList = ref([]);
const title = ref("");
const description = ref("");
const price = ref(0);
const category = ref("");
const error = ref("");
const disabledAddProduct = ref(false);

onMounted(async () => {
  const res = await fetchData(`${process.env.VUE_APP_URL}/category`);
  categoryList.value = res.categories;
});

const submitProduct = async () => {
  if (!title.value || !description.value || !price.value || !category.value) {
    error.value = "Please fill all fields";
    return;
  }
  const body = {
    title: title.value,
    description: description.value,
    price: Number(price.value),
    categoryID: category.value,
  };
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/product`,
    "POST",
    body
  );
  if (res) {
    disabledAddProduct.value = true;
  }
};
</script>

<style lang="scss" scoped></style>
