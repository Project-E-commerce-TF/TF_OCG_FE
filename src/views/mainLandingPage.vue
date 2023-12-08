<template>
  <div>
    <!-- Slide show for images -->
    <div class="swiper-container image-slider" ref="imageSwiper">
      <div class="swiper-wrapper">
        <div
          v-for="(image, index) in slideshowImages"
          :key="index"
          class="swiper-slide"
        >
          <img
            :src="require(`@/assets/images/${image}`)"
            alt="Slide Image"
            class="w-full h-auto image-slide"
          />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>

    <!-- Main content -->
    <div class="w-full h-[500px] bg-gray-50">
      <div class="row text-center font-bold text-4xl mt-24">
        Shopping made easy!
      </div>
      <div class="row text-center text-2xl mt-7">
        Now shop at our store with complete convenience
      </div>
      <div class="row flex justify-around mx-20 mt-11">
        <div class="col flex flex-col items-center w-1/3">
          <div class="row w-64 h-40">
            <img
              :src="require('@/assets/images/img_se1.png')"
              alt="icon_search"
              class="w-full h-40"
            />
          </div>
          <div class="row font-bold">Free and Fast delivery</div>
          <div class="row text-center w-2/3">Applies to UAE and Oman</div>
        </div>
        <div class="col flex flex-col items-center w-1/3">
          <div class="row w-64 h-40">
            <img
              :src="require('@/assets/images/img_se2.png')"
              alt="icon_search"
              class="w-full h-40"
            />
          </div>
          <div class="row font-bold">Different payment options</div>
          <div class="row text-center w-2/3">
            We are now accepting payment through cash, card, or bank transfer
          </div>
        </div>
        <div class="col flex flex-col items-center w-1/3">
          <div class="row w-64 h-40">
            <img
              :src="require('@/assets/images/img_se3.png')"
              alt="icon_search"
              class="w-full h-40"
            />
          </div>
          <div class="row font-bold">Click and collect</div>
          <div class="row text-center w-2/3">
            Order products from our website and collect them in our store
          </div>
        </div>
      </div>
    </div>

    <!-- Categories -->
    <div>
      <div
        class="row font-bold text-center text-4xl"
        aria-label="Shop by category"
      >
        Shop by category
      </div>
      <div class="row text-center text-2xl mt-7">
        Pick the category you are looking for and start shopping now!
      </div>
      <div
        class="swiper-container category-slider custom-width"
        ref="categorySwiper"
      >
        <div class="swiper-wrapper justify-center">
          <div
            v-for="cate in category"
            :key="cate.categoryId"
            class="swiper-slide"
          >
            <CategoryBox :category="cate" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CategoryBox from "@/components/CategoryBox.vue";
import { fetchData } from "@/utils/axiosFetchApi";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { ref, onMounted } from "vue";

const category = ref([]);
const slideshowImages = [
  "landing1.png",
  "landing2.png",
  "landing3.png", // Thêm các tên file ảnh khác vào đây
  // ...
];

onMounted(async () => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/category?page=1&pageSize=10`
  );
  category.value = res.categories;

  const categorySwiper = new Swiper(".category-slider", {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const imageSwiper = new Swiper(".image-slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  console.log(categorySwiper, imageSwiper);
});
</script>

<style scoped>
.image-slide {
  max-height: 800px; /* Đặt chiều cao tối đa mong muốn */
}

.custom-width {
  max-width: 60%;
  margin: 0 auto;
}
</style>
