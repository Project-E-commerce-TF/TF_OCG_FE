<template>
  <div class="w-full p-20">
    <div class="row">
      <div class="row">
        <order-box
          v-for="order in pendingOrders"
          :key="order.orderId"
          :order="order"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OrderBox from "@/components/OrderBox.vue";
import { ref, onMounted } from "vue";
import { fetchData } from "@/utils/axiosFetchApi";

export default {
  components: {
    OrderBox,
  },
  setup() {
    const pendingOrders = ref([]);

    const fetchPendingOrders = async () => {
      try {
        const url = `${process.env.VUE_APP_URL}/order/get-request-to-cancel-order-orders`;

        const response = await fetchData(url);

        pendingOrders.value = response.orders;
      } catch (error) {
        console.error("Error fetching request-to-cancel-order orders:", error);
      }
    };

    onMounted(() => {
      fetchPendingOrders();
    });

    return {
      pendingOrders,
    };
  },
};
</script>
