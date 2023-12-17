<template>
  <div class="w-full mx-16 my-24 general">
    <div class="main">
      <div class="row flex justify-between mb-6">
        <div class="col text-gray_footer font-bold">
          ORDER # {{ currentOrder?.orderId }}
        </div>
        <div class="col text-gray_footer font-bold" v-if="currentOrder">
          Placed on:
          {{
            currentOrder.orderDate ? formatDate(currentOrder.orderDate) : "N/A"
          }}
        </div>
      </div>
      <div class="row flex justify-between my-2" v-if="currentOrder">
        <div class="col flex flex-col justify-between">
          <div class="row font-bold">
            Total: VND {{ numberToCurrencyVND(currentOrder?.grandTotal) }}
          </div>
          <div class="row font-bold text-save">
            You Saved VND
            {{ numberToCurrencyVND(currentOrder?.discountAmount) }}
          </div>
        </div>
        <div class="col">
          <button
            class="border-2 px-5 py-3 rounded-xl font-bold text-primary border-primary"
            data-toggle="modal"
            data-target="#invoiceModal"
            @click="openModal"
          >
            Receive invoice
          </button>
        </div>
      </div>
      <div class="row flex justify-between my-4 flex items-center">
        <div class="col font-bold text-primary">
          Deliver all together (estimated by {{ sevenDaysLaterDate }})
        </div>
        <div class="row flex justify-between my-4" v-if="currentOrder">
          <div
            class="col font-bold text-primary"
            v-if="currentOrder.status === 'pending'"
          >
            <button @click="cancelOrder(currentOrder.orderId)">
              Cancel order
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <OrderDetailBox
          v-for="orderDetail in currentOrder?.orderDetails"
          :key="orderDetail.orderDetailId"
          :orderDetail="orderDetail"
          :provinceName="currentProvince?.provinceName"
          :shippingAddress="currentOrder.shippingAddress"
          :updateTime="currentOrder.updatedAt"
          :status="currentOrder.status"
          :phoneOrder="currentOrder.phoneOrder"
        />
      </div>
    </div>

    <!-- Invoice Modal -->
    <div
      class="modal fade max-w-md mx-auto"
      id="invoiceModal"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <!-- Invoice component is displayed here -->
            <Invoice
              v-if="modalVisible"
              :isVisible="modalVisible"
              :orderId="currentOrder?.orderId"
              :orderDate="currentOrder?.orderDate"
              :grandTotal="currentOrder?.grandTotal"
              :discountAmount="currentOrder?.discountAmount"
              :orderDetails="currentOrder?.orderDetails"
              :closeModal="closeModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Invoice from "@/components/Invoice.vue";
import { fetchData } from "@/utils/axiosFetchApi";
import OrderDetailBox from "@/components/OrderDetailBox.vue";
import { numberToCurrencyVND } from "@/utils/currencyVND";

const route = useRoute();
const currentOrder = ref(null);
const currentProvince = ref(null);
const sevenDaysLaterDate = ref(null);
const modalVisible = ref(false);

const openModal = async () => {
  await fetchOrderDetails();
  await fetchProvince();
  modalVisible.value = true;
  document.querySelector(".main").style.opacity = "0.1";
};

const closeModal = () => {
  modalVisible.value = false;
  document.querySelector(".main").style.opacity = "1";
};

const fetchOrderDetails = async () => {
  try {
    const response = await fetchData(
      `${process.env.VUE_APP_URL}/order-detail/get-list-order-detail?orderID=${route.params.orderId}`
    );

    if (response) {
      currentOrder.value = response;
      sevenDaysLaterDate.value = formatDateThreeDaysLater(
        currentOrder.value.orderDate
      );
    } else {
      console.error("Invalid response or order not found.");
    }
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
};

const cancelOrder = async (orderId) => {
  try {
    const response = await fetchData(
      `${process.env.VUE_APP_URL}/order/request-cancel`,
      "POST",
      JSON.stringify({
        orderId: orderId,
      }),
      {
        "Content-Type": "application/json",
      }
    );

    if (response) {
      console.log("Order canceled successfully");
      await fetchOrderDetails();
      await fetchProvince();
    } else {
      console.error(
        "Failed to cancel order. Server responded with:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error canceling order:", error);
  }
};

const fetchProvince = async () => {
  try {
    const response = await fetchData(
      `${process.env.VUE_APP_URL}/province/get-province-by-id?id=${currentOrder.value.provinceId}`
    );

    if (response) {
      currentProvince.value = response;
    } else {
      console.error("Invalid response or order not found.");
    }
  } catch (error) {
    console.error("Error fetching province:", error);
  }
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const formatDateThreeDaysLater = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 7);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

onMounted(async () => {
  await fetchOrderDetails();
  await fetchProvince();
});
</script>

<style scoped>
.general {
  position: relative;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  font-weight: bold;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
