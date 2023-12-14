<template>
  <div v-if="Object.keys(orderDetail).length > 0">
    <div class="flex justify-between mt-3 mb-10">
      <h3 class="text-2xl">
        Total : {{ numberToCurrencyVND(orderDetail.totalPrice) }}
      </h3>
      <div class="self-center">{{ formatDate(orderDetail.orderDate) }}</div>
    </div>
    <div class="flex justify-between mb-3 bg-gray-700 p-3 rounded-xl">
      <div>
        <div>{{ orderDetail.orderDetails[0].user.email }}</div>
        <div>{{ orderDetail.orderDetails[0].user.phoneNumber }}</div>
        <div>{{ orderDetail.shippingAddress }}</div>
      </div>
      <div>
        <div>Status : {{ orderDetail.status }}</div>
        <div
          v-if="orderDetail.status == 'order being delivered'"
          class="flex justify-center mt-2"
        >
          <button
            type="button"
            class="p-2 bg-green-400 rounded-lg hover:opacity-80"
            @click="changeStatusToSuccess"
          >
            Change to success
          </button>
        </div>
        <div
          v-else-if="orderDetail.status == 'pending'"
          class="flex justify-between mt-2 gap-1"
        >
          <button
            type="button"
            class="p-2 bg-green-400 rounded-lg hover:opacity-80"
            @click="changeStatusToCancel"
          >
            Change to delivering
          </button>
          <button
            type="button"
            class="p-2 bg-rose-400 rounded-lg hover:opacity-80"
            @click="changeStatusToCancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-6">
      <div
        v-for="order in orderDetail.orderDetails"
        :key="order.orderDetailID"
        class="flex justify-between border border-gray-400 p-3 rounded-xl"
      >
        <div class="grow">
          <div>{{ order.variant.title }}</div>
          <div>{{ numberToCurrencyVND(order.variant.price) }}</div>
          <div>QTY : {{ order.quantity }}</div>
        </div>
        <div class="text-xl m-auto">{{ numberToCurrencyVND(order.price) }}</div>
      </div>
    </div>
    <div class="text-xl text-green-300 mt-3">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { formatDate } from "@/utils/formatDate";
import { fetchData } from "@/utils/axiosFetchApi";
import { numberToCurrencyVND } from "@/utils/currencyVND";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const orderDetail = ref({});
const successMessage = ref("");

onMounted(async () => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/order-detail/get-list-order-detail?orderID=${route.params.id}`
  );
  if (res) {
    orderDetail.value = res;
  }
});

const changeStatusToSuccess = async () => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/order/complete`,
    "POST",
    {
      orderId: orderDetail.value.orderId,
    }
  );
  if (res) {
    successMessage.value = "Success!";
    await setTimeout(() => {
      router.push({ name: "OrderDashboard" });
    }, 2000);
  }
};

const changeStatusToCancel = async () => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/order/request-cancel`,
    "POST",
    {
      orderId: orderDetail.value.orderId,
    }
  );
  if (res) {
    successMessage.value = "Success!";
    await setTimeout(() => {
      router.push({ name: "OrderDashboard" });
    }, 2000);
  }
};
</script>

<style scoped></style>
