<template>
  <div
    class="cart-item w-full border-2 rounded-xl flex justify-between items-center my-10 h-[150px]"
  >
    <div class="flex w-1/2 h-full items-center">
      <div class="w-full h-full">
        <img
          :src="cart.variantDetail.image"
          alt="Variant Image"
          class="w-full h-full object-cover object-center"
        />
      </div>
      <div class="col ml-4">
        <div class="row font-bold mb-2">{{ cart.productDetail.title }}</div>
        <div class="flex border-2 option_type p-1 rounded-xl">
          <div class="row mr-1 font-bold text-gray_footer">
            {{ cart.variantDetail.optionValue1.value }}
          </div>
          <div class="row mr-1 font-bold text-gray_footer">|</div>
          <div class="row font-bold text-gray_footer">
            {{ cart.variantDetail.optionValue2.value }}
          </div>
        </div>
        <div class="flex">
          <div class="row font-bold mb-2 mr-2">
            {{ numberToCurrencyVND(cart.variantDetail?.price) }}
          </div>
          <div class="row font-bold">
            SKU: {{ cart.productDetail.productId }}
          </div>
        </div>
      </div>
    </div>

    <div class="item-details w-1/4 flex justify-center">
      <div class="quantity-input flex items-center">
        <button
          @click="decrement"
          :disabled="quantity === 1"
          class="px-2 py-1 bg-gray-300"
        >
          -
        </button>
        <input
          v-model="quantity"
          type="text"
          min="1"
          class="w-12 text-center"
          @input="updateQuantity"
        />
        <button @click="increment" class="px-2 py-1 bg-gray-300">+</button>
      </div>
    </div>
    <div class="col w-1/8 font-bold">
      Total: {{ numberToCurrencyVND(cart.totalPrice) }}
    </div>
    <div class="h-[100%] bg-grey_white flex items-center rounded-e-xl">
      <button
        @click="() => $emit('remove-from-cart', cart.variantDetail.variantId)"
        class="col w-1/8 flex justify-center"
      >
        <img
          :src="require('@/assets/images/x.png')"
          alt="logo_brand"
          class="w-1/2 h-full object-cover"
        />
      </button>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { fetchData } from "@/utils/axiosFetchApi";
import { numberToCurrencyVND } from "../utils/currencyVND.js";

export default {
  props: {
    cart: Object,
  },
  setup(props, { emit }) {
    const quantity = ref(
      props.cart.quantity !== undefined ? Math.max(1, props.cart.quantity) : 1
    );

    const updateQuantity = async () => {
      try {
        const response = await fetchData(
          `${process.env.VUE_APP_URL}/cart/update-cart-item/${props.cart.variantId}?quantity=${quantity.value}`,
          "PUT"
        );
        emit("quantity-updated", response.data);
      } catch (error) {
        console.error("Error updating quantity:", error);

        if (error.response) {
          console.log("Backend response data:", error.response.data);

          if (
            error.response.data &&
            error.response.data.error === "Invalid quantity"
          ) {
            console.error("Invalid quantity. Please enter a valid quantity.");
          } else {
            console.error("An unexpected error occurred:", error.response.data);
          }
        }
      }
    };

    const decrement = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    const increment = () => {
      quantity.value++;
    };

    watch(
      () => quantity.value,
      () => {
        updateQuantity();
      }
    );

    onMounted(() => {
      fetchDataForComponent();
    });

    const fetchDataForComponent = async () => {};

    return {
      quantity,
      decrement,
      increment,
      updateQuantity,
      numberToCurrencyVND,
    };
  },
};
</script>
<style scoped>
.option_type {
  max-width: fit-content;
}
</style>
