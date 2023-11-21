<template>
  <div class="mb-12 font-bold text-primary">Price</div>
  <Slider
    v-model="value"
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
import { ref } from "vue";

const handleChange = (newValue) => {
  value.value = newValue;
};

const value = ref([0, 5000000]);
const min = 0;
const max = 10000000;
</script>

<style src="@vueform/slider/themes/default.css">
@import "path/to/node_modules/@vueform/slider/themes/tailwind.scss";
</style>
