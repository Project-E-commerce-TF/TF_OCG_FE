<template>
  <div class="overflow-hidden">
    <!-- Slide show for images -->
    <div
      class="swiper-container image-slider w-[100vw] overflow-hidden"
      ref="imageSwiper"
    >
      <!-- ... (unchanged) ... -->
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
      <div id="swiper-button-next" class="swiper-button-next"></div>
      <div id="swiper-button-prev" class="swiper-button-prev"></div>
    </div>

    <div class="mx-6 border-2">
      <div class="w-full h-screen bg-gray-50 overflow-hidden">
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
      <div class="custom-width overflow-hidden">
        <div
          class="row font-bold text-center text-4xl"
          aria-label="Shop by category"
        >
          Shop by category
        </div>
        <div class="row text-center text-2xl mt-7">
          Pick the category you are looking for and start shopping now!
        </div>
        <div class="category-list mb-10">
          <CategoryBox
            v-for="cate in category"
            :key="cate.categoryId"
            :category="cate"
          />
        </div>
      </div>
    </div>
    <!-- Main content -->
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import CategoryBox from "@/components/CategoryBox.vue";
import { fetchData } from "@/utils/axiosFetchApi";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

const category = ref([]);
const imageSwiper = ref(null);
const slideshowImages = [
  "landing1.png",
  "landing2.png",
  "landing3.png", // Add other image names here
  // ...
];

onMounted(async () => {
  console.log("Before fetching data");
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/category?page=1&pageSize=10`
  );
  category.value = res.categories;
  console.log("After Swiper initialization");

  // Use nextTick to ensure the template is rendered before initializing Swiper
  await nextTick();

  // Destroy the existing Swiper instance
  if (imageSwiper.value && imageSwiper.value.destroy) {
    Swiper.destroy(imageSwiper.value);
  }

  imageSwiper.value = new Swiper(".image-slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      hideOnClick: true, // Add this line to hide pagination on interaction
    },
  });
  const slideNext = () => {
    // Check if imageSwiper.value is not null before calling slideNext
    if (imageSwiper.value) {
      imageSwiper.value.slideNext();
    }
  };

  const slidePrev = () => {
    // Check if imageSwiper.value is not null before calling slidePrev
    if (imageSwiper.value) {
      imageSwiper.value.slidePrev();
    }
  };

  // Thêm sự kiện click cho nút next và prev
  const nextButton = document.getElementById("swiper-button-next");
  const prevButton = document.getElementById("swiper-button-prev");

  if (nextButton && prevButton) {
    nextButton.addEventListener("click", slideNext);
    prevButton.addEventListener("click", slidePrev);

    // Tự động chuyển ảnh sau mỗi giây
    setInterval(() => {
      slideNext();
    }, 3000);
  }
});
</script>

<style scoped>
.image-slide {
  object-fit: cover;
  height: 90vh;
}

.custom-width {
  max-width: 100%;
  margin: 0 auto;
}

.swiper-slide {
  transition: transform 1s;
}

.swiper-button-next,
.swiper-button-prev {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #00e4f5;
}

.swiper-button-next span,
.swiper-button-prev span {
  display: inline-block;
  font-weight: bold;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.category-list > * {
  flex: 0 0 calc(20% - 20px); /* 20% width with 20px margin */
  margin: 10px; /* Adjust margin as needed */
  padding: 20px; /* Increase padding for larger content */
  text-align: center;
  background-color: #f5f5f5; /* Add a background color */
  border-radius: 8px; /* Add rounded corners */
}
</style>
