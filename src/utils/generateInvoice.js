import { currentOrder, formatDate } from "./orderDetail.vue";

export const generateInvoice = () => {
  const invoiceHTML = `
    <div class="invoice">
      <div>Order ID: ${currentOrder.value.orderId}</div>
      <div>Order Date: ${formatDate(currentOrder.value.orderDate)}</div>
      <div>Total: AED ${currentOrder.value.grandTotal.toFixed(2)}</div>
      <div>Discount: AED ${currentOrder.value.discountAmount.toFixed(2)}</div>
      <!-- Add more invoice details as needed -->

      <!-- Invoice details (e.g., order items) can be added here -->
      <!-- Example: -->
      <div class="invoice-items">
        <div>Product 1: VND 50.00</div>
        <div>Product 2: VND 30.00</div>
        <!-- Add more product details as needed -->
      </div>
    </div>n my-2" v-if="currentOrder">
    <div class="col flex flex-col justify-between">
      <div class="row font-bold">
        Total: VND {{ currentOrder?.grandTotal.toFixed(2) }}
      </div>
      <div class="row font-bold text-save">
        You Saved VND {{ currentOrder?.discountAmount.toFixed(2) }}
      </div>
    </div>
    <div class="col">
      <button
        class="border-2 px-5 py-3 rounded-xl font-bold text-primary border-primary"
        onclick="generateInvoice()"
      >
        Get invoice
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
        <button onclick="cancelOrder()">Cancel order</button>
      </div>
    </div>
  </div>
  <div class="row">
    <!-- Replace the following placeholder with the actual content of OrderDetailBox component -->
    <!-- <OrderDetailBox ...></OrderDetailBox> -->
  </div>
</div>

<script>
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  function generateInvoice() {
    // Implement your logic to generate the invoice
    console.log("Generating invoice...");
  }

  function cancelOrder() {
    // Implement your logic to cancel the order
    console.log("Cancelling order...");
  }
</script>

</body>
</html>
  `;

  // Log the generated invoice HTML to the console
  console.log(invoiceHTML);
};
