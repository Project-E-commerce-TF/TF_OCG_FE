<template>
  <div v-if="!loading" class="parent flex">
    <!-- Slide Image -->
    <div class="slideImg w-1/2 flex flex-col">
      <div class="w-[70%] m-auto">
        <img :src="data.product.image" class="w-full" />
      </div>
    </div>

    <!-- Product Information -->
    <div class="info w-1/2 p-10 flex flex-col gap-10">
      <h2 class="text-primary text-xl font-bold">{{ data.product.title }}</h2>
      <b class="text-3xl">{{ numberToCurrencyVND(variantPrice) }}</b>
      <div>Count In Stock : {{ countInStock }}</div>
      <div>
        <div
          class="my-3 flex text-primary font-bold"
          v-for="option in data.optionProducts"
          :key="option.optionType"
        >
          <span class="p-2 mr-2 bg-gray_sidebar rounded-lg w-1/5">{{
            option.optionType
          }}</span>
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
      <div class="flex">
        <input
          type="number"
          min="0"
          v-model="quantity"
          class="w-20 p-4 bg-gray_sidebar rounded-lg"
        />
        <button
          class="add_button grow bg-primary text-white rounded-lg ml-2 font-bold"
          @click="addToCart"
        >
          Add to cart
        </button>
      </div>
    </div>
    <div v-if="alertMessage" class="alert-message font-bold">
      {{ alertMessage }}
    </div>
  </div>

  <Loader2 class="animate-spin w-full mt-40" v-else />

  <!-- Product Description -->
  <div class="description my-20 mx-40 text-primary">
    <div class="font-bold text-xl mb-10">Detail Descriptions</div>
    <div>{{ data.product?.description }}</div>
  </div>

  <!-- Product Reviews-->
  <div class="reviews my-20 mx-40">
    <div class="font-bold text-xl mb-5">Product Reviews</div>

    <div v-if="data.reviews && data.reviews.length > 0">
      <div
        v-for="(review, index) in data.reviews"
        :key="index"
        class="review-item border-2 my-4 rounded-xl p-2"
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
  <div class="relate my-20 mx-40">
    <div class="font-bold text-xl mb-10">Related products</div>
    <swiper
      :modules="modules"
      :slides-per-view="4"
      :space-between="5"
      navigation
    >
      <swiper-slide v-for="product in relateProducts" :key="product.id">
        <div class="bg-white shadow-2xl rounded-md max-w-[200px]">
          <router-link
            :to="{ name: 'Variant', params: { handle: product.handle } }"
            class="inline-block mt-2 rounded-md"
          >
            <div class="aspect-w-16 aspect-h-9">
              <img
                :src="product.image"
                alt=""
                class="object-cover w-full rounded-md"
              />
              <div class="p-2 min-h-[120px]">{{ product.title }}</div>
            </div>
          </router-link>
        </div>
      </swiper-slide>
    </swiper>
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
    console.log("selectedOptions:", selectedOptions.value);
    const keys = Object.keys(selectedOptions.value);

    const body = {
      productID: data.value.product.productId,
      optionValue1: selectedOptions.value[keys[0]],
      optionValue2: selectedOptions.value[keys[1]],
    };

    console.log("Request body:", body);

    const variantResponse = await fetchData(
      `${process.env.VUE_APP_URL}/variant/get-variant-id`,
      "POST",
      body
    );

    if (variantResponse.variantId) {
      const payload = {
        variantId: variantResponse.variantId,
        quantity: quantity.value, // Use the quantity from the body
      };

      const cartResponse = await fetchData(
        `${process.env.VUE_APP_URL}/cart/add-to-cart`,
        "POST",
        payload
      );

      if (cartResponse !== null) {
        alertMessage.value = "Product added to cart successfully!";
      } else {
        console.error(
          "Failed to add product to cart. Server returned:",
          cartResponse
        );
        alertMessage.value = "Failed to add product to cart. Please try again.";
      }

      setTimeout(() => {
        alertMessage.value = null;
      }, 2000);
    } else {
      console.error(
        "Failed to get variant ID from the server:",
        variantResponse
      );
      alertMessage.value = "Failed to get variant ID. Please try again.";
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alertMessage.value =
      "An error occurred while adding the product to the cart.";
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
        optionValue2: newVal.value[keys[1]],
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
      acc[option.optionType] = option.optionValues[0]?.optionValueId || null;
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
          `${process.env.VUE_APP_URL}/product/find-product/handle?handle=${route.params.handle}`
        );
        data.value = res;
        loading.value = false;

        if (res.product.categoryID > 0) {
          const resCate = await fetchData(
            `${process.env.VUE_APP_URL}/category/${res.product?.categoryID}`
          );
          const result = await fetchData(
            `${process.env.VUE_APP_URL}/product/search/list?category=${resCate.handle}&pageSize=4`
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
.add_button {
  transition: font-size 0.3s;
}
.add_button:hover {
  font-size: 20px;
}
.swiper-button-next,
.swiper-button-prev {
  color: #000;
  /* Add more styles as needed */
}

.swiper-pagination-bullet {
  background: #000;
  /* Add more styles as needed */
}
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

.star-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
