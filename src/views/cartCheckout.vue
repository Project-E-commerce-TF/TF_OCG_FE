<template>
  <div class="flex">
    <div class="cart p-6 w-3/5">
      <div class="w-full flex justify-between">
        <div class="col w-1/2">Product</div>
        <div class="col w-1/4 flex justify-center pr-6">Quantity</div>
        <div class="col w-1/8 mr-24">Total</div>
      </div>
      <div v-if="cartItems && cartItems.length > 0">
        <div v-if="cartItems.length === 0">Your cart is empty.</div>
        <CartBox
          v-for="item in cartItems"
          :key="item.cartId"
          :cart="item"
          @quantity-updated="updateCart"
        />
      </div>
      <div v-else>Loading...</div>
    </div>
    <div>
      <!-- <div class="total-items">Total Items: {{ totalItems }}</div>
      <div class="total-price">Total Price: ${{ totalPrice.toFixed(2) }}</div>
       -->
      <div class="row">Order Summary</div>
      <div class="row">
        <img
          :src="require('@/assets/images/oto.png')"
          alt="oto"
          class="w-5 h-5 mx-3 object-cover"
        />
        <div class="col">Yay! Free shipping available on this order.</div>
      </div>
      <div class="row">
        <div class="col">Item Total ({{ totalItems }} items)</div>
        <div class="col">{{ totalPrice.toFixed(2) }}</div>
      </div>
      <div class="row">
        <div class="col">Discount</div>
        <div class="col"></div>
      </div>
      <router-link to="/">
        <button class="w-38 h-12 border-none bg-transparent">
          <img
            :src="require('@/assets/images/logo_header.png')"
            alt="logo_brand"
            class="w-full h-full object-cover"
          />
        </button>
      </router-link>
      <div class="row">
        <div class="col">
          <div class="row">Grand Total</div>
          <div class="row">(Inclusive of Taxes)</div>
        </div>
        <div class="col">
          <div class="row">{{ totalPrice.toFixed(2) }}</div>
          <div class="row">You Saved AED {{}}</div>
        </div>
      </div>
      <div class="row">
        <button @click="checkout" class="checkout-btn">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchData } from "@/utils/axiosFetchApi";
import CartBox from "@/components/CartBox.vue";

export default {
  components: {
    CartBox,
  },
  setup() {
    const cartItems = ref([]);
    const totalItems = ref(0);
    const totalPrice = ref(0);

    const updateCart = async () => {
      try {
        const response = await fetchData(
          process.env.VUE_APP_URL + "/cart/view-cart"
        );
        console.log(response);
        if (response && response.cartItems && response.summary) {
          cartItems.value = response.cartItems;
          totalItems.value = response.summary.totalProducts;
          totalPrice.value = response.summary.totalPrice;
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    };

    const checkout = () => {
      console.log("Checkout clicked");
    };

    onMounted(() => {
      updateCart();
    });

    return {
      cartItems,
      totalItems,
      totalPrice,
      updateCart,
      checkout,
    };
  },
};
</script>
