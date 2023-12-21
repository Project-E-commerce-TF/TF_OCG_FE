<template>
  <div class="flex">
    <div
      v-if="cartItems && cartItems.length > 0"
      class="cart p-6 w-full flex md:flex-row flex-col"
    >
      <div class="cart p-6 md:w-3/5 w-full">
        <div class="w-full flex justify-between">
          <div class="col w-1/2 font-bold">Product</div>
          <div class="col w-1/4 flex justify-center pr-6 font-bold">
            Quantity
          </div>
          <div class="col w-1/8 flex justify-center mr-24 font-bold">Total</div>
        </div>
        <div v-if="cartItems && cartItems.length > 0">
          <CartBox
            v-for="item in cartItems"
            :key="item.cartId"
            :cart="item"
            @quantity-updated="updateCart"
            @remove-from-cart="handleRemoveFromCart"
          />
        </div>
        <div v-else>
          <div>Your cart is empty.</div>
          <div>Loading...</div>
        </div>
      </div>
      <div class="py-6 px-16 bg-gray_rectangle md:w-2/5 w-full rounded-xl">
        <div class="row text-right border-b-4 border-primary font-bold pb-2">
          Order Summary
        </div>
        <div class="row flex items-center my-4">
          <img
            :src="require('@/assets/images/oto.png')"
            alt="oto"
            class="w-10 h-full mx-3 object-cover"
          />
          <div class="col font-bold">
            Yay! Free shipping available on this order.
          </div>
        </div>
        <div class="row flex justify-between my-4">
          <div class="col text-primary font-bold">
            Item Total ({{ totalItems }} items)
          </div>
          <div class="col font-bold">
            {{ numberToCurrencyVND(totalPrices) }} VND
          </div>
        </div>
        <div
          class="row flex justify-between my-4"
          v-if="appliedDiscount && appliedDiscount.value"
        >
          <div class="col font-bold">Discount</div>
          <div class="col font-bold">
            {{ formattedDiscount }}
          </div>
        </div>

        <div class="col">Your Province</div>
        <div class="flex items-stretch">
          <select
            name=""
            id=""
            class="text-lg rounded-lg w-full h-2 p-1 text-primary border-gray_footer border-solid border"
            v-model="selectedProvince"
          >
            <option value="" disabled selected>Please Choose...</option>
            <option
              v-for="province in provinces"
              :value="province.provinceId"
              :key="province.provinceId"
              class="text-lg w-full text-primary"
            >
              {{ province.provinceName }}
            </option>
          </select>
        </div>
        <div
          v-if="shippingFee !== null && shippingFee > 0"
          class="mt-2 text-primary font-bold flex justify-between"
        >
          <div>Shipping Fee:</div>
          <div>{{ numberToCurrencyVND(shippingFee) }} VND</div>
        </div>
        <div class="col mt-4">Your Location</div>
        <div class="">
          <input
            v-model="shippingAddress"
            type="text"
            class="border border-gray-300 pl-4 rounded-lg pr-10 py-2 focus:outline-none focus:border-primary w-full font-bold"
            placeholder="Input location"
          />
        </div>
        <div class="col mt-4">Phone Number</div>
        <div class="">
          <input
            v-model="phoneOrder"
            @blur="validatePhoneNumber"
            type="text"
            class="border border-gray-300 pl-4 rounded-lg pr-10 py-2 focus:outline-none focus:border-primary w-full font-bold"
            placeholder="Input phone number"
          />
          <div
            v-if="!isValidPhoneNumber && phoneOrder.length > 0"
            class="text-red-500 mt-2"
          >
            Please enter a valid phone number.
          </div>
        </div>
        <div class="relative my-4">
          <input
            v-model="discountCode"
            type="text"
            class="border border-gray-300 pl-4 rounded-lg pr-10 py-2 focus:outline-none focus:border-primary w-full font-bold"
            placeholder="Coupon code"
          />
          <button
            @click="applyDiscount"
            class="h-full absolute right-0 top-0 bg-primary text-white px-8 py-2 rounded-lg font-bold"
          >
            Apply
          </button>
        </div>
        <div v-if="discountCodeError" class="text-red-500">
          {{ discountCodeError }}
        </div>
        <div class="row my-4 flex justify-between">
          <div class="col">
            <div class="row font-bold text-grand_totle text-xl">
              Grand Total
            </div>
            <div class="row font-bold text-grand_totle text-xl">
              (Inclusive of Taxes)
            </div>
          </div>
          <div class="col">
            <div class="row text-right text-xl font-bold">
              {{ numberToCurrencyVND(calculateTotalPrice) }}
            </div>
            <div class="row text-right text-sm text-save">
              You Saved
              {{ numberToCurrencyVND(calculateSavings) }}
            </div>
          </div>
        </div>
        <div v-if="showWarningMessage" class="text-red-500 my-2">
          Please enter your address, phone number and select province/city.
        </div>
        <div class="flex justify-center">
          <button
            @click="handlePay"
            class="bg-blue-500 w-full text-white px-8 py-2 rounded font-bold"
          >
            Pay
          </button>
        </div>
        <div class="mt-4">
          <div id="paypal-button-container"></div>
        </div>
      </div>
    </div>
    <div v-else class="w-full">
      <cart-empty></cart-empty>
    </div>
  </div>
  <div v-if="alertMessage" class="alert-message font-bold">
    {{ alertMessage }}
  </div>
</template>

<script setup>
import { fetchData } from "@/utils/axiosFetchApi";
import { ref, watch, onMounted, computed, nextTick } from "vue";
import CartBox from "@/components/CartBox.vue";
import CartEmpty from "@/components/CartEmpty.vue";
import { useRouter } from "vue-router";
import { numberToCurrencyVND } from "@/utils/currencyVND";
const router = useRouter();
const cartItems = ref([]);
const totalItems = ref(0);
const totalPrices = ref(0);
const provinces = ref([]);
const selectedProvince = ref(null);
const shippingFee = ref(0);
const discountCode = ref("");
const appliedDiscount = ref(null);
const initialTotalPrices = ref(0);
const shippingAddress = ref("");
const phoneOrder = ref("");
const discountedTotalPrices = ref(0);
const discountCodeError = ref(null);
const showWarningMessage = ref(false);
const isValidPhoneNumber = ref(true);
const alertMessage = ref(null);

watch([totalPrices, shippingFee], () => {
  discountedTotalPrices.value = totalPrices.value;
});

const calculateTotalPrice = computed(() => {
  return shippingFee.value !== null && shippingFee.value > 0
    ? discountedTotalPrices.value + shippingFee.value
    : discountedTotalPrices.value;
});

const validatePhoneNumber = () => {
  const phoneNumberRegex = /^[0-9]{10}$/;
  isValidPhoneNumber.value = phoneNumberRegex.test(phoneOrder.value);
};

const calculateSavings = computed(() => {
  const discount = appliedDiscount.value;

  if (discount) {
    if (discount.discountType === "percentage") {
      return (totalPrices.value * discount.value) / 100;
    } else if (discount.discountType === "fixed") {
      return discount.value;
    }
  }

  return 0;
});

const formattedDiscount = computed(() => {
  const discount = appliedDiscount.value;
  if (discount && discount.discountType === "percentage") {
    return `-${discount.value}%`;
  } else if (discount && discount.discountType === "fixed") {
    return `-${numberToCurrencyVND(discount.value)} VND`;
  } else {
    return "";
  }
});

onMounted(async () => {
  try {
    const response = await fetchData(
      `${process.env.VUE_APP_URL}/cart/view-cart`
    );
    if (response && response.cartItems && response.summary) {
      cartItems.value = response.cartItems;
      totalItems.value = response.summary.totalProducts;
      totalPrices.value = response.summary.totalPrice;
      initialTotalPrices.value = response.summary.totalPrice;
    } else {
      console.error("Invalid response format:", response);
    }

    provinces.value = await fetchData(`${process.env.VUE_APP_URL}/province`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
const updateCart = async () => {
  try {
    const response = await fetchData(
      `${process.env.VUE_APP_URL}/cart/view-cart`
    );
    if (response && response.summary) {
      cartItems.value = response.cartItems;
      totalItems.value = response.summary.totalProducts;
      totalPrices.value = response.summary.totalPrice;
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};

const fetchShippingFee = async () => {
  try {
    if (selectedProvince.value) {
      const response = await fetchData(
        `${process.env.VUE_APP_URL}/province/get-province-by-id?id=${selectedProvince.value}`
      );

      if (response && response.shippingFee !== undefined) {
        shippingFee.value = parseFloat(response.shippingFee);
      } else {
        console.error("Invalid response format:", response);
      }
    }
  } catch (error) {
    console.error("Error fetching shipping fee:", error);
  }
};

const handleRemoveFromCart = async (productId) => {
  try {
    const response = await fetchData(
      `${process.env.VUE_APP_URL}/cart/remove-cart-item/${productId}`,
      "DELETE"
    );
    if (response) {
      await updateCart();
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

watch(selectedProvince, (newProvince) => {
  console.log("Selected Province (watch):", newProvince);
  fetchShippingFee();
});

const applyDiscount = async () => {
  try {
    discountCodeError.value = null;

    if (discountCode.value) {
      const response = await fetchData(
        `${process.env.VUE_APP_URL}/discount/get-discount/get-by-code?discountCode=${discountCode.value}`
      );
      if (response) {
        appliedDiscount.value = response;
        let originalTotalPrices = initialTotalPrices.value;

        await nextTick();

        if (response.discountType === "percentage") {
          const discountAmount = (originalTotalPrices * response.value) / 100;
          discountedTotalPrices.value = originalTotalPrices - discountAmount;
        } else if (response.discountType === "fixed") {
          discountedTotalPrices.value = originalTotalPrices - response.value;
        }

        if (response.value === 0) {
          discountCodeError.value = "This discount code does not exist";
        }
      } else {
        discountCodeError.value = "This discount code does not exist";
        console.error("Invalid response format:", response);
      }
    }
  } catch (error) {
    console.error("Error applying discount:", error);
  }
};

const handlePay = async () => {
  if (
    shippingAddress.value === "" ||
    phoneOrder.value === "" ||
    selectedProvince.value === null
  ) {
    showWarningMessage.value = true;
    return;
  }
  if (totalItems.value <= 0 || totalPrices.value <= 0) {
    console.error("Invalid total items or total prices");
    return;
  }
  setupPayPal();
};
const handleCheckout = async (paypalOrderID, status, discountCode1) => {
  try {
    const payload = {
      shippingAddress: shippingAddress.value,
      phoneOrder: phoneOrder.value,
      provinceId: selectedProvince.value,
      totalQuantity: totalItems.value,
      totalPrice: totalPrices.value,
      grandTotal: calculateTotalPrice.value,
      discountAmount: calculateSavings.value,
      discountCode: discountCode1,
    };

    const response = await fetchData(
      `${process.env.VUE_APP_URL}/order/checkout`,
      "POST",
      payload
    );

    if (response) {
      alertMessage.value = "Checkout successfully!";
      handleTransaction(status, paypalOrderID, response.order_id);
      setTimeout(() => {
        router.push("/products");
      }, 1000);
      console.log("checkout:" + response);
    } else {
      console.error("Lỗi trong quá trình thanh toán:", response);
    }
  } catch (error) {
    console.error("Lỗi trong quá trình thanh toán:", error);
  }
};
const handleTransaction = async (status, paypalOrderID, orderID) => {
  try {
    const payload = {
      orderID,
      paypalOrderID,
      status,
    };

    const response = await fetchData(
      `${process.env.VUE_APP_URL}/transaction/create-transaction`,
      "POST",
      payload
    );
    if (response) {
      console.log(response);
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Error create transaction:", error);
  }
};
const setupPayPal = async () => {
  const clientId =
    "AdOIALptwcqSF-EWVwJuRZcG1fbDmUkton_tA-QklUMZ6ZB1rW8FkCD-mW2OihkIO0qryeh32AN9k320";

  const paypalScriptUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;

  await loadPayPalScript(paypalScriptUrl);
  console.log("clientId:" + clientId);
  renderPayPalButtons(clientId);
};

const createOrder = async () => {
  try {
    console.log("Payload:");

    const payload = {
      grandTotal: calculateTotalPrice.value,
    };
    console.log("Payload:", payload);

    const response = await fetchData(
      `${process.env.VUE_APP_URL}/order/api/orders`,
      "POST",
      payload
    );

    console.log("Response status:", response);
    if (response) {
      return response.id;
    } else {
      console.error(
        "Create order request failed with status:",
        response.status
      );
      throw new Error(`Error creating order. Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error creating order: ${error}`);
  }
};

const loadPayPalScript = async (scriptUrl) => {
  try {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.crossorigin = "anonymous";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  } catch (error) {
    throw new Error(`Error loading PayPal script: ${error}`);
  }
};

const renderPayPalButtons = async (clientId) => {
  if (!clientId) {
    throw new Error("Invalid clientId");
  }

  window.paypal
    .Buttons({
      createOrder: async () => await createOrder(),
      onApprove: async (data) => await onApprove(data, discountCode.value),
    })
    .render("#paypal-button-container");
  console.log("renderPayPalButtons:" + clientId);
};

const onApprove = async (data, discountCode) => {
  console.log("onApprove - Data:", data);
  try {
    const response = await fetchData(
      `${process.env.VUE_APP_URL}/order/api/orders/${data.orderID}/capture`,
      "POST"
    );

    console.log("onApprove - Response:", response);
    const orderData = await response;
    console.log("onApprove - Response2222:", orderData);
    const captures = orderData?.purchase_units?.[0]?.payments?.captures || [];

    if (captures.length > 0) {
      const lastCapture = captures[captures.length - 1];

      console.log("Capture details:", lastCapture);

      const transactionAmount = lastCapture.amount.value;
      const transactionCurrency = lastCapture.amount.currency_code;

      resultMessage(
        `Transaction Status: ${lastCapture.status}<br>
         Transaction ID: ${lastCapture.id}<br>
         Amount: ${transactionAmount} ${transactionCurrency}<br>
         See console for all available details`
      );
      handleCheckout(orderData.id, orderData.status, discountCode);
    } else {
      console.error("No captures found in the response.");
      throw new Error("No captures found in the response.");
    }
  } catch (error) {
    console.error(error);
    resultMessage(
      `Sorry, your transaction could not be processed...<br><br>${
        error.message || "Unknown error"
      }`
    );
  }
};

const resultMessage = async (message) => {
  // const container = document.querySelector("#result-message");
  // container.innerHTML = message;
  console.log(message);
};
</script>
<style scoped>
.alert-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: rgba(0, 37, 68, 0.8);
  color: white;
  border-radius: 5px;
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
}

.alert-message.hide {
  opacity: 0;
}
</style>
