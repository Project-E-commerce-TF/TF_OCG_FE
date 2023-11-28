<template>
  <div class="flex">
    <div class="cart p-6 w-3/5">
      <div class="w-full flex justify-between">
        <div class="col w-1/2 font-bold">Product</div>
        <div class="col w-1/4 flex justify-center pr-6 font-bold">Quantity</div>
        <div class="col w-1/8 flex justify-center mr-24 font-bold">Total</div>
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
        <div class="col font-bold">{{ totalPrice.toFixed(2) }}</div>
      </div>
      <div class="row flex justify-between my-4">
        <div class="col font-bold">Discount</div>
        <div class="col font-bold"></div>
      </div>
      <div class="col">Your Location</div>
      <div class="flex items-stretch">
        <select
          name=""
          id=""
          class="text-lg rounded-lg w-full h-2 p-5 text-primary border-gray_footer border-solid border"
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
      <div class="relative my-4">
        <input
          type="text"
          class="border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:border-primary w-full font-bold"
          placeholder="Coupon code"
        />
        <button
          class="absolute right-0 top-0 bg-primary text-white px-8 py-2 rounded-lg font-bold"
        >
          Apply
        </button>
      </div>
      <div class="row my-4 flex justify-between">
        <div class="col">
          <div class="row font-bold text-grand_totle text-xl">Grand Total</div>
          <div class="row font-bold text-grand_totle text-xl">
            (Inclusive of Taxes)
          </div>
        </div>
        <div class="col">
          <div class="row text-right text-xl font-bold">
            {{ totalPrice.toFixed(2) }}
          </div>
          <div class="row text-right text-sm text-save">You Saved AED {{}}</div>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          @click="checkout"
          class="checkout-btn border-2 py-2 px-4 rounded-lg bg-save font-bold text-white"
        >
          Continue
        </button>
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
