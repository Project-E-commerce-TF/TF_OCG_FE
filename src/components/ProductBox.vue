<!-- ProductBox.vue -->
<template>
  <div class="bg-white shadow-md rounded-md p-6 m-4">
    <router-link
      :to="{ name: 'product', params: { productId: product.id } }"
      class="block mb-4"
    >
      <div class="aspect-w-16 aspect-h-9">
        <img
          class="object-cover w-full h-full rounded-md"
          :src="product.imageUrl"
          alt="Product Image"
        />
      </div>
    </router-link>

    <div class="mb-2">
      <h5 class="text-xl font-semibold">{{ product.brandName }}</h5>
      <h6 class="text-md">{{ product.productName }}</h6>
      <p class="text-gray-700">{{ product.price }}</p>

      <!-- Hiển thị nếu sản phẩm đang trong trạng thái sale -->
      <span v-if="product.isOnSale" class="text-red-500">Sale!</span>
    </div>

    <div class="flex justify-between items-center">
      <button
        @click="addToCart"
        class="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add to Cart
      </button>
      <button
        @click="addToWishlist"
        class="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Add to Wishlist
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBox",
  props: ["product"],
  methods: {
    addToCart() {
      // Xử lý khi người dùng nhấn vào nút "Add to Cart"
      console.log("Added to Cart:", this.product);
    },
    addToWishlist() {
      // Xử lý khi người dùng nhấn vào nút "Add to Wishlist"
      console.log("Added to Wishlist:", this.product);
    },
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>
