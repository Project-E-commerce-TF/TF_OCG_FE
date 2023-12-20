<template>
  <div
    class="overflow-y-auto flex justify-center items-center h-[100vh] bg_image py-10"
  >
    <!-- product START -->
    <form
      v-if="!disabledAddProduct"
      class="product m-auto rounded-lg bg-gray-200 w-[60%] p-10 opacity-95 font-bold"
      @submit.prevent="submitProduct"
    >
      <div
        class="w-[30%] m-auto text-center text-3xl font-bold text-primary mb-4"
      >
        Product
      </div>
      <div class="flex my-5 items-center">
        <label for="title" class="min-w-[120px]">Title</label>
        <input
          type="text"
          id="title"
          :class="[
            { 'input-error': isInputError.title },
            'grow rounded-md border border-solid p-2',
          ]"
          v-model="title"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="desc" class="min-w-[120px]">Description</label>
        <div
          id="sample"
          :class="[{ 'input-error': isInputError.description }, 'grow']"
        >
          <Editor
            style="width: 100%"
            v-model="description"
            api-key="5yuek9t1m6nvx7xnjxyglscjopwcnhtaam641fk7o7uvz8ri"
          />
        </div>
      </div>
      <div class="flex my-5 items-center">
        <label for="price" class="min-w-[120px]">Price</label>
        <input
          type="number"
          id="price"
          :class="[
            { 'input-error': isInputError.price },
            'grow rounded-md border border-solid p-2',
          ]"
          v-model="price"
        />
      </div>
      <div class="flex my-5 items-center">
        <label
          for="imageAddress"
          :class="[
            { 'input-error': isInputError.file },
            'min-w-[120px] border border-gray-500 rounded-lg p-1',
          ]"
          >Choose image</label
        >
        <input
          type="file"
          id="imageAddress"
          class="grow rounded-md border border-solid p-2 hidden"
          accept="image/*"
          @change="handleFileUpload"
        />
        <div class="overflow-hidden">{{ file?.name }}</div>
      </div>
      <div class="flex my-5 items-center">
        <label for="category" class="min-w-[120px]">Category</label>
        <select
          id="category"
          :class="[
            { 'input-error': isInputError.category },
            'grow rounded-md border border-solid p-2',
          ]"
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
        <router-link :to="{ name: `ProductDashboard` }">
          <button
            class="font-bold text-primary text-xl py-4 px-6 rounded-lg bg-white border-primary border-solid border hover:opacity-80 min-w-[190px]"
          >
            Cancel
          </button>
        </router-link>
      </div>
    </form>
    <!-- product END -->
    <div class="w-[60%]" v-if="!disabledAddOptionValue">
      <!-- option value START -->
      <form
        @submit.prevent="submitOptionValue"
        class="product m-auto rounded-lg bg-gray-200 p-10 opacity-95 font-bold"
      >
        <div
          class="w-[30%] m-auto text-center text-3xl font-bold text-primary mb-4"
        >
          Option
        </div>
        <div>
          <div>Product {{ product?.title }}</div>
          <div class="flex my-5 items-center">
            <label for="" class="min-w-[105px]">Option Type</label>
            <input
              type="text"
              class="grow rounded-md border border-solid p-2"
              v-model="optionProductInput"
            />
          </div>
        </div>

        <div class="flex my-5 items-center">
          <label for="" class="min-w-[105px]">Option Value</label>
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
                type="submit"
                class="text-white text-xl py-4 px-10 rounded-lg bg-primary hover:opacity-80 min-w-[190px]"
              >
                Submit Opiton
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
    </div>
    <!-- Variant START -->
    <form
      v-if="!disabledAddVariant"
      class="product m-auto rounded-lg bg-gray-200 w-[90%] p-10 opacity-95 font-bold"
    >
      <div
        class="w-[30%] m-auto text-center text-3xl font-bold text-primary mb-4"
      >
        Variant
      </div>
      <div class="flex flex-col gap-5">
        <div
          v-for="option in optionSet"
          :key="option.optionProductId"
          class="flex gap-5 items-center"
        >
          <label class="min-w-[10%]">{{ option.optionType }}</label>
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
        <div class="flex gap-5 items-center justify-start">
          <label class="min-w-[10%]">Price</label>
          <input
            type="number"
            v-model="priceVariant"
            placeholder="Price"
            class="grow rounded-md border border-solid p-2"
          />
        </div>
        <div class="flex gap-5 items-center">
          <label class="min-w-[10%]">Amount</label>
          <input
            type="number"
            v-model="amount"
            placeholder="Amount"
            class="grow rounded-md border border-solid p-2"
          />
        </div>
        <div class="flex my-5 items-start">
          <label
            for="imageAddress"
            :class="[
              { 'input-error': isInputError.file },
              ' border border-gray-500 rounded-lg p-1 w-[120px] max-w-[120px] min-w-[120px] cursor-pointer hover:opacity-80',
            ]"
            >Choose image</label
          >
          <input
            type="file"
            id="imageAddress"
            class="grow rounded-md border border-solid p-2 hidden"
            accept="image/*"
            @change="handleFileUpload"
          />
          <div class="overflow-hidden max-w-full mx-2">
            {{ file?.name || "No file chosen" }}
          </div>
        </div>
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
    <!-- Variant END -->
  </div>
</template>

<script setup>
import { fetchData } from "@/utils/axiosFetchApi";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Editor from "@tinymce/tinymce-vue";

const router = useRouter();
const optionSet = ref([]);
const selectedOptionValues = ref({});

const file = ref(null);
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
const isInputError = ref({
  title: false,
  description: false,
  price: false,
  category: false,
  file: false,
});

const inputValue = ref("");
const itemList = ref([]);

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
  // const validTypes = ["image/jpeg", "image/png", "image/gif"];
  // const maxSize = 1000000;

  // if (file?.value?.length === 0) {
  //   error.value = "No file selected";
  //   return;
  // } else if (!validTypes.includes(file?.value?.type)) {
  //   error.value = "Invalid file type";
  //   return;
  // } else if (file?.value?.size > maxSize) {
  //   error.value = "File is too large";
  //   return;
  // } else {
  isInputError.value.file = false;
  error.value = "";
  // }
};

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

const convertDataStructure = (inputData) => {
  const optionSetMap = new Map();

  inputData.forEach((item) => {
    const { optionProductId, optionType, optionValueId, value } = item;
    if (!optionSetMap.has(optionProductId)) {
      optionSetMap.set(optionProductId, {
        optionProductId,
        optionType,
        optionValue: [],
      });
      // optionSet;
    }
    optionSetMap.get(optionProductId).optionValue.push({
      optionValueId,
      optionProductId,
      value,
    });
  });
  const optionSet = [...optionSetMap.values()];
  return optionSet;
};

// --------------------------------------------------
onMounted(async () => {
  const res = await fetchData(`${process.env.VUE_APP_URL}/category`);
  categoryList.value = res.categories;
});

const submitProduct = async () => {
  try {
    if (!title.value) {
      isInputError.value.title = true;
      error.value = "Please fill all fields";
      return;
    }
    isInputError.value.title = false;

    if (!description.value) {
      isInputError.value.description = true;
      error.value = "Please fill all fields";
      console.log(isInputError.value.description);
      return;
    }
    isInputError.value.description = false;

    if (!price.value) {
      isInputError.value.price = true;
      error.value = "Please fill all fields";
      return;
    }
    isInputError.value.price = false;

    if (!file.value) {
      isInputError.value.file = true;
      error.value = "Please fill all fields";
      return;
    }
    isInputError.value.file = false;

    if (!category.value) {
      isInputError.value.category = true;
      error.value = "Please fill all fields";
      return;
    }
    isInputError.value.category = false;

    const formData = new FormData();
    formData.append("imageFile", file.value);
    formData.append("description", description.value);
    formData.append("title", title.value);
    formData.append("price", Number(price.value));
    formData.append("categoryID", category.value);

    const res = await fetchData(
      `${process.env.VUE_APP_URL}/product`,
      "POST",
      formData
    );

    error.value = "";
    product.value = res;
    if (res) {
      disabledAddProduct.value = true;
      disabledAddOption.value = false;
      disabledAddOptionValue.value = false;
    } else {
      error.value = "Add product failed, title is existed";
    }
  } catch (err) {
    console.log(err);
    error.value = err.response.data.error;
  }
};

const opListCount = ref(0);
const submitOptionValue = async () => {
  try {
    if (!optionProductInput.value) {
      error.value = "Please fill all fields";
      return;
    }
    if (itemList.value.length === 0) {
      error.value = "Please fill all fields";
      return;
    }
    let body = {};
    body = {
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
    }
    body = {};
    itemList.value.forEach(async (value) => {
      body.optionProductId = optionProductId.value;
      body.value = value;

      await fetchData(`${process.env.VUE_APP_URL}/option-value`, "POST", body);
    });
    itemList.value = [];
    optionProductInput.value = "";
    successMess.value = "Add option value success";
    disabledAddOptionValue.value = false;
    disabledAddOption.value = false;
    disabledAddVariant.value = true;
    opListCount.value++;
    if (opListCount.value == 2) {
      await setTimeout(() => {
        continueToVariant();
      }, 2000);
    }
  } catch (err) {
    console.log(err);
  }
};

const submitVariant = async () => {
  try {
    if (
      !priceVariant.value ||
      !amount.value ||
      !file.value
      // || Object.keys(selectedOptionValues.value).length !== 2
    ) {
      error.value = "Please fill all fields";
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", file.value);
    formData.append("productId", Number(product.value.productId));
    formData.append("price", Number(priceVariant.value));
    formData.append("countInStock", Number(amount.value));
    formData.append(
      "optionValue1",
      Number(Object.values(selectedOptionValues.value)[0])
    );
    formData.append(
      "optionValue2",
      Number(Object.values(selectedOptionValues.value)[1] || 0)
    );
    const res = await fetchData(
      `${process.env.VUE_APP_URL}/variant/add-variant`,
      "POST",
      formData
    );
    if (res) {
      priceVariant.value = 0;
      amount.value = 0;
      error.value = "";
      successMess.value = "Add variant success";
      await setTimeout(() => {
        successMess.value = "";
      }, 2000);
    }
  } catch (err) {
    console.log(err);
    error.value = err.response.data.error;
  }
};

const backToDashboard = () => {
  router.push({ name: "ProductDashboard" });
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

<style scoped>
.input-error {
  border: 1px solid red;
}
.bg_image {
  background: linear-gradient(
    112deg,
    rgba(6, 11, 38, 0.94) 59.3%,
    rgba(26, 31, 55, 0) 100%
  );
}
@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
  }
}
</style>
