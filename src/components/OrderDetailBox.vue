<template>
  <div class="w-full border-2 rounded-xl my-10">
    <div class="row flex justify-between bg-grey_white">
      <div class="col flex">
        <div class="col">
          <img
            :src="orderDetail.variant.image"
            alt="variant-image"
            class="w-24 h-24 object-cover mr-2 rounded-xl"
          />
        </div>
        <div class="col flex flex-col justify-between py-2">
          <div class="row font-bold">
            {{ orderDetail.product.title }}
          </div>
          <div class="row font-bold text-xl">
            {{ numberToCurrencyVND(orderDetail.variant.price) }}
          </div>
          <div class="row font-bold">QTY: {{ orderDetail.quantity }}</div>
        </div>
      </div>
      <div class="col flex flex-col justify-center pr-5">
        <div class="row font-bold text-xl text-right">Total:</div>
        <div class="row font-bold text-xl">
          {{ numberToCurrencyVND(orderDetail.price) }}
        </div>
      </div>
    </div>

    <div class="row flex justify-between py-3 px-5">
      <div class="col text-save text-xl">
        {{ getStatusMessage() }} {{ formatDate(updateTime) }}
      </div>
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
            {{ phoneOrder }}
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
import { numberToCurrencyVND } from "@/utils/currencyVND.js";
import { toRefs } from "vue";

export default {
  data() {
    return {
      showDetails: false,
      numberToCurrencyVND,
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
    updateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    phoneOrder: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
    };

    const getStatusMessage = () => {
      if (props.status === "pending") {
        return "Order has been placed, awaiting confirmation";
      } else if (props.status === "order being delivered") {
        return "The goods have been delivered to the shipping unit";
      } else if (props.status === "complete the order") {
        return "The order has been delivered successfully";
      } else if (props.status === "cancelled") {
        return "Cancel order successfully";
      } else {
        return "N/A";
      }
    };

    return {
      formatDate,
      getStatusMessage,
      ...toRefs(props),
    };
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
