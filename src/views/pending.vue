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
      <paginate
        v-if="totalPages > 1"
        v-model="currentPage"
        :page-count="totalPages"
        @change="fetchPendingOrders"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      />
    </div>
  </div>
</template>

<script>
import OrderBox from "@/components/OrderBox.vue";
import { ref, onMounted, watch } from "vue";
import { fetchData } from "@/utils/axiosFetchApi";
import Paginate from "vuejs-paginate-next";

export default {
  components: {
    OrderBox,
    Paginate,
  },
  setup() {
    const pendingOrders = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(4);
    const totalPages = ref(0);

    const fetchPendingOrders = async (page) => {
      try {
        const url = `${process.env.VUE_APP_URL}/order/get-pending-orders?page=${page}&pageSize=${pageSize.value}`;
        const response = await fetchData(url);

        pendingOrders.value = response.orders;
        totalPages.value = response.totalPages;
      } catch (error) {
        console.error("Error fetching pending orders:", error);
      }
    };

    // Fetch pending orders on component mount and when currentPage changes
    onMounted(() => fetchPendingOrders(currentPage.value));
    watch(currentPage, fetchPendingOrders);

    return {
      pendingOrders,
      currentPage,
      totalPages,
    };
  },
};
</script>

<style lang="css">
/* Add the required styles for the pagination */
.pagination {
  display: flex;
  list-style: none;
  padding: 0;
}

.page-item {
  cursor: pointer;
  margin-right: 5px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.page-item.active {
  background-color: #007bff;
  color: white;
}

.page-item.disabled {
  cursor: not-allowed;
}
</style>
