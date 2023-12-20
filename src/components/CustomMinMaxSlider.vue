<template>
  <div class="mb-12 font-bold text-primary">Price</div>
  <Slider
    v-model="value"
    :format="format"
    :min="min"
    :max="max"
    :classes="{
      tooltip:
        'absolute block text-sm font-semibold whitespace-nowrap py-1 px-1.5 min-w-5 text-center text-white rounded border border-primary bg-primary transform h:-translate-x-1/2 h:left-1/2 v:-translate-y-1/2 v:top-1/2 disabled:bg-gray-400 disabled:border-gray-400 merge-h:translate-x-1/2 merge-h:left-auto merge-v:-translate-x-4 merge-v:top-auto tt-focus:hidden tt-focused:block tt-drag:hidden tt-dragging:block',
      connect:
        'absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full bg-primary cursor-pointer tap:duration-300 tap:transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed',
    }"
    @change="handleChange"
  />
</template>

<script setup>
import Slider from "@vueform/slider";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "../store/index.js";
import { numberToCurrencyVND } from "@/utils/currencyVND";

const router = useRouter();
const route = useRoute();
const value = ref([route.query.priceFrom || 0, route.query.priceTo || 2500000]);
const min = 0;
const max = 5000000;

const format = (value) => {
  return numberToCurrencyVND(value);
};

const handleChange = (newValue) => {
  value.value = newValue;
};

watch(
  value,
  async () => {
    const currentQuery = route.query;
    await router.push({
      path: "/products",
      query: {
        ...currentQuery,
        priceFrom: value.value[0],
        priceTo: value.value[1],
      },
    });

    const updateCurrentQuery = route.query;
    console.log("minmax");
    await store.dispatch("fetchProductList", updateCurrentQuery);
  },
  { deep: true }
);
</script>

<style src="@vueform/slider/themes/default.css">
@import "path/to/node_modules/@vueform/slider/themes/tailwind.scss";
</style>
