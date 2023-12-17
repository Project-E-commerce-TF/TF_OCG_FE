<template>
  <div class="w-full p-20">
    <div class="row">
      <div class="row">
        <order-box
          v-for="order in paginatedOrders"
          :key="order.orderId"
          :order="order"
        />
      </div>
      <paginate
        v-if="totalPages > 1"
        v-model="currentPage"
        :page-count="totalPages"
        @change="fetchDataForPage"
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
    const paginatedOrders = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(4);
    const totalPages = ref(0);

    const fetchDataForPage = async (page) => {
      console.log("Current Page:", page);

      if (!page || page < 1) {
        console.error("Invalid page value:", page);
        return;
      }

      try {
        const url = `${process.env.VUE_APP_URL}/order/get-cancelled-orders?page=${page}&pageSize=${pageSize.value}`;

        const response = await fetchData(url);

        paginatedOrders.value = response.orders;
        totalPages.value = response.totalPages;
      } catch (error) {
        console.error("Error fetching cancelled orders:", error);
      }
    };

    onMounted(() => fetchDataForPage(currentPage.value));
    watch(currentPage, fetchDataForPage);

    return {
      paginatedOrders,
      currentPage,
      totalPages,
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
