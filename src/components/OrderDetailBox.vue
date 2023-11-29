<template>
  <div class="w-full border-2 rounded-xl">
    <div class="row flex justify-between bg-grey_white">
      <div class="col flex">
        <div class="col">
          <img
            :src="require('@/assets/images/icon_user.png')"
            alt="icon_search"
            class="w-20 h-10 mr-4"
          />
        </div>
        <div class="col flex flex-col justify-between py-2">
          <div class="row font-bold">
            Brand Name - Product name, its specifications and all other details
            of it
          </div>
          <div class="row font-bold text-xl">AED 3.80</div>
          <div class="row font-bold">QTY: 2</div>
        </div>
      </div>
      <div class="col flex flex-col justify-center pr-5">
        <div class="row font-bold text-xl text-right">Total:</div>
        <div class="row font-bold text-xl">AED 3.80</div>
      </div>
    </div>

    <div class="row flex justify-between py-3 px-5">
      <div class="col text-save text-xl">Arrived on 4 Jun 2022</div>
      <button class="col transition-transform transform" @click="toggleDetails">
        <img
          :src="require('@/assets/images/chevron-down.png')"
          alt="icon_search"
          class="w-6 transform"
          :class="{ 'rotate-180': showDetails }"
        />
      </button>
    </div>
    <div v-if="showDetails" class="transition-transform transform origin-top">
      <div class="row bg-grey_white flex justify-between px-5 py-4">
        <div class="col font-bold text-primary text-xl">Track item</div>
        <div class="col font-bold text-gray_footer text-xl">
          SKU: 8901425031926
        </div>
      </div>

      <div class="row mx-5 py-4 border-b-2">
        <div class="row font-bold mb-2 text-xl">Delivered Address</div>
        <div class="row flex mb-2">
          <div class="col font-bold mr-1">Robert Ford</div>
          <div class="col font-bold mx-1">|</div>
          <div class="col font-bold mx-1">7877646542</div>
        </div>
        <div class="row font-bold mb-2">
          5855 Amboy St, Dearborn Heights,Michigan(MI),48127
        </div>
      </div>

      <div class="row px-5 py-4">
        <div class="row font-bold mb-2 text-xl">Updates sent to</div>
        <div class="row font-bold mb-2">7877646542</div>
        <div class="row font-bold mb-2">robertford@gmail.com</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDetails: false,
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
  },
};
</script>

<style scoped>
/* CSS cho phần tử có hiệu ứng transform */
.transition-transform {
  transition-property: transform;
  transition-duration: 0.5s; /* Thời gian transition */
}

/* CSS cho phần tử có hiệu ứng transform khi showDetails là true */
.show-details {
  transform: translateY(0); /* Hoặc bất kỳ giá trị transform mong muốn */
}
</style>
