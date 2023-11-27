<template>
  <div>
    <div class="w-full relative">
      <img
        class="w-full h-auto top-0"
        :src="require('@/assets/images/landing_img.png')"
      />
    </div>
    <div class="w-full h-[500px] bg-gray-50">
      <div class="row text-center font-bold text-4xl mt-24">
        Shopping made easy!
      </div>
      <div class="row text-center text-2xl mt-7">
        Now shop st our store with complete convenience
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
            We are now accepting payment through cash, card or bank transfer
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
            Order products from our website and collect them our store
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-[550px] mt-36">
      <div class="row font-bold text-center text-4xl">Shop by category</div>
      <div class="row text-center text-2xl mt-7">
        Pick the catogory you are looking for and start shopping now!
      </div>
      <div class="row flex justify-around">
        <category-box
          v-for="category in categories"
          :key="category.categoryId"
          :category="category"
        />
      </div>
    </div>
  </div>
  <ForgotPassword />
</template>

<script>
import CategoryBox from "@/components/CategoryBox.vue";
import categories from "@/datajson/categories.json";
import ForgotPassword from "@/components/ForgotPassword.vue";
export default {
  components: {
    CategoryBox,
    ForgotPassword,
  },
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.categories = categories;
  },
};
</script>
