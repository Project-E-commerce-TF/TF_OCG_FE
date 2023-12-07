<template>
  <div>
    <!-- product START -->
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
    <!-- product END -->
    <!-- option START -->
    <form
      v-if="!disabledAddOption"
      class="product m-auto rounded-lg bg-gray_sidebar w-[90%] p-20"
      @submit.prevent="submitOptionProduct"
    >
      <div class="w-[30%] m-auto text-center text-3xl font-bold text-primary">
        Option
      </div>
      <div>
        <div>Product {{ product?.title }}</div>
        <div class="flex my-5 items-center">
          <label for="" class="min-w-[100px]">Option</label>
          <input
            type="text"
            class="grow rounded-md border border-solid p-2"
            v-model="optionProductInput"
          />
        </div>
        <div class="text-rose-700">{{ error }}</div>
      </div>
      <div class="flex justify-around mt-10">
        <button
          type="submit"
          class="text-white text-xl py-4 px-10 rounded-lg bg-primary hover:opacity-80 min-w-[190px]"
        >
          Continue ->
        </button>
      </div>
    </form>
    <!-- option END -->
    <!-- option value START -->
    <form
      v-if="!disabledAddOptionValue"
      @submit.prevent="submitOptionValue"
      class="product m-auto rounded-lg bg-gray_sidebar w-[90%] p-20"
    >
      <div class="w-[30%] m-auto text-center text-3xl font-bold text-primary">
        Value
      </div>
      <div>Option {{ optionProduct }}</div>

      <div class="flex my-5 items-center">
        <label for="" class="min-w-[100px]">Value</label>
        <input
          type="text"
          class="grow rounded-md border border-solid p-2"
          v-model="inputValue"
        />
        <button
          type="button"
          @click="addItem"
          class="bg-primary p-2 text-white rounded-lg ml-2"
        >
          Add
        </button>
      </div>
      <div>
        <div class="text-green-700">{{ successMess }}</div>
        <ul>
          <li v-for="(item, index) in itemList" :key="index" class="flex m-2">
            <div class="m-3 min-w-[50px]">{{ item }}</div>
            <button
              type="button"
              @click="removeItem(index)"
              class="bg-rose-700 p-2 text-white rounded-lg ml-2"
            >
              Remove
            </button>
          </li>
        </ul>
        <div class="text-rose-700">{{ error }}</div>
        <div class="flex justify-around">
          <div class="flex justify-around mt-10">
            <button
              type="button"
              class="text-white text-xl py-4 px-10 rounded-lg bg-primary hover:opacity-80 min-w-[190px]"
              @click="backToOption"
            >
              Back to option
            </button>
          </div>
          <div class="flex justify-around mt-10">
            <button
              type="submit"
              class="text-white text-xl py-4 px-10 rounded-lg bg-primary hover:opacity-80 min-w-[190px]"
            >
              Submit List
            </button>
          </div>
          <div class="flex justify-around mt-10">
            <button
              type="button"
              class="text-white text-xl py-4 px-10 rounded-lg bg-primary hover:opacity-80 min-w-[190px]"
              @click="continueToVariant"
            >
              Continue ->
            </button>
          </div>
        </div>
      </div>
    </form>
    <!-- option value END -->
    <!-- price and count in stock START -->
    <form
      v-if="!disabledAddVariant"
      class="product m-auto rounded-lg bg-gray_sidebar w-full p-20"
    >
      <div class="flex gap-5 items-center">
        <div
          v-for="option in optionSet"
          :key="option.optionProductId"
          class="flex gap-5 items-center grow"
        >
          <label>{{ option.optionType }}</label>
          <select
            v-model="selectedOptionValues[option.optionProductId]"
            class="grow rounded-md border border-solid p-2"
          >
            <option
              v-for="value in option.optionValue"
              :key="value.optionValueId"
              :value="value.optionValueId"
            >
              {{ value.value }}
            </option>
          </select>
        </div>
        <label>Price</label>
        <input
          type="number"
          v-model="priceVariant"
          placeholder="Price"
          class="grow rounded-md border border-solid p-2"
        />
        <label>Amount</label>
        <input
          type="number"
          v-model="amount"
          placeholder="Amount"
          class="grow rounded-md border border-solid p-2"
        />
        <label>Image Address</label>
        <input
          v-model="imgAddress"
          placeholder="Image Address"
          class="grow rounded-md border border-solid p-2"
        />

        <button
          @click.prevent="submitVariant"
          class="bg-primary text-white p-2 rounded-lg"
        >
          Create Variant
        </button>
      </div>
      <div class="text-rose-700">{{ error }}</div>
      <div class="text-green-700">{{ successMess }}</div>
      <div class="flex justify-around mt-10">
        <button
          type="button"
          class="text-white text-xl py-4 px-10 rounded-lg bg-primary hover:opacity-80 min-w-[190px]"
          @click="backToDashboard"
        >
          Back to Dashboard
        </button>
      </div>
    </form>
    <!-- price and count in stock END -->
  </div>
</template>

<script setup>
import { fetchData } from "@/utils/axiosFetchApi";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const optionSet = ref([]);
const selectedOptionValues = ref({});

const imgAddress = ref("");
const amount = ref(0);
const priceVariant = ref(0);
const categoryList = ref([]);
const title = ref("");
const description = ref("");
const price = ref(0);
const category = ref("");
const error = ref("");
const disabledAddProduct = ref(false);
const disabledAddOption = ref(true);
const disabledAddOptionValue = ref(true);
const disabledAddVariant = ref(true);
const product = ref({});
const optionProductInput = ref("");
const optionProduct = ref("");
const optionProductId = ref(0);
const successMess = ref("");

const inputValue = ref("");
const itemList = ref([]);
const addItem = () => {
  if (inputValue.value.trim() !== "") {
    itemList.value.push(inputValue.value.trim());
    inputValue.value = "";
  }
};
const removeItem = (index) => {
  console.log(index);
  itemList.value.splice(index, 1);
};

function convertDataStructure(inputData) {
  const optionSetMap = new Map();

  inputData.forEach((item) => {
    const { optionProductId, optionType, optionValueId, value } = item;
    if (!optionSetMap.has(optionProductId)) {
      optionSetMap.set(optionProductId, {
        optionProductId,
        optionType,
        optionValue: [],
      });
    }
    optionSetMap.get(optionProductId).optionValue.push({
      optionValueId,
      optionProductId,
      value,
    });
  });
  const optionSet = [...optionSetMap.values()];
  return optionSet;
}

// --------------------------------------------------
onMounted(async () => {
  const res = await fetchData(`${process.env.VUE_APP_URL}/category`);
  categoryList.value = res.categories;
});

const submitProduct = async () => {
  try {
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
    console.log(res);
    error.value = "";
    product.value = res;
    disabledAddProduct.value = true;
    disabledAddOption.value = false;
  } catch (err) {
    console.log(err);
    error.value = err.response.data.error;
  }
};

const submitOptionProduct = async () => {
  try {
    if (!optionProductInput.value) {
      error.value = "Please fill all fields";
      return;
    }
    const body = {
      optionType: optionProductInput.value,
      productId: product.value.productId,
    };
    const res = await fetchData(
      `${process.env.VUE_APP_URL}/option-product`,
      "POST",
      body
    );
    if (res) {
      optionProduct.value = res.optionType;
      optionProductId.value = res.optionProductId;
      disabledAddOption.value = true;
      disabledAddOptionValue.value = false;
    }
  } catch (err) {
    console.log(err);
    error.value = err.response.data.error;
  }
};

const submitOptionValue = async () => {
  try {
    if (itemList.value.length === 0) {
      error.value = "Please fill all fields";
      return;
    }
    let body = {};
    itemList.value.forEach(async (value) => {
      body.optionProductId = optionProductId.value;
      body.value = value;

      await fetchData(`${process.env.VUE_APP_URL}/option-value`, "POST", body);
    });
    itemList.value = [];
    successMess.value = "Add option value success";
    disabledAddOptionValue.value = false;
    disabledAddVariant.value = true;
  } catch (err) {
    console.log(err);
    error.value = err.response.data.error;
  }
};

const submitVariant = async () => {
  try {
    const body = {};
    if (
      !priceVariant.value ||
      !amount.value ||
      !imgAddress.value
      // || Object.keys(selectedOptionValues.value).length !== 2
    ) {
      error.value = "Please fill all fields";
      return;
    }
    body.productId = product.value.productId;
    body.title = product.value.title;
    body.price = priceVariant.value;
    body.image = imgAddress.value;
    body.countInStock = amount.value;
    body.optionValue1 = Number(Object.values(selectedOptionValues.value)[0]);
    body.optionValue2 = Number(Object.values(selectedOptionValues.value)[1]);
    error.value = "";
    const res = await fetchData(
      `${process.env.VUE_APP_URL}/variant/add-variant`,
      "POST",
      body
    );
    if (res) {
      priceVariant.value = 0;
      amount.value = 0;
      error.value = "";
      successMess.value = "Add variant success";
    }
  } catch (err) {
    console.log(err);
    error.value = err.response.data.error;
  }
};

const backToOption = () => {
  disabledAddOption.value = false;
  disabledAddOptionValue.value = true;
  successMess.value = "";
  error.value = "";
};

const backToDashboard = () => {
  router.push({ name: "Dashboard" });
};

const continueToVariant = async () => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/option-product/get-by/${product.value.productId}`
  );
  optionSet.value = convertDataStructure(res);
  disabledAddOptionValue.value = true;
  disabledAddVariant.value = false;
  successMess.value = "";
  error.value = "";
};
</script>

<style scoped></style>
