<template>
  <div></div>
</template>

<script setup>
import { fetchData } from "@/utils/axiosFetchApi";
import { onMounted, ref } from "vue";
const data = ref([]);
onMounted(async () => {
  const res = await fetchData(`${process.env.VUE_APP_URL}/users`);
  if (res) {
    data.value = res;
    console.log(data.value);
  }
});
</script>

<style scoped></style>
