import { createStore } from "vuex";
import { useRouter } from "vue-router";
import { fetchData } from "@/utils/axiosFetchApi";
const router = useRouter();

export default createStore({
  state: { productItem: [] },

  getters: {},

  mutations: {
    setProductItem(state, productItem) {
      state.productItem = productItem;
    },
  },

  actions: {
    async fetchProductItem({ commit }) {
      const currentQuery = router.currentRoute.value.query;
      const queryString = new URLSearchParams(currentQuery).toString();
      const result = await fetchData(
        `${process.env.VUE_APP_URL}/product/search/list?${queryString}`
      );
      commit("setProductItem", result);
    },
  },

  modules: {},
});
