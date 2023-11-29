<template>
  <div class="w-full mx-16 my-24">
    <div class="row flex justify-between mb-6">
      <div class="col text-gray_footer font-bold">ORDER # 402-76948</div>
      <div class="col text-gray_footer font-bold">Placed on : 3 June 2022</div>
    </div>
    <div class="row flex justify-between my-2">
      <div class="col flex flex-col justify-between">
        <div class="row font-bold">Total: AED 24.98</div>
        <div class="row font-bold text-save">You Saved AED 2.50</div>
      </div>
      <div class="col">
        <button
          class="border-2 px-5 py-3 rounded-xl font-bold text-primary border-primary"
        >
          Get invoice
        </button>
      </div>
    </div>
    <div class="row flex justify-between my-4">
      <div class="col font-bold text-primary">
        Deliver all together (estimated by 10 Jun 2022)
      </div>
      <div class="col font-bold text-primary">
        <button>Cancel order</button>
      </div>
    </div>
    <order-detail-box />
  </div>
</template>

<script>
import OrderDetailBox from "@/components/OrderDetailBox.vue";

export default {
  components: {
    OrderDetailBox,
  },
  setup() {},
};
</script>
