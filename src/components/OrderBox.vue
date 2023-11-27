<template>
  <div class="my-10">
    <div class="col border-2 rounded-2xl p-6">
      <div class="row flex justify-between border-b-2">
        <div class="col">
          <div class="row font-bold">{{ order.status }}</div>
          <div class="row font-bold">{{ order.orderDate }}</div>
        </div>
        <div class="col font-bold">{{ order.shippingAddress }}</div>
        <div class="col">
          <div class="row font-bold">ORDER</div>
          <div class="row font-bold">#{{ order.orderId }}</div>
        </div>
      </div>

      <div class="row"></div>

      <div class="row flex justify-between">
        <div class="col">
          <div class="col"></div>
          <div class="col">
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
    <div class="col"></div>
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
