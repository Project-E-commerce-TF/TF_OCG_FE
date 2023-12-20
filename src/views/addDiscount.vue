<template>
  <div class="flex justify-center items-center h-[100vh] text-black">
    <form
      @submit.prevent="submit"
      class="product p-10 rounded-lg bg-gray-200 w-[60%] opacity-95 font-bold"
    >
      <div class="w-[40%] m-auto text-center text-3xl font-bold pb-2">
        ADD DISCOUNT
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
        <label for="discountType" class="min-w-[100px]">Beneficiary</label>
        <select
          id="beneficiary"
          class="grow rounded-md border border-solid p-2"
          v-model="beneficiary"
        >
          <option disabled value="">Choose</option>
          <option :value="false">All</option>
          <option :value="true">Single</option>
        </select>
        <input
          v-if="beneficiary"
          type="text"
          placeholder="User Id"
          v-model="userId"
          class="rounded-lg py-1 px-2 border border-solid ml-2 max-w-[20%]"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="value" class="min-w-[100px]">Value</label>
        <input
          type="number"
          min="0"
          id="value"
          class="grow rounded-md border border-solid p-2"
          v-model="discountValue"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="discountQuantity" class="min-w-[100px]">Quantity</label>
        <input
          type="number"
          min="0"
          id="discountQuantity"
          class="grow rounded-md border border-solid p-2"
          v-model="discountQuantity"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="startDate" class="min-w-[100px]">Start time</label>
        <input
          type="date"
          id="startDate"
          class="grow rounded-md border border-solid p-2"
          v-model="startDate"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="endDate" class="min-w-[100px]">End time</label>
        <input
          type="date"
          id="endDate"
          class="grow rounded-md border border-solid p-2"
          v-model="endDate"
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
        <router-link :to="{ name: `DiscountDashboard` }">
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
const userId = ref(0);
const beneficiary = ref(false);
const startDate = ref("");
const endDate = ref("");
const errorMess = ref("");
const successMess = ref("");

const submit = async () => {
  try {
    if (
      !discountCode.value ||
      !discountType.value ||
      !discountValue.value ||
      !discountQuantity.value ||
      !startDate.value ||
      !endDate.value
    ) {
      errorMess.value = "Please fill all fields";
      return;
    }
    const body = {
      discount: {
        discountCode: discountCode.value,
        discountType: discountType.value,
        value: Number(discountValue.value),
        availableQuantity: Number(discountQuantity.value),
        startDate: new Date(startDate.value),
        endDate: new Date(endDate.value),
      },
      userId: Number(userId.value),
    };
    const res = await fetchData(
      `${process.env.VUE_APP_URL}/discount`,
      "POST",
      body
    );

    if (res) {
      errorMess.value = "";
      successMess.value = "Add discount successfully";
      userId.value = 0;
    }
  } catch (err) {
    console.log(err);
    errorMess.value = err;
  }
};
</script>

<style scoped></style>
