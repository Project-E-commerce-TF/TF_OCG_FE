<script setup>
import { DropdownMenuTrigger } from "radix-vue";
import { defineProps } from "vue";

const props = defineProps({
  disabled: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: [String, Object, Function], required: false },
});
</script>

<template>
  <DropdownMenuTrigger class="outline-none" v-bind="props">
    <slot />
  </DropdownMenuTrigger>
</template>
