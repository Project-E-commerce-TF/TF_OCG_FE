<template>
  <div class="w-full border-2 rounded-xl my-10">
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
            {{ orderDetail.product.title }}
          </div>
          <div class="row font-bold text-xl">
            AED {{ orderDetail.variant.price }}
          </div>
          <div class="row font-bold">QTY: {{ orderDetail.quantity }}</div>
        </div>
      </div>
      <div class="col flex flex-col justify-center pr-5">
        <div class="row font-bold text-xl text-right">Total:</div>
        <div class="row font-bold text-xl">AED {{ orderDetail.price }}</div>
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
          SKU: {{ orderDetail.product.productId }}
        </div>
      </div>

      <div class="row mx-5 py-4 border-b-2">
        <div class="row font-bold mb-2 text-xl">Delivered Address</div>
        <div class="row flex mb-2">
          <div class="col font-bold mr-1">{{ orderDetail.user.userName }}</div>
          <div class="col font-bold mx-1">|</div>
          <div class="col font-bold mx-1">
            {{ orderDetail.user.phoneNumber }}
          </div>
        </div>
        <div class="row font-bold mb-2 flex">
          <div class="row mr-1">{{ shippingAddress }} -</div>
          <div class="row">{{ provinceName }}</div>
        </div>
      </div>

      <div class="row px-5 py-4">
        <div class="row font-bold mb-2 text-xl">Updates sent to</div>
        <div class="row font-bold mb-2">{{ orderDetail.user.phoneNumber }}</div>
        <div class="row font-bold mb-2">{{ orderDetail.user.email }}</div>
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
  props: {
    orderDetail: {
      type: Object,
      require: true,
    },
    provinceName: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.transition-transform {
  transition-property: transform;
  transition-duration: 0.5s;
}

.show-details {
  transform: translateY(0);
}
</style>
