<template>
  <!-- info -->
  <div class="parent flex" v-if="!loading">
    <!-- slide img START-->
    <div class="slideImg w-1/2 flex flex-col">
      <div class="w-[70%] m-auto">
        <img :src="data.image" class="w-full" />
      </div>
    </div>
    <!-- slide img END -->

    <!-- spec START-->
    <div class="info w-1/2 p-10 flex flex-col gap-10">
      <h2 class="text-primary text-xl font-bold">{{ data.title }}</h2>
      <b class="text-3xl">{{ numberToCurrencyVND(data.price) }}</b>
      <div>Count In Stock :</div>
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
          @click="click"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
  <Loader2 class="animate-spin w-full mt-40" v-else />
  <!-- spec END-->

  <!-- description START-->
  <div class="description my-20 mx-40 text-primary">
    <div class="font-bold text-xl mb-10">Detail Descriptions</div>
    <div>{{ data.description }}</div>
  </div>

  <!-- description END-->
  <!-- relate product START -->
  <div class="relate my-20 mx-40">
    <div class="font-bold text-xl mb-10">Related products</div>
    <div class="row flex gap-10 flex-wrap justify-center">
      <div
        v-for="product in relateProducts"
        :key="product.id"
        class="bg-white shadow-2xl rounded-md max-w-[200px]"
      >
        <div>
          <router-link
            :to="{
              name: 'Variant',
              params: { handle: product.handle },
            }"
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
      </div>
    </div>
  </div>
  <!-- relate product END -->
</template>

<script setup>
import { numberToCurrencyVND } from "@/utils/currencyVND";
import { ref, watch } from "vue";
import { fetchData } from "@/utils/axiosFetchApi";
import { useRoute } from "vue-router";
import { Loader2 } from "lucide-vue-next";

const route = useRoute();
const data = ref([]);
const loading = ref(true);
const relateProducts = ref([]);

watch(
  () => route.params,
  async (newParams) => {
    const handle = newParams.handle;
    if (handle) {
      const res = await fetchData(
        `${process.env.VUE_APP_URL}/product/find-product/handle?handle=${route.params.handle}`
      );
      data.value = res;
      loading.value = false;

      const resCate = await fetchData(
        `${process.env.VUE_APP_URL}/category/${res.categoryID}`
      );

      const result = await fetchData(
        `${process.env.VUE_APP_URL}/product/search/list?category=${resCate.handle}&pageSize=4`
      );
      relateProducts.value = result.products;
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
@media only screen and (max-width: 480px) {
  .parent {
    flex-direction: column;
  }
  .slideImg,
  .info {
    width: 100%;
  }
  .description,
  .relate {
    margin: 0;
    padding: 0;
    padding-bottom: 20px;
  }
}
</style>
