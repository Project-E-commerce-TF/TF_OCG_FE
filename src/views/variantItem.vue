<template>
  <div v-if="!loading" class="parent flex">
    <!-- Slide Image -->
    <div class="slideImg w-1/2 flex flex-col">
      <div class="w-[70%] m-auto">
        <img :src="data.image" class="w-full" />
      </div>
    </div>

    <!-- Product Information -->
    <div class="info w-1/2 p-10 flex flex-col gap-10">
      <h2 class="text-primary text-xl font-bold">{{ data.title }}</h2>
      <!-- <b class="text-3xl">{{ numberToCurrencyVND(data.price) }}</b> -->
      <div>Count In Stock :</div>
      <div v-for="optionType in data.optionSet" :key="optionType.value">
        <span class="p-2 mr-2 bg-gray_sidebar rounded-lg w-1/5">
          {{ optionType.value }}
        </span>
        <select class="p-2 bg-gray_sidebar rounded-lg grow">
          <option
            v-for="optionName in optionType.optionValue"
            :key="optionName"
          >
            {{ optionName }}
          </option>
        </select>
      </div>
      <div class="flex">
        <input
          type="number"
          min="0"
          value="1"
          class="w-20 p-4 bg-gray_sidebar rounded-lg"
        />
        <button
          class="add_button grow bg-primary text-white rounded-lg ml-2 font-bold"
          @click="
            () => {
              addToCart(variantId);
            }
          "
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
    <div>{{ data.description }}</div>
  </div>

  <!-- Related Products -->
  <div class="relate my-20 mx-40">
    <div class="font-bold text-xl mb-10">Related products</div>
    <swiper
      :modules="modules"
      :slides-per-view="5"
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
              <div class="p-2">{{ product.title }}</div>
            </div>
          </router-link>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { fetchData } from "@/utils/axiosFetchApi";
import { useRoute } from "vue-router";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

const route = useRoute();
const data = ref([]);
const loading = ref(true);
const relateProducts = ref([]);
const modules = {};
const alertMessage = ref(null);

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

onMounted(async () => {
  const handle = route.params.handle;

  if (handle) {
    try {
      const res = await fetchData(
        `${process.env.VUE_APP_URL}/product/find-product/handle?handle=${handle}`
      );
      data.value = res;
      loading.value = false;

      const resCate = await fetchData(
        `${process.env.VUE_APP_URL}/category/${res.categoryID}`
      );
      const result = await fetchData(
        `${process.env.VUE_APP_URL}/product/search/list?category=${resCate.handle}&pageSize=10`
      );
      relateProducts.value = result.products;

      updateSwiper();

      window.addEventListener("resize", updateSwiper);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});

const addToCart = async (variantId) => {
  try {
    const payload = {
      variantId: variantId,
      quantity: 1,
    };

    const response = await fetchData(
      `${process.env.VUE_APP_URL}/cart/add-to-cart`,
      "POST",
      payload
    );

    if (response !== null) {
      alertMessage.value = "Product added to cart successfully!";
    } else {
      console.error(
        "Failed to add product to cart. Server returned:",
        response
      );
      alertMessage.value = "Failed to add product to cart. Please try again.";
    }

    // Show the alert for 2 seconds
    setTimeout(() => {
      alertMessage.value = null;
    }, 2000);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alertMessage.value =
      "An error occurred while adding the product to the cart.";
  }
};

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSwiper);
});
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
</style>
