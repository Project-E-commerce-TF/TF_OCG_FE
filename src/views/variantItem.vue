<template>
  <div class="mx-6 border-2 rounded-xl mb-3">
    <div v-if="!loading" class="parent flex flex-col md:flex-row relative mb-3">
      <!-- Slide Image -->
      <div class="slideImg w-full md:w-1/3 mb-4 md:mb-0">
        <div class="w-[100%] h-full m-auto">
          <img :src="data.product.image" class="w-full rounded-s-xl" />
        </div>
      </div>

      <!-- Product Information -->
      <div
        class="info w-full md:w-2/3 bg-gray-200 rounded-e-xl p-4 md:p-10 flex flex-col gap-4 md:gap-10 bg-grey_white"
      >
        <h2 class="text-primary text-2xl md:text-4xl font-bold mb-2">
          {{ data.product.title }}
        </h2>
        <b class="text-xl md:text-3xl">{{
          numberToCurrencyVND(variantPrice)
        }}</b>
        <div>Count In Stock: {{ countInStock }}</div>
        <div class="flex flex-col">
          <div
            class="my-3 flex text-primary font-bold"
            v-for="option in data.optionProducts"
            :key="option.optionType"
          >
            <span class="p-2 mr-2 bg-gray_sidebar rounded-lg min-w-[80px]">
              {{ option.optionType }}
            </span>
            <select
              v-model="selectedOptions[option.optionType]"
              class="p-2 bg-gray_sidebar rounded-lg grow"
            >
              <option
                :value="optionName.optionValueId"
                v-for="optionName in option.optionValues"
                :key="optionName.optionValueId"
              >
                {{ optionName.value }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-center">
          <input
            type="number"
            min="0"
            v-model="quantity"
            class="w-full md:w-20 p-2 bg-gray_sidebar rounded-lg mb-2 md:mb-0"
          />
          <button
            class="grow bg-primary text-white rounded-lg h-[100%] md:ml-2 p-2 font-bold hover:opacity-80"
            @click="addToCart"
          >
            Add to cart
          </button>
        </div>
      </div>
      <div v-if="alertMessage" class="alert-message font-bold mt-2">
        {{ alertMessage }}
      </div>
    </div>

    <Loader2 class="animate-spin w-full mt-4" v-else />

    <!-- Product Description -->
    <div class="description py-4 px-4 text-primary bg-white rounded-x">
      <div class="font-bold text-xl md:text-4xl mb-2 md:mb-10">
        Detail Descriptions
      </div>
      <div v-html="data.product?.description"></div>
    </div>

    <!-- Product Reviews-->
    <div class="reviews py-4 px-4 bg-grey_white rounded-xl">
      <div class="font-bold text-xl md:text-4xl mb-2 md:mb-5">
        Product Reviews
      </div>

      <div v-if="data.reviews && data.reviews.length > 0">
        <!-- Review items here -->
      </div>

      <div v-else>
        <p>No reviews available for this product.</p>
      </div>
    </div>

    <!-- Related Products -->
    <div class="relate py-20 px-40 bg-white rounded-xl mt-4">
      <div class="font-bold text-4xl mb-10">Related products</div>
      <swiper :modules="modules" :slides-per-view="4" class="swiper-container">
        <swiper-slide v-for="product in relateProducts" :key="product.id">
          <div
            class="relative overflow-hidden bg-white shadow-2xl rounded-md max-w-[200px]"
          >
            <router-link
              :to="{ name: 'Variant', params: { handle: product.handle } }"
            >
              <div class="aspect-w-16 aspect-h-9">
                <img
                  :src="product.image"
                  alt=""
                  class="object-cover w-full h-full rounded-md transition-transform transform scale-100 hover:scale-105"
                />
              </div>
              <div
                class="absolute inset-0 p-2 bg-gradient-to-b from-transparent to-black flex items-end"
              >
                <div class="text-white font-bold line-clamp-2">
                  {{ product.title }}
                </div>
              </div>
            </router-link>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script setup>
// import { numberToCurrencyVND } from "@/utils/currencyVND";
import { ref, watch, onBeforeUnmount, watchEffect } from "vue";
import { fetchData } from "@/utils/axiosFetchApi";
import { useRoute } from "vue-router";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import { numberToCurrencyVND } from "@/utils/currencyVND";
import store from "../store/index.js";

const route = useRoute();
const data = ref([]);
const loading = ref(true);
const relateProducts = ref([]);
const modules = {};
const alertMessage = ref(null);
const countInStock = ref(0);
const selectedOptions = ref({});
const quantity = ref(1);
const variantPrice = ref(0);

const updateSwiper = () => {
  // Calculate the number of slides based on the window width or any other logic you want
  const slidesPerView = window.innerWidth < 480 ? 1 : 5;

  const mySwiperRef = new Swiper(".swiper-container", {
    slidesPerView,
    spaceBetween: 5,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  console.log(mySwiperRef);
};

const addToCart = async () => {
  try {
    const keys = Object.keys(selectedOptions.value);
    const body = {
      productID: data.value.product.productId,
      optionValue1: selectedOptions.value[keys[0]],
      optionValue2: selectedOptions.value[keys[1]],
    };

    const variantResponse = await fetchData(
      `${process.env.VUE_APP_URL}/variant/get-variant-id`,
      "POST",
      body
    );

    // Step 3: Check if variant ID is received successfully
    if (variantResponse.variantId) {
      // Step 4: Build payload for adding to cart
      const payload = {
        variantId: variantResponse.variantId,
        quantity: quantity.value, // Use the quantity from the body
      };

      // Step 5: Make request to add to cart
      const cartResponse = await fetchData(
        `${process.env.VUE_APP_URL}/cart/add-to-cart`,
        "POST",
        payload
      );
      console.log(cartResponse);
      // Step 6: Handle the cart response
      if (cartResponse !== null) {
        await store.dispatch("fetchCartList");

        alertMessage.value = "Product added to cart successfully!";
      } else {
        // Step 9: Handle null response
        console.error(
          "Failed to add product to cart. Server returned:",
          cartResponse
        );
        alertMessage.value = "Failed to add product to cart. Please try again.";
      }

      // Step 10: Clear the alert message after 2 seconds
      setTimeout(() => {
        alertMessage.value = null;
      }, 2000);
    } else {
      // Step 11: Handle failure to get variant ID
      console.error(
        "Failed to get variant ID from the server:",
        variantResponse
      );
      alertMessage.value = "Failed to get variant ID. Please try again.";
    }
  } catch (error) {
    // Step 12: Handle unexpected errors
    console.error("Error adding product to cart:", error);
    alertMessage.value =
      "An error occurred while adding the product to the cart. Please try again.";
  }
};

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSwiper);
});

watch(
  () => selectedOptions,
  async (newVal) => {
    try {
      const keys = Object.keys(newVal.value);
      const body = {
        productID: data.value.product.productId,
        optionValue1: newVal.value[keys[0]],
        optionValue2: newVal.value[keys[1]] || 0,
      };

      const resVariantByOp = await fetchData(
        `${process.env.VUE_APP_URL}/variant/get-variant-id`,
        "POST",
        body
      );
      const resVariantById = await fetchData(
        `${process.env.VUE_APP_URL}/variant/get-variant/${resVariantByOp.variantId}`
      );
      if (resVariantById && resVariantById.countInStock) {
        countInStock.value = resVariantById.countInStock;
        variantPrice.value = resVariantById.price;
      }
    } catch (error) {
      console.error("Failed to update countInStock:", error);
    }
  },
  {
    deep: true,
  }
);

watchEffect(() => {
  if (data.value.optionProducts) {
    selectedOptions.value = data.value.optionProducts.reduce((acc, option) => {
      acc[option?.optionType] = option.optionValues?.[0]?.optionValueId || null;
      return acc;
    }, {});
  }
});

watch(
  () => route.params,
  async (newParams) => {
    try {
      const handle = newParams.handle;
      if (handle) {
        const res = await fetchData(
          `${process.env.VUE_APP_URL}/product/find-product/handle?handle=${route.params?.handle}`
        );
        data.value = res;
        loading.value = false;

        if (res.product.categoryID > 0) {
          const resCate = await fetchData(
            `${process.env.VUE_APP_URL}/category/${res.product?.categoryID}`
          );
          const result = await fetchData(
            `${process.env.VUE_APP_URL}/product/search/list?category=${resCate.handle}&pageSize=10`
          );
          relateProducts.value = result.products;
        }

        const reviewsResponse = await fetchData(
          `${process.env.VUE_APP_URL}/review/get-review-by-product-id?productID=${res.product.productId}`
        );
        data.value.reviews = reviewsResponse;
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.swiper-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.swiper-button-next {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.3s, color 0.3s;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* Number of lines to show */
}

.swiper-slide {
  display: flex;
  flex-direction: column;
}

.swiper-slide img {
  flex-grow: 1;
}

.swiper-button-next:hover {
  background-color: #000;
  color: #fff;
}

.swiper-button-next {
  right: 0;
}
.alert-message {
  position: fixed;
  bottom: -5%;
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

.star-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
