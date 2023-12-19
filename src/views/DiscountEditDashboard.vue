<template>
  <div class="m-auto w-full flex justify-center">
    <form v-if="discount" @submit.prevent="submitForm" class="w-2/3 text-black">
      <div class="flex my-5 items-center">
        <label for="code" class="min-w-[100px] text-white">Code:</label>
        <input
          id="code"
          v-model="discount.discountCode"
          type="text"
          class="grow rounded-md border border-solid p-2"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="value" class="min-w-[100px] text-white">Value:</label>
        <input
          id="value"
          v-model="discount.value"
          type="number"
          class="grow rounded-md border border-solid p-2"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="type" class="min-w-[100px] text-white">Type:</label>
        <select
          id="type"
          v-model="discount.discountType"
          class="grow rounded-md border border-solid p-2"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>
      <div class="flex my-5 items-center">
        <label for="amount" class="min-w-[100px] text-white">Amount:</label>
        <input
          id="amount"
          v-model="discount.availableQuantity"
          type="number"
          class="grow rounded-md border border-solid p-2"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="startDate" class="min-w-[100px] text-white"
          >Start Date:</label
        >
        <input
          id="startDate"
          v-model="discount.startDate"
          type="date"
          class="grow rounded-md border border-solid p-2"
        />
      </div>
      <div class="flex my-5 items-center">
        <label for="endDate" class="min-w-[100px] text-white">End Date:</label>
        <input
          id="endDate"
          v-model="discount.endDate"
          type="date"
          class="grow rounded-md border border-solid p-2"
        />
      </div>
      <div class="text-red-600">{{ errMess }}</div>
      <div class="text-green-600">{{ successMessage }}</div>
      <div class="flex gap-5 justify-end">
        <button type="submit" class="text-white p-2 bg-blue-500 rounded-lg">
          Submit
        </button>
        <button
          type="button"
          @click="cancel"
          class="p-2 bg-white text-black rounded-lg"
        >
          Cancel
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
const errMess = ref("");
const successMessage = ref("");
const discount = ref({
  discountCode: "",
  value: 0,
  discountType: "",
  availableQuantity: 0,
  startDate: "",
  endDate: "",
});

onMounted(async () => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/discount/${route.params.id}`,
    "GET"
  );
  if (res) {
    res.startDate = new Date(res.startDate).toISOString().split("T")[0];
    res.endDate = new Date(res.endDate).toISOString().split("T")[0];
    console.log(res.startDate);
    discount.value = res;
  }
});

const submitForm = async () => {
  discount.value.startDate = new Date(discount.value.startDate);
  discount.value.endDate = new Date(discount.value.endDate);
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/discount/${route.params.id}`,
    "PUT",
    discount.value
  );
  if (res) {
    successMessage.value = "Discount updated successfully";
    await setTimeout(() => {
      successMessage.value = "";
      router.push({ name: "DiscountDashboard" });
    }, 1000);
  }
};

const cancel = () => {
  router.push({ name: "DiscountDashboard" });
};
</script>

<style scoped></style>
