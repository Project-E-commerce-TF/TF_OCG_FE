<template>
  <div class="invoice-modal p-6 max-w-md mx-auto bg-white shadow-md">
    <div
      class="modal-header flex justify-between items-center border-b pb-2 mb-4"
    >
      <h5 class="modal-title text-xl font-semibold">Bill</h5>
      <button
        type="button"
        class="close text-gray-500 hover:text-gray-700"
        @click="closeModal"
      >
        &times;
      </button>
    </div>

    <div class="invoice my-2">
      <div class="section-header bg-gray-100 py-1 mb-4">
        <h6 class="text-sm font-semibold">Order Information</h6>
      </div>
      <div class="my-2 text-lg">Code orders: #{{ orderId }}</div>
      <div class="my-2 text-lg">Booking date: {{ formattedOrderDate }}</div>

      <div class="section-header bg-gray-100 py-1 my-4">
        <h6 class="text-sm font-semibold">Order Details</h6>
      </div>
      <div class="invoice-items">
        <div v-for="(orderDetail, index) in orderDetails" :key="index">
          <!-- Product Details -->
          <div class="my-2 text-lg">Product {{ index + 1 }}:</div>
          <div class="ml-4">
            -{{ orderDetail.product.title }}:
            {{ formattedPrice(orderDetail.product.price) }} VND
          </div>
        </div>
      </div>

      <div class="section-header bg-gray-100 py-1 my-4">
        <h6 class="text-sm font-semibold">Summary</h6>
      </div>
      <div class="my-2 text-lg">Total: {{ formattedGrandTotal }} VND</div>
      <div class="my-2 text-lg">
        Discount: {{ formattedDiscountAmount }} VND
      </div>
    </div>
    <div class="my-4 flex justify-end">
      <!-- Generate PDF and Print buttons, chỉ hiển thị trên màn hình và khi biến cờ là true -->
      <button
        v-if="isScreen && showButtons && !isGeneratingPDF"
        @click="generatePDF"
        class="btn-primary mr-2"
      >
        Generate PDF
      </button>
      <button
        v-if="isScreen && showButtons && !isGeneratingPDF"
        @click="printInvoice"
        class="btn-secondary"
      >
        Print
      </button>
    </div>
  </div>
</template>

<script setup>
import html2pdf from "html2pdf.js";
import { defineProps, computed, onBeforeUnmount, ref } from "vue";
import { numberToCurrencyVND } from "@/utils/currencyVND";

const showButtons = ref(true);
const isGeneratingPDF = ref(false);

const props = defineProps([
  "orderId",
  "orderDate",
  "grandTotal",
  "discountAmount",
  "orderDetails",
  "isVisible",
  "closeModal",
]);

const isScreen = computed(() => {
  const mediaQueryList = window.matchMedia("print");
  return !mediaQueryList.matches;
});

const formattedOrderDate = computed(() => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(props.orderDate);
  return date.toLocaleDateString("en-US", options);
});

const formattedGrandTotal = computed(() =>
  numberToCurrencyVND(props.grandTotal)
);

const formattedDiscountAmount = computed(() =>
  numberToCurrencyVND(props.discountAmount)
);

const formattedPrice = (price) => numberToCurrencyVND(price);

const generatePDF = async () => {
  isGeneratingPDF.value = true; // Set to true when starting PDF generation
  const element = document.querySelector(".invoice-modal");
  await html2pdf(element);
  isGeneratingPDF.value = false; // Set back to false after PDF generation is complete
  hideButtons();
};

const printInvoice = () => {
  window.print();
  hideButtons();
};

const hideButtons = () => {
  showButtons.value = false; // Hide buttons after either action (PDF generation or printing)
};

onBeforeUnmount(() => {});
</script>

<style scoped>
/* Your existing styles here */

.btn-primary {
  background-color: #4caf50;
  color: #fff;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

.btn-secondary {
  background-color: #3498db;
  color: #fff;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

@media print {
  .btn-primary,
  .btn-secondary,
  .my-4.flex.justify-end {
    display: none !important;
  }
}
</style>
