<template>
  <div class="p-10 font-bold text-3xl rounded-lg bg-gray_sidebar">
    <div class="mb-20">Your Location</div>
    <div class="flex items-stretch">
      <select
        name=""
        id=""
        class="text-lg rounded-lg w-80 h-2 p-5 text-primary border-gray_footer border-solid border"
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
      <button
        class="bg-primary text-white text-xl py-4 px-6 ml-5 rounded-lg"
        @click="confirmLocation"
      >
        Continue ->
      </button>
    </div>
  </div>
</template>

<script setup>
import { fetchData } from "@/utils/axiosFetchApi";
import { ref } from "vue";

const provinces = ref([]);
const selectedProvince = ref(null);

const getProvince = async () => {
  const result = await fetchData(`${process.env.VUE_APP_URL}/province`);
  return result;
};
getProvince().then((res) => {
  provinces.value = res;
});

const confirmLocation = () => {
  // pass fee ship vào order
};
</script>

<style lang="scss" scoped></style>
