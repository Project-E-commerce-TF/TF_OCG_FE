<template>
  <div class="md:px-32 bg-gray-200 md:py-8 px-3">
    <div v-if="!loading" class="parent flex flex-col md:flex-row relative mb-3">
      <!-- Slide Image -->
      <div class="slideImg w-full md:w-1/2 mb-4 md:mb-0">
        <div class="w-[100%] h-full m-auto">
          <img :src="variantImg" class="w-full h-full rounded-s-xl" />
        </div>
      </div>

      <!-- Product Information -->
      <div
        class="info w-full h-auto md:w-1/2 rounded-e-xl p-4 md:p-10 flex flex-col gap-4 md:gap-10 bg-grey_white"
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
            v-if="hasVariants"
            class="grow bg-primary text-white rounded-lg h-[100%] md:ml-2 p-2 font-bold hover:opacity-80"
            @click="addToCart"
          >
            Add to cart
          </button>
          <div
            v-else
            class="grow bg-gray-400 text-white rounded-lg h-[100%] md:ml-2 p-2 font-bold text-center"
            style="cursor: not-allowed"
          >
            Add to cart
          </div>
        </div>
      </div>
      <div v-if="alertMessage" class="alert-message font-bold mt-2">
        {{ alertMessage }}
      </div>
    </div>

    <Loader2 class="animate-spin w-full mt-4" v-else />

    <!-- Product Description -->
    <div
      class="description my-6 p-10 text-primary rounded-xl bg-white rounded-x"
    >
      <div class="font-bold text-xl md:text-4xl mb-2 md:mb-10">
        Detail Descriptions
      </div>
      <div v-html="data.product?.description"></div>
    </div>

    <!-- Product Reviews-->
    <div class="reviews bg-grey_white my-6 p-10 rounded-xl">
      <div class="font-bold text-4xl mb-5">Product Reviews</div>

      <div v-if="data.reviews && data.reviews.length > 0">
        <div
          v-for="(review, index) in data.reviews"
          :key="index"
          class="review-item border-2 my-4 rounded-xl p-2 bg-white"
        >
          <div class="items-center">
            <div class="font-bold">Rate:</div>
            <div class="font-bold mr-2 flex">
              <img
                v-for="(star, index) in review.rating"
                :key="index"
                :src="require('@/assets/images/star.png')"
                alt="star"
                class="star-icon"
              />
            </div>
            <div class="text-gray-500 font-bold">
              User Name: {{ review.user.userName }}
            </div>
          </div>
          <div class="mb-2 font-bold text-blue-600">{{ review.comment }}</div>
        </div>
      </div>

      <div v-else>
        <p>No reviews available for this product.</p>
      </div>
    </div>

    <!-- Related Products -->
    <div class="relate bg-white rounded-xl my-6 p-10">
      <div class="font-bold text-4xl mb-10">Related products</div>
      <swiper :modules="modules" :slides-per-view="5" class="swiper-container">
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
import { ref, watch, onBeforeUnmount, watchEffect, computed } from "vue";
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
const alertMessage = ref(null);
const countInStock = ref(0);
const selectedOptions = ref({});
const quantity = ref(1);
const variantPrice = ref(0);
const authen = ref(false);
const Cookies = require("js-cookie");
const variantImg = ref("");

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

const showAlert = (message) => {
  alertMessage.value = `${message}`;
  setTimeout(() => {
    alertMessage.value = null;
  }, 2000);
};

const addToCart = async () => {
  try {
    const accessToken = Cookies.get("accessToken");
    authen.value = !!accessToken;

    if (authen.value) {
      await store.dispatch("fetchCartList");
    }

    if (!authen.value) {
      showAlert("Please log in to add the product to the cart.");
      return;
    }

    const keys = Object.keys(selectedOptions.value);

    // Tìm variant trong danh sách variants của sản phẩm
    const matchedVariant = data.value.variants.find((variant) =>
      keys.every(
        (key, index) =>
          variant[`optionValue${index + 1}`] === selectedOptions.value[key]
      )
    );

    if (matchedVariant) {
      const payload = {
        variantId: matchedVariant.variantId,
        quantity: quantity.value,
      };

      const cartResponse = await fetchData(
        `${process.env.VUE_APP_URL}/cart/add-to-cart`,
        "POST",
        payload
      );

      if (
        cartResponse !== null &&
        cartResponse?.error !==
          "Invalid quantity. Quantity exceeds available stock."
      ) {
        if (authen.value) {
          await store.dispatch("fetchCartList");
        }
        showAlert("Product added to the cart successfully.");
      } else {
        const errorMessage = cartResponse?.error;
        if (
          errorMessage === "Invalid quantity. Quantity exceeds available stock."
        ) {
          showAlert(
            "Invalid quantity. Quantity exceeds available stock.",
            "red"
          );
        } else {
          console.error(
            "Failed to add the product to the cart. Server returned:",
            cartResponse
          );
          showAlert("Failed to add the product to the cart. Please try again.");
        }
      }
    } else {
      console.error("Variant not found for the selected options.");
      showAlert("Failed to add the product to the cart. Please try again.");
    }
  } catch (error) {
    console.error("Error adding the product to the cart:", error);
    showAlert(
      "An error occurred while adding the product to the cart. Please try again."
    );
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

      // Tìm variant trong danh sách variants của sản phẩm
      const matchedVariant = data.value.variants.find((variant) =>
        keys.every(
          (key, index) =>
            variant[`optionValue${index + 1}`] === newVal.value[key]
        )
      );

      if (matchedVariant) {
        // Sử dụng thông tin variant đã tìm thấy
        variantImg.value = matchedVariant.image;
        countInStock.value = matchedVariant.countInStock;
        variantPrice.value = matchedVariant.price;
      } else {
        console.error("Variant not found for the selected options.");
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

const variantHasOption = (variant) => {
  const optionValues = Object.values(selectedOptions.value);
  return optionValues.every(
    (value, index) => variant[`optionValue${index + 1}`] === value
  );
};

// Updated hasVariants function that checks if any variant has the selected options
const hasVariants = computed(() => {
  const hasVariants =
    data.value.variants &&
    data.value.variants.some((variant) => variantHasOption(variant));

  return hasVariants;
});
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
  top: 11%;
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
