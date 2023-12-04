<template>
  <div class="flex">
    <div v-if="cartItems && cartItems.length > 0" class="cart p-6 w-full flex">
      <div class="cart p-6 w-3/5">
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
      <div class="py-6 px-16 bg-gray_rectangle w-2/5">
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
          <div class="col font-bold">{{ totalPrices }}</div>
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

        <div class="col">Your Location</div>
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
          class="mt-2 text-primary font-bold"
        >
          Shipping Fee: {{ shippingFee }}
        </div>
        <div class="my-4">
          <input
            v-model="shippingAddress"
            type="text"
            class="border border-gray-300 pl-4 rounded-lg pr-10 py-2 focus:outline-none focus:border-primary w-full font-bold"
            placeholder="Input location"
          />
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
            class="absolute right-0 top-0 bg-primary text-white px-8 py-2 rounded-lg font-bold"
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
              {{ calculateTotalPrice.toFixed(2) }}
            </div>
            <div class="row text-right text-sm text-save">
              You Saved AED {{ calculateSavings.toFixed(2) }}
            </div>
          </div>
        </div>
        <div v-if="showWarningMessage" class="text-red-500 my-2">
          Please enter your address and select province/city.
        </div>

        <div class="flex justify-center">
          <button
            @click="handleCheckout"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
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
const discountedTotalPrices = ref(0);
const discountCodeError = ref(null);
const showWarningMessage = ref(false);
const alertMessage = ref(null);

watch([totalPrices, shippingFee], () => {
  discountedTotalPrices.value = totalPrices.value;
});

const calculateTotalPrice = computed(() => {
  return shippingFee.value !== null && shippingFee.value > 0
    ? discountedTotalPrices.value + shippingFee.value
    : discountedTotalPrices.value;
});

const calculateSavings = computed(() => {
  const discount = appliedDiscount.value;

  // Check if there is a discount
  if (discount) {
    // Check the discount type
    if (discount.discountType === "percentage") {
      // Calculate the savings based on the discounted total price
      return (discountedTotalPrices.value * discount.value) / 100;
    } else if (discount.discountType === "fixed") {
      // If the discount type is "fixed," return the fixed discount value
      return discount.value;
    }
  }

  // If no discount or discount is of a different type, savings is 0
  return 0;
});

const formattedDiscount = computed(() => {
  const discount = appliedDiscount.value;
  if (discount && discount.discountType === "percentage") {
    return `-${discount.value}%`;
  } else if (discount && discount.discountType === "fixed") {
    return `-${discount.value}`;
  } else {
    return "";
  }
});

// Lấy danh sách cart từ API khi component được mount
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

    // Lấy danh sách tỉnh/thành phố
    provinces.value = await fetchData(`${process.env.VUE_APP_URL}/province`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Hàm cập nhật giỏ hàng
const updateCart = async () => {
  try {
    const response = await fetchData(
      `${process.env.VUE_APP_URL}/cart/view-cart`
    );
    if (response && response.cartItems && response.summary) {
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

// Hàm xử lý khi chọn tỉnh/thành phố
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
  fetchShippingFee(); // Đảm bảo rằng fetchShippingFee được gọi khi tỉnh/thành phố thay đổi.
});

const applyDiscount = async () => {
  try {
    // Reset the discount code error before attempting to apply the discount
    discountCodeError.value = null;

    if (discountCode.value) {
      const response = await fetchData(
        `${process.env.VUE_APP_URL}/discount/get-discount/get-by-code?discountCode=${discountCode.value}`
      );
      if (response) {
        appliedDiscount.value = response;
        // Lấy giá ban đầu từ biến tạm
        let originalTotalPrices = initialTotalPrices.value;

        // Use $nextTick to wait for the next DOM update
        await nextTick();

        // Xử lý khi nhận được response từ API
        if (response.discountType === "percentage") {
          // Giảm giá theo tỷ lệ phần trăm dựa trên giá ban đầu
          const discountAmount = (originalTotalPrices * response.value) / 100;
          discountedTotalPrices.value = originalTotalPrices - discountAmount;
        } else if (response.discountType === "fixed") {
          // Giảm giá cố định dựa trên giá ban đầu
          discountedTotalPrices.value = originalTotalPrices - response.value;
        }

        // Check if discount value is 0
        if (response.value === 0) {
          discountCodeError.value = "This discount code does not exist";
        }
      } else {
        // Set the error message if the discount code is not found
        discountCodeError.value = "This discount code does not exist";
        console.error("Invalid response format:", response);
      }
    }
  } catch (error) {
    console.error("Error applying discount:", error);
  }
};
const handleCheckout = async () => {
  try {
    if (shippingAddress.value === "" || selectedProvince.value === null) {
      // Hiển thị thông báo cảnh báo nếu điều kiện không được đáp ứng
      showWarningMessage.value = true;
      return;
    }

    // Kiểm tra dữ liệu trước khi gửi request
    if (totalItems.value <= 0 || totalPrices.value <= 0) {
      console.error("Invalid total items or total prices");
      return;
    }

    // Tạo một đối tượng payload
    const payload = {
      shippingAddress: shippingAddress.value,
      provinceId: selectedProvince.value,
      totalQuantity: totalItems.value,
      totalPrice: totalPrices.value,
      grandTotal: calculateTotalPrice.value,
      discountAmount: calculateSavings.value,
    };

    const response = await fetchData(
      `${process.env.VUE_APP_URL}/order/checkout`,
      "POST",
      payload
    );

    if (response) {
      alertMessage.value = "Checkout successfully!";
      setTimeout(() => {
        router.push("/products");
      }, 1000);
    } else {
      console.error("Lỗi trong quá trình thanh toán:", response);
    }
  } catch (error) {
    console.error("Lỗi trong quá trình thanh toán:", error);
  }
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
