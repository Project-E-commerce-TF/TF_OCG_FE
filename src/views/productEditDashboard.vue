<template>
  <div>
    <form
      v-if="product.product"
      class="flex flex-col"
      @submit.prevent="submitProduct"
    >
      <div class="flex my-5 items-center">
        <label for="title" class="min-w-[100px]">Title</label>
        <input
          type="text"
          id="title"
          class="grow rounded-md border border-solid p-2 text-black"
          v-model="product.product.title"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="desc" class="min-w-[100px]">Description</label>
        <Editor
          class="grow"
          style="width: 100%"
          v-model="product.product.description"
          api-key="5yuek9t1m6nvx7xnjxyglscjopwcnhtaam641fk7o7uvz8ri"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="price" class="min-w-[100px]">Price</label>
        <input
          type="text"
          id="price"
          class="grow rounded-md border border-solid p-2 text-black"
          v-model="product.product.price"
        />
      </div>
      <div class="flex my-5 items-center">
        <label class="min-w-[100px]">Option</label>
        <div class="grow flex gap-2">
          <ul
            v-for="option in product.optionProducts"
            :key="option.optionProductId"
            class="grow w-[50%]"
          >
            <div class="text-center p-2 bg-gray-600 rounded-lg mb-4">
              {{ option.optionType }}
            </div>
            <li
              v-for="op in option.optionValues"
              :key="op.optionValueId"
              class="my-2"
            >
              {{ op.value }}
            </li>
            <button
              v-if="!toggleMoreValue[option.optionProductId]"
              type="button"
              class="p-2 bg-gray-400 rounded-lg hover:opacity-80"
              @click="toggleOptionValue(option.optionProductId)"
            >
              More Value
            </button>
            <div
              v-if="toggleMoreValue[option.optionProductId]"
              class="flex flex-col gap-1"
            >
              <input
                type="text"
                v-model="moreValue[option.optionProductId]"
                class="grow rounded-md border border-solid p-2 text-black"
              />
              <button
                type="button"
                class="p-2 bg-gray-400 rounded-lg hover:opacity-80"
                @click="
                  submitOptionValue(
                    option.optionProductId,
                    moreValue[option.optionProductId]
                  )
                "
              >
                Submit Value
              </button>
            </div>
          </ul>
          <!-- <div
            v-for="option in product.optionProducts"
            :key="option.optionProductId"
            class="grow"
          >
            <div>{{ option.optionType }}</div>
            <div v-for="op in option.optionValues" :key="op.optionValueId">
              {{ op.value }}
            </div>
          </div> -->
        </div>
      </div>
      <div class="text-green-700">{{ successMessage }}</div>
      <div class="text-rose-700">{{ errorMessage }}</div>
      <div class="flex justify-center gap-10 mt-2">
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
import Editor from "@tinymce/tinymce-vue";

const route = useRoute();
const router = useRouter();
const product = ref({});
const successMessage = ref("");
const errorMessage = ref("");
const moreValue = ref({});
const toggleMoreValue = ref({});

const toggleOptionValue = (optionProductId) => {
  toggleMoreValue.value[optionProductId] =
    !toggleMoreValue.value[optionProductId];
};

const submitOptionValue = async (optionProductId, value) => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/option-value`,
    "POST",
    {
      optionProductId,
      value,
    }
  );
  if (res) {
    toggleMoreValue.value[optionProductId] = false;
    moreValue.value[optionProductId] = "";
    const res = await fetchData(
      `${process.env.VUE_APP_URL}/product/${route.params.id}`
    );
    if (res && res.product.productId > 0) {
      product.value = res;
    }
  }
};

onMounted(async () => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/product/${route.params.id}`
  );
  if (res && res.product.productId > 0) {
    product.value = res;
    console.log(product.value);
  }
});

const submitProduct = async () => {
  console.log(product.value);
  console.log(product.value.title);
  console.log(product.value.description);
  console.log(product.value.price);

  if (
    !product.value.product.title ||
    !product.value.product.description ||
    !product.value.product.price
  ) {
    errorMessage.value = "Please fill all fields";
    return;
  }
  errorMessage.value = "";
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
