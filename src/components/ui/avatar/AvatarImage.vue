<script setup>
import { AvatarImage } from "radix-vue";
import { defineProps } from "vue";

const props = defineProps({
  src: { type: String, required: true },
  asChild: { type: Boolean, required: false },
  as: { type: [String, Object, Function], required: false },
});
</script>

<template>
  <AvatarImage v-bind="props" class="h-full w-full object-cover" />
</template>
