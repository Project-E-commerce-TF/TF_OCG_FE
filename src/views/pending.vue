<template>
  <div class="w-full p-20">
    <div class="row">
      <div class="row">
        <order-box
          v-for="order in pendingOrders"
          :key="order.orderId"
          :order="order"
          @cancel="handleCancelOrder"
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

    const handleCancelOrder = async () => {
      fetchPendingOrders(currentPage.value); // Truyền giá trị currentPage vào hàm fetchPendingOrders
    };

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
      handleCancelOrder,
    };
  },
};
</script>

<style lang="css">
.pagination {
  display: flex;
  list-style: none;
  padding: 10px;
}

.page-item {
  cursor: pointer;
  margin-right: 5px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.page-item a {
  display: block;
  padding: 5px;
}

.page-item.active {
  background-color: #1a3856;
  color: white;
  border-color: #1a3856;
}

.page-item.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
