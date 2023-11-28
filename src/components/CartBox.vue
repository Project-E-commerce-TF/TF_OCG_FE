<template>
  <div
    class="cart-item w-full border-2 rounded-xl flex justify-between items-center my-10 h-28"
  >
    <div class="flex w-1/2 h-full">
      <img
        :src="cart.productDetail.image"
        alt="Product Image"
        class="w-28 h-full mr-4"
      />
      <div class="col">
        <div class="row font-bold mb-2">{{ cart.productDetail.title }}</div>
        <div class="row font-bold mb-2">
          Price: ${{ (cart.productDetail?.price ?? 0).toFixed(2) }}
        </div>
        <div class="row font-bold">SKU: {{ cart.productDetail.productId }}</div>
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
        />
        <button @click="increment" class="px-2 py-1 bg-gray-300">+</button>
      </div>
    </div>
    <div class="col w-1/8 font-bold">
      Total: ${{ (cart.productDetail?.price ?? 0) * quantity }}
    </div>
    <div class="col w-1/8 bg-grey_white h-full flex justify-center py-14">
      <img
        :src="require('@/assets/images/x.png')"
        alt="logo_brand"
        class="w-1/2 object-cover"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  props: {
    cart: Object,
  },
  setup(props, { emit }) {
    console.log(props.cart);

    const quantity = ref(
      props.cart.quantity !== undefined ? Math.max(1, props.cart.quantity) : 1
    );
    const updateQuantity = async () => {
      try {
        const response = await axios.put(
          `/api/cart/update-cart-item/${props.cart.productId}`,
          {
            quantity: quantity.value,
          }
        );
        emit("quantity-updated", response.data);
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    };

    const decrement = () => {
      if (quantity.value > 1) {
        quantity.value--;
        updateQuantity();
      }
    };

    const increment = () => {
      quantity.value++;
      updateQuantity();
    };

    return { quantity, decrement, increment };
  },
};
</script>