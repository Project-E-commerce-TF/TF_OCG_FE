<template>
  <div>
    <form class="flex flex-col" @submit.prevent="submitProduct">
      <div class="flex my-5 items-center">
        <label for="title" class="min-w-[100px]">Title</label>
        <input
          type="text"
          id="title"
          class="grow rounded-md border border-solid p-2"
          v-model="product.title"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="desc" class="min-w-[100px]">Description</label>
        <textarea
          id="desc"
          class="grow rounded-md border border-solid p-2"
          v-model="product.description"
        ></textarea>
      </div>
      <div class="flex my-5 items-center">
        <label for="price" class="min-w-[100px]">Price</label>
        <input
          type="text"
          id="price"
          class="grow rounded-md border border-solid p-2"
          v-model="product.price"
        />
      </div>
      <div class="bg-green-700">{{ successMessage }}</div>
      <div class="flex justify-center gap-10">
        <button
          @click="backToDashboard"
          type="button"
          class="font-bold text-primary text-xl py-4 px-6 rounded-lg bg-white border-primary border-solid border hover:opacity-80 min-w-[190px]"
        >
          Back
        </button>
        <button
          type="submit"
          class="text-white text-xl py-4 px-10 rounded-lg bg-primary hover:opacity-80 min-w-[190px]"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { fetchData } from "@/utils/axiosFetchApi";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const product = ref({});
const successMessage = ref("");

onMounted(async () => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/product/${route.params.id}`
  );
  if (res && res.productId > 0) {
    product.value = res;
  }
});

const submitProduct = async () => {
  const body = {
    title: product.value.title,
    description: product.value.description,
    price: Number(product.value.price),
  };
  await fetchData(
    `${process.env.VUE_APP_URL}/product/${route.params.id}`,
    "PUT",
    body
  );
  successMessage.value = "Product updated successfully";
};

const backToDashboard = () => {
  successMessage.value = "";
  router.push({
    name: "ProductDashboard",
  });
};
</script>

<style scoped></style>
