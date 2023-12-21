import { createStore } from "vuex";
import {} from "vue-router";
import { fetchData } from "@/utils/axiosFetchApi";

export default createStore({
  state: { productList: [], totalItems: 0, cartList: [] },

  getters: {},

  mutations: {
    setProductList(state, productList) {
      state.productList = productList?.products;
      state.totalItems = productList?.totalItems;
    },
    setCartList(state, cartList) {
      state.cartList = cartList;
    },
  },

  actions: {
    async fetchProductList({ commit }, obj) {
      let searchParams = new URLSearchParams(obj);
      let queryString = searchParams.toString();
      console.log(new URLSearchParams(obj));

      let result = await fetchData(
        `${process.env.VUE_APP_URL}/product/search/list?${queryString}`
      );
      if (!result.products) {
        searchParams.set("page", 1);
        queryString = searchParams.toString();
        result = await fetchData(
          `${process.env.VUE_APP_URL}/product/search/list?${queryString}`
        );
      }
      commit("setProductList", result);
    },
    async fetchCartList({ commit }) {
      const cartListRes = await fetchData(
        `${process.env.VUE_APP_URL}/cart/view-cart`
      );
      commit("setCartList", cartListRes?.cartItems);
    },
  },

  modules: {},
});
