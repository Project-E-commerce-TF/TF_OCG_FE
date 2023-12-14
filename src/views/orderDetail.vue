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
            Nhận hóa đơn
          </button>
        </div>
      </div>
      <div class="row flex justify-between my-4 flex items-center">
        <div class="col font-bold text-primary">
          Deliver all together (estimated by {{ threeDaysLaterDate }})
        </div>
        <div class="row flex justify-between my-4" v-if="currentOrder">
          <div
            class="col font-bold text-primary"
            v-if="currentOrder.status === 'pending'"
          >
            <button @click="cancelOrder">Cancel order</button>
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
        />
      </div>
    </div>
    <div class="modal">
      <Modal
        :showModal="modalVisible"
        :invoiceHTML="invoiceHTML"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchData } from "@/utils/axiosFetchApi";
import OrderDetailBox from "@/components/OrderDetailBox.vue";
import Modal from "@/components/Modal.vue";
import { numberToCurrencyVND } from "@/utils/currencyVND";

const route = useRoute();
const currentOrder = ref(null);
const currentProvince = ref(null);
const threeDaysLaterDate = ref(null);
const modalVisible = ref(false);
const invoiceHTML = ref("");

const openModal = () => {
  generateInvoice();
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
      console.log("orderId:", currentOrder.value.orderId);
      threeDaysLaterDate.value = formatDateThreeDaysLater(
        currentOrder.value.orderDate
      );
    } else {
      console.error("Invalid response or order not found.");
    }
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
};

const fetchProvince = async () => {
  try {
    const response = await fetchData(
      `${process.env.VUE_APP_URL}/province/get-province-by-id?id=${currentOrder.value.provinceId}`
    );

    if (response) {
      currentProvince.value = response;
      console.log("provinceName:", currentProvince.value.provinceName);
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
  date.setDate(date.getDate() + 3);

  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const generateInvoice = () => {
  invoiceHTML.value = `
    <div class="invoice my-2">
      <div class="my-2 text-xl">Mã đơn hàng: #${
        currentOrder.value.orderId
      }</div>
      <div class="my-2 text-xl">Ngày đặt: ${formatDate(
        currentOrder.value.orderDate
      )}</div>
      <div class="my-2 text-xl">Tổng cộng: AED ${currentOrder.value.grandTotal.toFixed(
        2
      )}</div>
      <div class="my-2 text-xl">Giảm giá: AED ${currentOrder.value.discountAmount.toFixed(
        2
      )}</div>
      <!-- Thêm chi tiết hóa đơn khác nếu cần -->

      <!-- Chi tiết hóa đơn (ví dụ: các sản phẩm đặt hàng) có thể được thêm ở đây -->
      <div class="invoice-items ">
        ${currentOrder.value.orderDetails
          .map(
            (orderDetail, index) => `
          <div class="my-2 text-xl">Sản phẩm ${index + 1}:</div> 
          <div class="ml-4">-${orderDetail.product.title}: ${
              orderDetail.product.price
            } VND</div>         `
          )
          .join("")}
      </div>
    </div>
  `;
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
  top: 0;
  width: 100%;
  background: rgb(213, 213, 213);
  font-weight: bold;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
