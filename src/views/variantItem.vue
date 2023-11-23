<template>
  <!-- info -->
  <div class="parent flex">
    <!-- slide img START-->
    <div class="slideImg w-1/2 flex flex-col">
      <div>
        <img :src="data.image[0]" class="w-full" />
      </div>
    </div>
    <!-- slide img END -->

    <!-- spec START-->
    <div class="info w-1/2 p-10 flex flex-col gap-10">
      <h2 class="text-primary text-xl font-bold">{{ data.title }}</h2>
      <b class="text-3xl">{{ numberToCurrencyVND(data.price) }}</b>
      <div>
        <div
          class="my-3 flex text-primary font-bold"
          v-for="optionType in data.optionSet"
          :key="optionType.value"
        >
          <span class="p-2 mr-2 bg-gray_sidebar rounded-lg w-1/5">{{
            optionType.value
          }}</span>
          <select name="" id="" class="p-2 bg-gray_sidebar rounded-lg grow">
            <option
              value=""
              v-for="optionName in optionType.optionValue"
              :key="optionName"
            >
              {{ optionName }}
            </option>
          </select>
        </div>
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
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
  <!-- spec END-->

  <!-- description START-->
  <div class="description"></div>
  <!-- description END-->
</template>

<script setup>
import { numberToCurrencyVND } from "@/utils/currencyVND";
import data from "../datajson/variantDetail.json";
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
</style>
