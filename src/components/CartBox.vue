<template>
  <div
    :class="[
      'cart-item w-full border-2 rounded-xl flex  items-center my-10 h-28',
      checkIfMobile ? 'flex-wrap' : 'justify-between',
    ]"
  >
    <div :class="['flex h-full', checkIfMobile ? 'w-full' : ' w-1/2']">
      <img
        :src="cart.variantDetail.image"
        alt="Variant Image"
        class="w-28 h-full mr-4"
      />
      <div class="col">
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
        </div>
      </div>
    </div>

    <div
      :class="[
        'item-details flex',
        checkIfMobile ? 'ml-2 justify-start w-1/3' : 'w-1/4 justify-center',
      ]"
    >
      <div :class="['quantity-input flex items-center']">
        <button
          @click="decrement"
          :disabled="quantity === 1"
          class="px-2 bg-gray-300 rounded-lg"
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
        <button @click="increment" class="px-2 bg-gray-300 rounded-lg">
          +
        </button>
      </div>
    </div>
    <div :class="['col  font-bold', checkIfMobile ? 'm-auto' : 'w-1/8']">
      Total: {{ numberToCurrencyVND(cart.totalPrice) }}
    </div>
    <button
      @click="() => $emit('remove-from-cart', cart.variantDetail.variantId)"
      :class="[
        'col  bg-grey_white h-full flex justify-center  font-bold',
        checkIfMobile ? 'w-full mt-10 py-2 px-6' : ' py-16 w-1/8 px-2',
      ]"
    >
      x
    </button>
  </div>
  <!-- <button
    @click="() => $emit('remove-from-cart', cart.variantDetail.variantId)"
    class="bg-grey_white h-full flex justify-center py-14"
  >
    <img
      :src="require('@/assets/images/x.png')"
      alt="logo_brand"
      class="w-1/2 object-cover"
    />
  </button> -->
</template>

<script>
import { ref, watch, onMounted, computed } from "vue";
import { fetchData } from "@/utils/axiosFetchApi";
import { numberToCurrencyVND } from "../utils/currencyVND.js";

const checkIfMobile = computed(() => {
  return window.innerWidth < 1024;
});

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
      checkIfMobile,
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
