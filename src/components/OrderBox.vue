<template>
  <div class="my-10">
    <div class="flex border-2 rounded-2xl w-full">
      <div class="col p-6 w-full">
        <div class="row flex justify-between border-b-2 pb-2">
          <div class="col">
            <div class="row font-bold">{{ order.status }}</div>
            <div class="row font-bold">{{ order.orderDate }}</div>
          </div>
          <div class="col font-bold">{{ order.shippingAddress }}</div>
          <div class="col">
            <div class="row font-bold">ORDER</div>
            <div class="row font-bold text-right">#{{ order.orderId }}</div>
          </div>
        </div>
        <div class="row flex justify-between mt-4">
          <div class="col flex">
            <img
              :src="require('@/assets/images/image_order.png')"
              alt="logo_brand"
              class="w-full h-full mr-4 object-cover"
            />
            <div class="col flex flex-col justify-center h-full w-full">
              <div class="row font-bold">Item Total</div>
              <div class="row font-bold">{{ orderDetailsLength }} Items</div>
            </div>
          </div>
          <div class="col">
            <div class="row font-bold">Total</div>
            <div class="row"></div>
          </div>
        </div>
      </div>
      <div class="bg-grey_white flex flex-col justify-center items-center">
        <img
          :src="require('@/assets/images/chevron-right.png')"
          alt="logo_brand"
          class="w-5 h-5 mx-3 object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const orderDetailsLength = ref(0);

    watch(
      () => props.order,
      () => {
        if (props.order) {
          orderDetailsLength.value = props.order.orderDetails.length;
        }
      },
      { immediate: true }
    );

    return {
      orderDetailsLength,
    };
  },
};
</script>
