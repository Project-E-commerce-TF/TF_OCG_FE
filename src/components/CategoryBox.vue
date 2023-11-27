<!-- CategoryBox.vue -->
<template>
  <div class="bg-white shadow-2xl rounded-md p-6 m-4">
    <div class="mt-4">
      <router-link
        :to="{
          // name: 'category',
          // params: { categoryName: category.categoryName },
        }"
        class="inline-block mt-2 rounded-md"
      >
        <div class="aspect-w-16 aspect-h-9">
          <img
            class="object-cover w-80 rounded-md"
            :src="category.image"
            alt="Category Image"
          />
        </div>
      </router-link>
      <div class="text-xl font-semibold text-primary text-center">
        {{ category.name }}
      </div>
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
