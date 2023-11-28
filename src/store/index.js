import { createStore } from "vuex";
import {} from "vue-router";
import { fetchData } from "@/utils/axiosFetchApi";

export default createStore({
  state: { productList: [], totalItems: 0 },

  getters: {},

  mutations: {
    setProductList(state, productList) {
      console.log(
        "🚀 ~ file: index.js:12 ~ setProductList ~ productList:",
        productList.products
      );
      state.productList = productList.products;
      state.totalItems = productList.totalItems;
    },
  },

  actions: {
    async fetchProductList({ commit }, obj) {
      const queryString = new URLSearchParams(obj).toString();

      const result = await fetchData(
        `${process.env.VUE_APP_URL}/product/search/list?${queryString}`
      );
      commit("setProductList", result);
    },
  },
  modules: {},
});
