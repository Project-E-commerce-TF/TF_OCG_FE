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
            <div
              v-for="op in option.optionValues"
              :key="op.optionValueId"
              class="flex justify-start gap-2"
            >
              <button
                data-v-6fb020b5=""
                type="button"
                class="rounded-lg text-red-400 font-bold hover:opacity-80"
                @click="deleteOptionValue(op.optionProductId, op.value)"
              >
                x
              </button>
              <li class="my-2">
                {{ op.value }}
              </li>
            </div>
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
      <!-- variants  -->
      <div class="mt-12">
        <div class="flex justify-end">
          <button
            type="button"
            @click="isAddVariantModalOpen = true"
            class="bg-blue-950 p-2 rounded-lg hover:opacity-60"
          >
            Add Variant
          </button>
        </div>

        <div class="flex my-5 items-center">
          <label class="min-w-[100px]">Variants</label>
          <table class="grow w-full bg-gray-600 rounded-xl">
            <thead>
              <tr>
                <th class="p-4">ID</th>
                <th>Image</th>
                <th>Price</th>
                <th>Option</th>
                <th>Count in Stock</th>
                <th class="px-10 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="variant in product.variants" :key="variant.id">
                <td class="text-center p-4">{{ variant.variantId }}</td>
                <td class="p-1">
                  <img
                    :src="variant.image"
                    alt="Variant Image"
                    class="m-auto w-12 max-h-12 rounded-lg object-contain"
                  />
                </td>
                <td class="text-center p-1">
                  {{ numberToCurrencyVND(variant.price) }}
                </td>
                <td class="text-center p-1">
                  {{ optionNameVariant[variant.variantId] }}
                </td>
                <td class="text-center p-1">{{ variant.countInStock }}</td>
                <td class="text-center p-1 flex gap-1 justify-center">
                  <button
                    type="button"
                    @click="editVariant(variant.variantId)"
                    class="rounded-lg p-2 bg-green-400 hover:opacity-80"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    @click="deleteVariant(variant.variantId)"
                    class="rounded-lg p-2 bg-red-400 hover:opacity-80"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- end variants -->
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
  <!-- Modal edit variant start -->
  <div
    v-show="isEditModalOpen"
    class="fixed z-10 inset-0 overflow-y-auto text-black bg_image"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="inline-block align-bottom bg-slate-400 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-slate-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div>
            <div class="mt-3 text-center sm:mt-0 sm:text-left">
              <h3
                class="text-lg leading-6 font-bold text-gray-900 text-center mb-10"
                id="modal-title"
              >
                Edit Variant
              </h3>
              <div class="mt-2">
                <div
                  v-for="(optionSet, index) in product.optionProducts"
                  :key="index"
                  class="flex my-5 items-center hidden"
                >
                  <label class="w-1/5">{{ optionSet.optionType }}</label>
                  <select
                    v-model="optionSetValue[index]"
                    class="w-4/5 grow rounded-md border border-solid p-2"
                  >
                    <option
                      :value="option.optionValueId"
                      v-for="option in optionSet.optionValues"
                    >
                      {{ option.value }}
                    </option>
                  </select>
                </div>
                <div class="flex my-5 items-center">
                  <label class="w-1/5">Price</label>
                  <input
                    type="text"
                    v-model="selectedVariant.price"
                    class="w-4/5 grow rounded-md border border-solid p-2"
                  />
                </div>
                <div class="flex my-5 items-center">
                  <label class="w-1/5">Count in stock</label>
                  <input
                    type="text"
                    v-model="selectedVariant.countInStock"
                    class="w-4/5 grow rounded-md border border-solid p-2"
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
              </div>
            </div>
          </div>
        </div>
        <div class="text-rose-700 text-center">{{ error }}</div>
        <div class="text-green-700 text-center">{{ successMessage }}</div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="submitEditedVariant()"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
          </button>
          <button
            type="button"
            @click="cancelModal"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal edit variant end -->
  <!-- ----------------------- -->
  <!-- Modal add variant start -->
  <div
    v-show="isAddVariantModalOpen"
    class="fixed z-10 inset-0 overflow-y-auto text-black bg_image"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="inline-block align-bottom bg-slate-400 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <form class="p-4">
          <h3
            class="text-lg leading-6 font-bold text-gray-900 text-center mb-10"
            id="modal-title"
          >
            Add Variant
          </h3>
          <div class="flex my-5 items-center">
            <label class="w-1/5">Price<b>*</b></label>
            <input
              type="number"
              v-model="newVariant.price"
              :class="[
                { 'input-error': isAddVariantInputError.price },
                'w-4/5 grow rounded-md border border-solid p-2',
              ]"
            />
          </div>
          <div class="flex my-5 items-center">
            <label class="w-1/5">Count in Stock<b>*</b></label>
            <input
              type="number"
              v-model="newVariant.countInStock"
              :class="[
                { 'input-error': isAddVariantInputError.countInStock },
                'w-4/5 grow rounded-md border border-solid p-2',
              ]"
            />
          </div>
          <div
            v-for="(optionProduct, index) in product.optionProducts"
            :key="index"
            class="flex my-5 items-center"
          >
            <label class="w-1/5">{{ optionProduct.optionType }}</label>
            <select
              v-model="optionSetValue[index]"
              :class="[
                { 'input-error': isAddVariantInputError.option },
                'w-4/5 grow rounded-md border border-solid p-2',
              ]"
            >
              <option
                v-for="option in optionProduct.optionValues"
                :value="option.optionValueId"
              >
                {{ option.value }}
              </option>
            </select>
          </div>

          <div class="flex my-5 items-start">
            <label
              for="imageAddress"
              :class="[
                { 'input-error': isAddVariantInputError.file },
                'text-center border border-gray-500 rounded-lg p-1 w-1/3 max-h-fit cursor-pointer hover:opacity-80',
              ]"
              >Choose image<b>*</b></label
            >
            <input
              type="file"
              id="imageAddress"
              class="grow rounded-md border border-solid p-2 hidden"
              accept="image/*"
              @change="handleFileUpload"
            />
            <div class="overflow-hidden max-w-full mx-2 w-4/5">
              {{ file?.name || "No file chosen" }}
            </div>
          </div>
          <div class="text-rose-700 text-center">{{ error }}</div>
          <div class="text-green-700 text-center">{{ successMessage }}</div>
          <div class="px-4 py-3 flex justify-end">
            <button
              type="button"
              @click="cancelModal"
              class="ml-3 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="submitNewVariant()"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal add variant end -->
</template>

<script setup>
import { fetchData } from "@/utils/axiosFetchApi";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Editor from "@tinymce/tinymce-vue";
import { numberToCurrencyVND } from "@/utils/currencyVND";

const isAddVariantModalOpen = ref(false);
const isAddVariantInputError = ref({
  price: false,
  countInStock: false,
  file: false,
  option: false,
});
const newVariant = ref({
  price: 0,
  countInStock: 0,
  image: null,
  optionValue1: 0,
  optionValue2: 0,
});

const selectedVariant = ref({
  id: 0,
  price: 0,
  countInStock: 0,
  image: "",
});
const isEditModalOpen = ref(false);
const route = useRoute();
const router = useRouter();
const product = ref({});
const successMessage = ref("");
const errorMessage = ref("");
const moreValue = ref({});
const toggleMoreValue = ref({});
const optionSetValue = ref({});
const optionNameVariant = ref({});
const file = ref(null);
const error = ref("");
const isInputError = ref({
  description: false,
  price: false,
  category: false,
  file: false,
});

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
  console.log(file);
  // const validTypes = ["image/jpeg", "image/png", "image/gif"];
  // const maxSize = 1000000;

  // if (file?.value?.length === 0) {
  //   isInputError.value.file = true;
  //   error.value = "No file selected";
  //   return;
  // } else if (!validTypes.includes(file?.value?.type)) {
  //   isInputError.value.file = true;
  //   error.value = "Invalid file type";
  //   return;
  // } else if (file?.value?.size > maxSize) {
  //   isInputError.value.file = true;
  //   error.value = "File is too large";
  //   return;
  // } else {
  isInputError.value.file = false;
  isAddVariantInputError.value.file = false;
  error.value = "";
  // }
};

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
  }
});

watch(
  product,
  () => {
    for (let i = 0; i < product.value?.variants?.length; i++) {
      // if (
      //   !product.value.optionProducts[0].optionValues ||
      //   !product.value.optionProducts[1].optionValues
      // ) {
      //   continue;
      // }
      let option1 = product.value.optionProducts[0]?.optionValues.find(
        (option) => {
          return option.optionValueId == product.value.variants[i].optionValue1;
        }
      );
      let option2 = product.value.optionProducts[1]?.optionValues.find(
        (option) => {
          return option.optionValueId == product.value.variants[i].optionValue2;
        }
      );

      optionNameVariant.value[product.value.variants[i].variantId] =
        option1.value && option2?.value
          ? `${option1.value} / ${option2.value}`
          : option1.value;
    }
  },
  { deep: true }
);

const editVariant = (id) => {
  selectedVariant.value = product.value.variants.find((variant) => {
    return variant.variantId == id;
  });
  for (let i = 0; i <= product.value.optionProducts.length; i++) {
    if (i == 0) {
      optionSetValue.value[i] = selectedVariant.value.optionValue1;
    }
    if (i == 1) {
      optionSetValue.value[i] = selectedVariant.value.optionValue2;
    }
  }

  isEditModalOpen.value = true;
};
const submitEditedVariant = async () => {
  const formData = new FormData();
  formData.append("imageFile", file.value);
  formData.append("price", Number(selectedVariant.value.price));
  formData.append("countInStock", Number(selectedVariant.value.countInStock));
  formData.append("optionValue1", Number(optionSetValue.value[0]));
  formData.append("optionValue2", Number(optionSetValue.value[1]));

  const res = await fetchData(
    `${process.env.VUE_APP_URL}/variant/update-variant/${selectedVariant.value.variantId}`,
    "PUT",
    formData
  );

  if (res) {
    successMessage.value = "Variant updated successfully";
    const res = await fetchData(
      `${process.env.VUE_APP_URL}/product/${route.params.id}`
    );
    if (res && res.product.productId > 0) {
      product.value = res;
      await setTimeout(() => {
        successMessage.value = "";
        isEditModalOpen.value = false;
      }, 1000);
    }
  }
};
const deleteVariant = async (id) => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/variant/${id}`,
    "DELETE"
  );
  if (res) {
    const res = await fetchData(
      `${process.env.VUE_APP_URL}/product/${route.params.id}`
    );
    if (res && res.product.productId > 0) {
      product.value = res;
    }
  }
};

const submitNewVariant = async () => {
  if (!newVariant.value.price) {
    isAddVariantInputError.value.price = true;
    error.value = "Please fill all fields";
    return;
  }
  isAddVariantInputError.value.price = false;
  if (!newVariant.value.countInStock) {
    isAddVariantInputError.value.countInStock = true;
    error.value = "Please fill all fields";
    return;
  }
  isAddVariantInputError.value.countInStock = false;
  if (!file.value) {
    isAddVariantInputError.value.file = true;
    error.value = "Please fill all fields";
    return;
  }
  isAddVariantInputError.value.file = false;
  if (Object.keys(optionSetValue.value).length == 0) {
    isAddVariantInputError.value.option = true;
    error.value = "Please fill all fields";
    return;
  }
  isAddVariantInputError.value.option = false;

  const formData = new FormData();
  formData.append("imageFile", file.value);
  formData.append("productId", Number(route.params.id));
  formData.append("price", Number(newVariant.value.price));
  formData.append("countInStock", Number(newVariant.value.countInStock));
  formData.append("optionValue1", Number(optionSetValue.value[0]));
  formData.append("optionValue2", Number(optionSetValue.value[1] || 0));

  const res = await fetchData(
    `${process.env.VUE_APP_URL}/variant/add-variant`,
    "POST",
    formData
  );
  if (res && res.variantId > 0) {
    successMessage.value = "Variant added successfully";
    const res = await fetchData(
      `${process.env.VUE_APP_URL}/product/${route.params.id}`
    );
    if (res && res.product.productId > 0) {
      product.value = res;
      await setTimeout(() => {
        successMessage.value = "";
        isAddVariantModalOpen.value = false;
        newVariant.value.countInStock = 0;
        newVariant.value.price = 0;
        optionSetValue.value = {};
        file.value = null;
      }, 1000);
    }
  } else {
    error.value = "Variant has already existed";
    await setTimeout(() => {
      error.value = "";
    }, 2000);
  }
};

const submitProduct = async () => {
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
    productId: Number(route.params.id),
    title: product.value.product.title,
    description: product.value.product.description,
    price: Number(product.value.product.price),
  };
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/product`,
    "PUT",
    body
  );
  if (res) {
    successMessage.value = "Product updated successfully";
  }
  error.value = "Update product failed";
};

const backToDashboard = () => {
  successMessage.value = "";
  router.push({
    name: "ProductDashboard",
  });
};

const cancelModal = () => {
  isEditModalOpen.value = false;
  isAddVariantModalOpen.value = false;
  error.value = "";
  errorMessage.value = "";
  successMessage.value = "";
  optionSetValue.value = {};
  isInputError.value = {
    title: false,
    description: false,
    price: false,
    category: false,
    file: false,
  };
  isAddVariantInputError.value = {
    price: false,
    countInStock: false,
    file: false,
  };

  newVariant.value.countInStock = 0;
  newVariant.value.price = 0;
  file.value = null;
};

const deleteOptionValue = async (id, value) => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/option-value/${id}`,
    "DELETE",
    { value }
  );
  if (res) {
    const res = await fetchData(
      `${process.env.VUE_APP_URL}/product/${route.params.id}`
    );
    if (res && res.product.productId > 0) {
      product.value = res;
    }
  }
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
</style>
