<template>
  <div>
    <form
      @submit.prevent="submit"
      class="product m-auto rounded-lg bg-gray_sidebar w-[90%] p-20"
    >
      <div class="w-[30%] m-auto text-center text-3xl font-bold text-primary">
        Add discount
      </div>
      <div class="flex my-5 items-center">
        <label for="discountCode" class="min-w-[100px]">Code</label>
        <input
          type="text"
          id="discountCode"
          class="grow rounded-md border border-solid p-2"
          v-model="discountCode"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="discountType" class="min-w-[100px]">Type</label>
        <select
          id="discountType"
          class="grow rounded-md border border-solid p-2"
          v-model="discountType"
        >
          <option disabled value="">Choose type</option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>
      <div class="flex my-5 items-center">
        <label for="value" class="min-w-[100px]">Value</label>
        <input
          type="number"
          id="value"
          class="grow rounded-md border border-solid p-2"
          v-model="discountValue"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="value" class="min-w-[100px]">Quantity</label>
        <input
          type="number"
          id="discountQuantity"
          class="grow rounded-md border border-solid p-2"
          v-model="discountQuantity"
        />
      </div>
      <div class="text-rose-700">{{ errorMess }}</div>
      <div class="text-green-700">{{ successMess }}</div>
      <div class="flex justify-around mt-10">
        <button
          type="submit"
          class="text-white text-xl py-4 px-10 rounded-lg bg-primary hover:opacity-80 min-w-[190px]"
        >
          Submit
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
import { ref } from "vue";

const discountCode = ref("");
const discountType = ref("");
const discountValue = ref(0);
const discountQuantity = ref(0);
const errorMess = ref("");
const successMess = ref("");

const submit = async () => {
  try {
    if (
      !discountCode.value ||
      !discountType.value ||
      !discountValue.value ||
      !discountQuantity.value
    ) {
      errorMess.value = "Please fill all fields";
      return;
    }
    const body = {
      discountCode: discountCode.value,
      discountType: discountType.value,
      value: Number(discountValue.value),
      availableQuantity: Number(discountQuantity.value),
    };

    const res = await fetchData(
      `${process.env.VUE_APP_URL}/discount`,
      "POST",
      body
    );

    if (res) {
      errorMess.value = "";
      successMess.value = "Add discount successfully";
    }
  } catch (err) {
    console.log(err);
    errorMess.value = err;
  }
};
</script>

<style lang="scss" scoped></style>
