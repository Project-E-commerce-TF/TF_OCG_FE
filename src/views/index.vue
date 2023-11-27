<template>
  <div class="home">
    <div class="mt-6" v-if="user">
      {{ user.displayName }}
      <h1>alo</h1>
    </div>
    <div v-else>User is not available.</div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useUser } from "@/composables/useUser";

export default {
  setup() {
    const { user, fetchUser } = useUser();

    onMounted(async () => {
      await fetchUser();
    });

    return { user };
  },
};
</script>
