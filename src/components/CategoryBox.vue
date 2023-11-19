<!-- CategoryBox.vue -->
<template>
  <div class="bg-white shadow-md rounded-md p-6 m-4">
    <div class="mt-4">
      <router-link
        :to="{
          name: 'category',
          params: { categoryName: category.categoryName },
        }"
        class="inline-block mt-2 px-4 py-2 text-white rounded-md"
      >
        <div class="aspect-w-16 aspect-h-9">
          <img
            class="object-cover w-80 h-40 rounded-md"
            :src="category.imageUrl"
            alt="Category Image"
          />
        </div>
      </router-link>
      <h5 class="text-xl font-semibold">{{ category.categoryName }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryBox",
  props: ["category"],
  methods: {},
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>
