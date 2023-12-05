<script setup>
import { cn } from "@/lib/utils";
import { defineProps } from "vue";

const props = defineProps({
  class: { type: String, required: false },
});
</script>

<template>
  <tbody :class="cn('[&_tr:last-child]:border-0', props.class)">
    <slot />
  </tbody>
</template>
